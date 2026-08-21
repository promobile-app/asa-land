"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/motion/variants";

type State = "idle" | "sending" | "done" | "error";

export function WaitlistDialog({
  copy,
  open,
  onClose,
  locale,
}: {
  copy: Content["waitlist"];
  open: boolean;
  onClose: () => void;
  locale: string;
}) {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
      setError(copy.errorEmail);
      setState("error");
      return;
    }
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
    } catch {
      setError(copy.errorGeneric);
      setState("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[100] grid place-items-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.18 }}
        >
          <div
            className="absolute inset-0 bg-[rgb(10_10_10_/_0.62)] backdrop-blur-[2px]"
            onClick={onClose}
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            className="relative w-full max-w-[420px] rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
          >
            <h2 className="text-xl font-semibold tracking-[-0.02em]">{copy.title}</h2>

            {state === "done" ? (
              <p className="mt-3 text-sm text-tx-3">{copy.done}</p>
            ) : (
              <>
                <p className="mt-2 text-sm text-tx-3">{copy.lede}</p>
                <form onSubmit={submit} className="mt-5 grid gap-3">
                  <label
                    htmlFor="waitlist-email"
                    className="font-mono text-[10px] tracking-[0.12em] uppercase text-tx-4"
                  >
                    {copy.emailLabel}
                  </label>
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    placeholder={copy.emailPlaceholder}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    aria-invalid={state === "error"}
                    aria-describedby={error ? "waitlist-error" : undefined}
                    className="h-11 rounded-md border border-line bg-surface-2 px-3.5 text-sm text-tx placeholder:text-tx-4 outline-none focus-visible:border-brand"
                  />
                  {error && (
                    <p id="waitlist-error" className="text-[13px] text-danger">
                      {error}
                    </p>
                  )}
                  <Button type="submit" disabled={state === "sending"} className="mt-1">
                    {state === "sending" ? copy.submitting : copy.submit}
                  </Button>
                </form>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-[13px] text-tx-4 hover:text-tx-2 cursor-pointer"
            >
              {copy.close}
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
