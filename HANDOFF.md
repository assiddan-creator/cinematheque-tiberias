# HANDOFF

## State (2026-11-09)
- Branch `awwwards-redesign`, pushed to origin. Not merged to main (owner's instruction).
- Concept: "the hall's seating plan" (see DESIGN.md). Phone-first: about 80% of visits are on phones.
- `origin/main` is 17 commits ahead of local main and broken (QuoteForm.tsx = `PLACEHOLDER_ORIGINAL`); not merged.
- `npm run build` pre-renders every route (scripts/prerender.mjs). Set `SITE_URL=https://…` at build time for canonical, og:url and sitemap.xml; no production domain is known yet.
- `npm run preview` serves the pre-rendered pages and a real 404 (plugin in vite.config.ts).

## Media
- Originals live in `media/` (git-ignored, never modified). Web copies in `public/media/`: WebP at 2000 px and 800 px, metadata stripped; one MP4 clip (H.264, no audio, 6.5 s) with a WebP poster.
- Data for page photos is in `src/media.ts`; the tech gallery entries are in `content.ts` (`gallery`).
- Used: 3, 5, 10, 14, 15, 18, 19, 37 and video "11.48.28 AM (1)" (lobby).
- Skipped for identifiable children: photos 11, 12, 16, 22, 23, 24, 26, 28 to 36, 38 to 46, 48 to 50; videos 11.48.21, 11.48.23 (1), 11.48.23, 11.48.24 (1).
- Not used, no children issue (adult shows, duplicates of chosen frames): 1, 2, 4, 6, 7, 8, 9, 13, 17, 20, 21, 25, 27, 47, 51 to 56.
- Gallery sketches still waiting for photos: Thomas PARs on the battens, load-in route, dressing rooms, power sockets.

## Jury
- Round 1: branch 7.0, main 6.7. Round 2 (after media and fixes): see `.jury/127.0.0.1-4401/scorecard.md`.

## Next
- Production domain for canonical. Photos for the four remaining sketches.
