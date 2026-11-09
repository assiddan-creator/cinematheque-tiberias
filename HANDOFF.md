# HANDOFF

## State (2026-11-09)
- LIVE on Vercel: https://cinematheque-tiberias.vercel.app (project `cinematheque-tiberias`, team assiddan-creators-projects, Hobby). No custom domain yet.
- Git integration: the project deploys from GitHub `assiddan-creator/cinematheque-tiberias`; every push to `main` is a production deploy (about 30 s). `vercel.json` sets the build (`npm run build`, output `dist`, clean URLs).
- Films update automatically: per the owner, a scheduled task pulls the programme from Tarbut Tiberias and pushes to `main` twice a month, which redeploys the site. The data it edits is `src/content.ts` (`screenings`).
- Only `main` exists (the `awwwards-redesign` and `claude-redesign` branches were merged or retired and deleted on 2026-11-09).
- Concept: "the hall's seating plan" (see DESIGN.md). Phone-first: about 80% of visits are on phones.
- Site URL: `npm run build` pre-renders every route (scripts/prerender.mjs) and takes the address from `SITE_URL`, else from Vercel's `VERCEL_PROJECT_PRODUCTION_URL` (so canonical, og:url, og:image and sitemap.xml follow a custom domain once it is added). Local builds without either skip canonical and the sitemap.
- `npm run preview` serves the pre-rendered pages and a real 404 (plugin in vite.config.ts).
- Vercel CLI on this PC: login crashes because the machine name is Hebrew ("אסי-ד" in an HTTP header). Use the dashboard, or run the CLI with an ASCII hostname override.

## Logo
- Source: `media/logo newlogo.jpeg` (and the smaller `media/logo.jpeg`). Approved by the owner.
- Vector logo: `src/logo/paths.ts` (generated; letters traced, edges straightened by line fitting, clapper redrawn as geometry, handwriting traced) and `src/components/Logo.tsx` (`tone` light/red, `small` = handwriting 1.5x heavier for 48 px and below).
- Where: header (small, 44 px phone / 48 px desktop; on home it appears only after the hero logo scrolls away), home hero (gold on red, h1 text kept visually hidden), footer, 404 (sparkle cutout `public/media/logo-sparkle*.webp`), `public/og.png` (sparkle logo on a screen panel), `public/favicon.svg` (samech + clapper only), `public/apple-touch-icon.png`.
- The trace pipeline scripts live outside the repo (scratchpad); regenerate by editing paths.ts directly if needed.

## Media
- Originals live in `media/` (git-ignored, never modified). Web copies in `public/media/`: WebP at 2000 and 800 px, metadata stripped; MP4 clips H.264, muted, with WebP posters.
- The owner confirmed parental consent for every file in `media/`.
- Used: 3, 5, 10, 14, 15, 18, 19 (hall and shows); 32, 37, 38, 41, 42 (date 16-20.8.2026 erased from the slide), 43, 49 (festival and education); videos "11.48.28 AM (1)" (lobby) and "11.48.23 AM (1)" (festival full hall, 10 s).
- Data: `src/media.ts`; festival text: `src/festival.ts` (only the owner's facts); tech gallery entries in `content.ts` (`gallery`).
- Empty-hall set (media/‏‏תיקיה חדשה, a (1) to a (10)): home "באולם" uses a (9), a (7), a (6); events uses a (5) (private/lectures) and a (10) (lobby, beside the lobby clip); tech gallery uses a (6) for the PARs, a (8) for the dressing room and a (2) (control booth), plus 15, 3 and 10 moved from home. a (1), a (3), a (4) not used (lobby duplicates).
- Gallery sketches still waiting for photos: load-in route, power sockets.

## Screenings page
- `/screenings` (2026-11-09): small title, sticky filter bar, poster cards in a grid (1 / 2 / 3 columns), then the kids pass, the festival, and the full boards as a row of links.
- Trailers: `trailer` field (YouTube id) on `Screening` in `content.ts` (ted, phoenix, wonder; ids from the films' Tarbut Tiberias pages). Modal in `src/components/TrailerDialog.tsx`: native `<dialog>`, youtube-nocookie iframe created only on click and removed on close. Esc does not reach the page while focus is inside the YouTube player (cross-origin); the X and a click outside always close it.

## Tech spec
- Owner's data (2026-11-09) in `content.ts` `specGroups`: projector NEC NC1201L-A (DLP Cinema, laser, 2K, 3D, screens up to 12 m per the maker), sound 5.1 for films + 2 FBT J-Maxx 112A for shows, mixer QL-Milano AB-4, 2 TRX Audio digital wireless mics. `unpublished` keeps stage height, open-screen size, wireless mic model. The WhatsApp share text in `messages.ts` follows the spec.

## Jury
- Round 1: branch 7.0, main 6.7. Round 2 (media + fixes): 7.5. Pre-merge (logo + festival, fresh critic): 7.25, no critical findings. Fix list in `.jury/127.0.0.1-4401/scorecard.md` (git-ignored).

## Next
- Production domain for canonical. Photos for the load-in route and power sockets.
