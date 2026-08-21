# Promobile landing

Marketing site for [promobile.app](https://promobile.app) — Apple Ads and ASO
in one workspace. Three locales, two themes, one dimmed dashboard loop.

```bash
npm install
npm run dev          # http://localhost:3000 -> /en
npm run build && npm start
npm run typecheck
npm run sync-tokens  # diff our tokens against a live platform build
```

## Stack

| | |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Rendering | SSG — every locale is prerendered (`generateStaticParams` + `setRequestLocale`) |
| Animation | [Motion](https://motion.dev) via `LazyMotion` + `domAnimation` (`strict`, so only `m.*` compiles) |
| Styling | Tailwind v4 for layout and type, CSS Modules for the hero and the rebuilt dashboard |
| i18n | next-intl for routing and locale detection; copy lives in typed modules |
| Fonts | Rubik + JetBrains Mono, self-hosted by `next/font` |

## Design tokens

`src/styles/tokens.css` is lifted from the platform's own `:root` dump —
colours, radii, the lot. Tailwind maps them in `src/app/globals.css` under
`@theme inline`, which is what lets a theme swap repaint without a rebuild.

Three theme states, and all three are handled deliberately:

| state | resolves to |
|---|---|
| no `data-theme` attribute | follows `prefers-color-scheme` |
| `data-theme="light"` | light, even on a dark OS |
| `data-theme="dark"` | dark, even on a light OS |

The switch in the header writes the same `data-theme` attribute the app uses,
so the choice can be handed straight to the product on the way in. It is
applied by an inline script in `<head>` before first paint, so a saved choice
never flashes the other theme.

`npm run sync-tokens` fetches a platform build, resolves its `var()` aliases
and prints what drifted. It never writes — the landing lagging the app is
intentional. One known quirk: the script parses stylesheets statically, so
where the platform overrides a token across two files the computed value in a
live tab is the authority, not the diff.

## The hero loop

The brief calls for a dimmed video loop of the real dashboard. Until that
capture exists, `MockDashboard` stands in: the dashboard rebuilt in the app's
own tokens, at the exact crop, scale and dimming the video will occupy.

To swap in the real thing, set the env vars — nothing else changes:

```
NEXT_PUBLIC_HERO_LOOP_MP4=/media/dashboard-loop.mp4
NEXT_PUBLIC_HERO_LOOP_WEBM=/media/dashboard-loop.webm
NEXT_PUBLIC_HERO_LOOP_POSTER=/media/dashboard-poster.webp
```

Capture notes: 15–20 s, seamless loop, no audio, 1440×900 or 2560×1600, and
keep the left third quiet — that is where the headline sits. The poster must
be the LCP element; the video carries `preload="none"` and only starts once
the hero is on screen. It pauses again when the hero scrolls away.

Anyone who asked for reduced motion gets the rebuilt dashboard, still, instead
of video.

## Content

`src/content/{en,ru,uk}.ts`, shape pinned by `src/content/types.ts` — a
translation that drifts from the structure fails `npm run typecheck` rather
than rendering half a page.

The hero headline and subheading are verbatim from the brief in all three
languages. **Everything else in `ru.ts` and `uk.ts` is a translation of the
English and has not been through marketing.**

Copy is passed down as props rather than through a message catalogue, so only
the strings a client component actually needs cross the server boundary.

## Animation inventory

| what | trigger | detail |
|---|---|---|
| Route enter | `app/[locale]/template.tsx` | opacity + 8px, 240 ms. Exit is deliberately absent — see the comment in that file |
| Hero entrance | page load | one `staggerChildren`, 120 ms in, 80 ms apart |
| Headline language swap | locale change | real `AnimatePresence` exit, local to the component where it works properly |
| Section reveals | `whileInView`, once | opacity + 16px, 420 ms; grids stagger 60 ms |
| Chart | one `useInView` for the whole chart | bars spring up from `scaleY: 0` staggered 22 ms, then the rank line draws on `pathLength`, then the pins fade in |
| Price | `useInView` | `useSpring` counts to 149, `tabular-nums` so the width holds |
| FAQ | click | height auto, 240 ms; the `+` loses its vertical stroke rather than rotating |
| Theme icon | CSS only | three-state, so the right icon is painted on the first frame |
| Loop | always | Ken Burns, 54 s, alternate |

`useReducedMotion` turns every one of these into opacity-only or nothing. The
meaning survives, the movement does not.

## Wait list

`POST /api/waitlist` validates, rate-limits per instance, and sends through
Resend when `RESEND_API_KEY` and `WAITLIST_TO` are set. Without them it accepts
and logs, and answers `{ ok: true, delivered: false }` — it does not pretend to
have sent anything.

The in-memory rate limit is per instance. Move it to a shared store before
running more than one.

## Still open

- The dashboard capture (or demo-account access so we can film it).
- `NEXT_PUBLIC_DEMO_URL` — the Cal.com / Calendly page behind "Book a demo".
- `NEXT_PUBLIC_DEMO_ACCOUNT_URL` — the live demo the FAQ leans on.
- Whether the wait list stays first-party or moves to Tally / Typeform.
- Analytics. Nothing is wired yet; the CTAs are the events worth having.
- `/privacy` and `/terms` are linked but not written.
- Client logos: the "Trusted by" strip is built and parked, per the brief.
