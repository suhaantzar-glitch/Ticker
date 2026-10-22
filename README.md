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

No config needed. Import the repo in Vercel (or run `npx vercel`) and every branch push gets a preview URL. Link previews, `robots.txt` and `sitemap.xml` use the Vercel deployment URL automatically. For a custom domain, set the `NEXT_PUBLIC_SITE_URL` environment variable in Vercel.

> **Heads-up:** Vercel protects *preview* deployments (branch URLs) behind a Vercel login by default. To share a link with someone outside your Vercel team, use the production deployment (the `main` branch), or turn off Deployment Protection under Project → Settings.

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

## Facts and sources

This is a **concept preview** to show the owner. With `site.preview: true` in `content/site.ts`, the site labels sample events and photos as samples. Set it to `false` once real content is in.

What's based on public sources:

- **Name and address: The Tick Tock Pub, 11 Hodskin St, Canton, NY 13617** (confirmed). The map and directions links search by street address only, so Google pins the building instead of another business listing.
- **Instagram: [@theticktockpub](https://www.instagram.com/theticktockpub/).** The account's bio lists the same Thursday–Saturday, 10pm–2am hours.
- **"The Ticker":** the students' nickname for the bar, used by St. Lawrence's student paper.
- **Caricatures, murals and fireplaces:** reported as features the new ownership is keeping.
- **Hours: Thursday–Saturday, 10pm–2am,** as provided for this build.
- **Interior:** red booths, wood floors, front and back bars, and a dance floor with a DJ, as described in the brief.

Sources:
- [North Country Now: "New Tick Tock owner ready to revitalize historic Canton landmark"](https://northcountrynow.com/stories/new-tick-tock-owner-ready-to-revitalize-historic-canton-landmark,254578)
- [NNY360 / Watertown Daily Times: "New Tick Tock owner wants to revitalize historic downtown spot in Canton"](https://www.nny360.com/communitynews/business/new-tick-tock-owner-wants-to-revitalize-historic-downtown-spot-in-canton/article_47238e6c-fb61-54cb-93f1-f566935178fc.html)
- [The Hill News: "Farewell to Ticker"](https://thehillnews.org/opinions/noragraves/farewell-to-ticker-embracing-change-at-slu/)

## Still to confirm with the owner

Search `content/site.ts` for `[CONFIRM]`.

1. **Events and specials:** the three nights (Throwback Thursday, Friday Night Lights, Saturday Main Event) and their specials are samples.
2. **Cover, dress code, parking:** neutral wording, not an official policy. No cover price is stated.
3. **Photos:** all images are generated on-brand placeholders labelled "PHOTO PLACEHOLDER" (see `scripts/generate-placeholders.mjs`). The share image (`og.jpg`) shows the wordmark.
4. **Domain:** on Vercel the deployment URL is picked up automatically (`lib/siteUrl.ts`). Set `NEXT_PUBLIC_SITE_URL` once there's a custom domain.
5. **Map:** uses the keyless Google Maps embed, so no API key or billing is needed.
6. **Branding:** the collegiate look is generic and original. There are no St. Lawrence University or SUNY Canton names, logos, seals, or official colors.
7. **Framework version:** the brief asked for Next.js 15+. This uses the current stable release, 16.x.
