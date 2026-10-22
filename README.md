# The Tick Tock Pub

Marketing site for **The Tick Tock Pub**, the late-night college bar and dance floor in Canton, NY.

It's a single static page with anchor navigation: Hero (live countdown + ticking clock) → This Week → The Space → Know Before You Go → Gallery → Find Us → Footer.

## Stack

- **Next.js 16** (App Router, TypeScript), statically prerendered
- **Tailwind CSS v4** (theme tokens live in `app/globals.css`)
- **GSAP + ScrollTrigger** for reveals, parallax, and the hero intro
- **Lenis** for smooth scrolling (kept in sync with ScrollTrigger)
- `next/image` for every photo, `next/font` for Graduate (varsity display), DM Sans (body), and Permanent Marker (chalkboard)
- No backend, no database, no API keys

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run build`     | Production build (fully static)                |
| `npm run start`     | Serve the production build                     |
| `npm run lint`      | ESLint (Next core-web-vitals + TypeScript)     |
| `npm run typecheck` | `tsc --noEmit`                                 |
| `npm test`          | Vitest unit tests for the open-hours logic     |
| `npm run images`    | Regenerate the placeholder photos              |

## Deploying to Vercel

No config needed. Import the repo in Vercel (or run `npx vercel`) and every branch push gets a preview URL. Once you have a real domain, update `site.url` in `content/site.ts`; it drives the canonical/OG URLs, `robots.txt`, and `sitemap.xml`.

## Editing content

**Everything editable is in [`content/site.ts`](content/site.ts):** name, tagline, address, Instagram, open nights/hours, weekly events, Know Before You Go copy, The Space copy, and the image list. Search the file for `[CONFIRM]` to find every value that still needs checking.

- **Weekly events:** edit `thisWeek`. Each entry renders one card. `style: "chalkboard"` gives the framed chalkboard look and `style: "pennant"` gives the hanging felt pennant.
- **Hours / countdown:** edit `openNights` (`day`: 0 = Sun … 6 = Sat, 24h times in Canton time). If `close` is earlier than `open`, the night runs past midnight. The hero countdown, the "Open now" pill, and the "Tonight"/"Live" card badges all read from this schedule. Update the human-readable `knowBeforeYouGo.hours` string too.
- **Photos:** drop real photos into `public/images/` using the same filenames, or point the `images` entries at new files. Update `width`/`height` to roughly match each photo's aspect ratio (the gallery masonry uses them). `og.jpg` (1200×630) is the social share image.

## How it works

- `lib/schedule.ts` computes open/closed status and the next opening in `America/New_York`, whatever the visitor's own time zone, and handles DST and nights that run past midnight. It's covered by `lib/schedule.test.ts`.
- `lib/useNow.ts` is a single shared one-second ticker built on `useSyncExternalStore`. The server renders a neutral `--:--:--` state, so live time never causes a hydration mismatch.
- `components/MotionProvider.tsx` sets up Lenis, ScrollTrigger, and the scroll animations, driven by data attributes: `data-reveal`, `data-reveal-stagger`, and `data-parallax="0.2"`.
- **Accessibility:** a skip link, keyboard-reachable nav, visible focus rings, and `alt` text on every image. If the visitor sets `prefers-reduced-motion`, Lenis and all GSAP animations are switched off and content shows immediately. If JavaScript fails, a 4-second fallback un-hides content that was waiting to be revealed.
- **SEO:** metadata, Open Graph image, `BarOrPub` JSON-LD with opening hours, `robots.txt`, and `sitemap.xml`.

## Assumptions (please confirm)

1. **Address:** listings disagree between 9 and 11 Hodskin St. I used **11 Hodskin St, Canton, NY 13617**. The map pin and directions link search for "The Tick Tock Pub" plus the address, so Google should still find the right spot.
2. **Hours:** you said "Thursday–Saturday, roughly 10–11p". I read that as **doors at 10pm, Thu–Sat, closing at 2am**. The 2am close is a guess, so set the real close time.
3. **Instagram:** `@theticktockpub` is a **placeholder handle**. Swap in the real one.
4. **Cover:** "$5–$10, varies by night" is a placeholder.
5. **Events and specials:** the three nights (Throwback Thursday, Friday Night Lights, Saturday Main Event) and their specials are made up. Edit them weekly.
6. **ID policy, dress code, parking:** generic, sensible wording, not the bar's official policy.
7. **Photos:** all images are generated on-brand placeholders labelled "PHOTO PLACEHOLDER" (see `scripts/generate-placeholders.mjs`). Replace them with real photos before launch.
8. **Domain:** `site.url` is set to `https://ticktockpub.vercel.app` as a stand-in.
9. **Map:** uses the keyless Google Maps embed (`output=embed`), so no API key or billing is needed.
10. **Branding:** the collegiate look is generic and original. There are no St. Lawrence University or SUNY Canton names, logos, seals, or official colors.
11. **Framework version:** the brief asked for Next.js 15+. I used the current stable release, 16.x, which has the same App Router APIs.
