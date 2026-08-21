/**
 * Every outbound destination in one place. Swap these once the real
 * booking page and wait-list backend are decided; nothing else changes.
 */
export const links = {
  /** Cal.com / Calendly booking page. */
  bookDemo: process.env.NEXT_PUBLIC_DEMO_URL ?? "#demo",
  /** Live demo account — the FAQ leans on this, so it wants a real URL. */
  demoAccount: process.env.NEXT_PUBLIC_DEMO_ACCOUNT_URL ?? "#demo",
  privacy: "/privacy",
  terms: "/terms",
  email: "mailto:hello@promobile.app",
} as const;

/** Dimmed dashboard capture. Unset -> the rebuilt dashboard plays instead. */
export const heroLoop = {
  mp4: process.env.NEXT_PUBLIC_HERO_LOOP_MP4 ?? null,
  webm: process.env.NEXT_PUBLIC_HERO_LOOP_WEBM ?? null,
  poster: process.env.NEXT_PUBLIC_HERO_LOOP_POSTER ?? null,
} as const;
