# HANDOFF

## State (2026-11-09)
- Branch `awwwards-redesign` (not committed, not pushed). Redesign concept: "the hall's seating plan" (see DESIGN.md).
- Base is local `main` (d4e3f91). `origin/main` is 17 commits ahead and broken (QuoteForm.tsx = `PLACEHOLDER_ORIGINAL`); it was not merged.
- Data files `src/content.ts` and `src/schedule.ts` are untouched.
- 80% of visitors are on phones: the 390 px layout is the primary design.
- `npm run build` now also pre-renders every route (scripts/prerender.mjs). Set `SITE_URL=https://…` at build time to get canonical, og:url and sitemap.xml; no production domain is known yet.
- `npm run preview` serves the pre-rendered pages and a real 404 (plugin in vite.config.ts).

## Jury (2026-11-09, independent critics)
- Branch: critic 7.0 (jury estimate about 8.1). Main: critic 6.7 (about 7.8). Cards in `.jury/*/scorecard.md`.

## Next
- `media/` holds 7 WhatsApp photos added today (not yet used). Both critics asked for real hall photos.
- Set the production domain (canonical), then the fix list in `.jury/127.0.0.1-4401/scorecard.md`.
