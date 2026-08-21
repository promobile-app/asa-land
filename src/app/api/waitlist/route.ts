import { NextResponse } from "next/server";

const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

/** Crude per-instance throttle. Swap for a shared store when this scales out. */
const seen = new Map<string, number>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  for (const [key, at] of seen) if (now - at > WINDOW_MS) seen.delete(key);
  const hits = [...seen.keys()].filter((k) => k.startsWith(`${ip}|`)).length;
  if (hits >= MAX_PER_WINDOW) return true;
  seen.set(`${ip}|${now}`, now);
  return false;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const { email, locale } = (body ?? {}) as { email?: string; locale?: string };

  if (typeof email !== "string" || !EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "bad_email" }, { status: 400 });
  }

  const entry = {
    email: email.toLowerCase(),
    locale: typeof locale === "string" ? locale : "en",
    at: new Date().toISOString(),
  };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.WAITLIST_TO;

  if (!key || !to) {
    // Not wired to a destination yet — accept and record, do not pretend to send.
    console.info("[waitlist] no delivery configured, entry:", entry);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "Promobile <hello@promobile.app>",
        to,
        subject: `Wait list: ${entry.email}`,
        text: `${entry.email}\nlocale: ${entry.locale}\nat: ${entry.at}`,
      }),
    });
    if (!res.ok) throw new Error(`resend ${res.status}`);
  } catch (err) {
    console.error("[waitlist] delivery failed", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
