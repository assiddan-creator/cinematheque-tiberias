# HANDOFF

## State (2026-11-09)
- Merged into `main` on 2026-11-09 (`git merge -s ours origin/main`, so origin/main's broken design attempts were discarded) and pushed. Branch `awwwards-redesign` kept; `origin/claude-redesign` also exists on GitHub (not touched).
- Concept: "the hall's seating plan" (see DESIGN.md). Phone-first: about 80% of visits are on phones.
- `npm run build` pre-renders every route (scripts/prerender.mjs). Set `SITE_URL=https://…` at build time for canonical, og:url and sitemap.xml; no production domain is known yet.
- `npm run preview` serves the pre-rendered pages and a real 404 (plugin in vite.config.ts).

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
- Gallery sketches still waiting for photos: Thomas PARs on the battens, load-in route, dressing rooms, power sockets.

## Jury
- Round 1: branch 7.0, main 6.7. Round 2 (media + fixes): 7.5. Pre-merge (logo + festival, fresh critic): 7.25, no critical findings. Fix list in `.jury/127.0.0.1-4401/scorecard.md` (git-ignored).

## Next
- Production domain for canonical. Photos for the four remaining sketches.
