# DESIGN.md — סינמטק טבריה, awwwards-redesign

## Brief

- Subject: סינמטק טבריה, אולם קולנוע ותיאטרון של 319 מקומות במתחם תרבות יד לבנים.
- Audiences: families from Tiberias (most screenings are dubbed kids films at 17:00), stand-up
  audiences, and conference / school organizers renting the hall.
- Job: find the next screening and reach the ticket page in two clicks or fewer.
  Second job: get an organizer to the quote form with the hall's real numbers in view.
- Constraints: all data stays in `src/content.ts` and `src/schedule.ts`, untouched. Routes `/`,
  `/screenings`, `/events`, `/tech`, the quote form. Hebrew RTL. Mouse-reactive motion that never
  costs readability, a composed phone layout, `prefers-reduced-motion` honored.
- Device: about 80% of visits are on phones (owner, 2026-11-09). The 390 px layout is the
  primary design; desktop is the adaptation. On phones the next screening and its ticket button
  sit inside the first screen, the header is one line, the seat hall runs at 30 fps and pauses
  while the page scrolls, and the quote form's seat plan sits right under the guest field.
- Excluded on purpose: the "dark hall, the pointer is the projector beam" idea. Nothing here is
  dark, and no light follows the pointer.

## Three concepts

| | A. The seating plan (formal + material) | B. The letter board (material) | C. The Kinneret gauge (place) |
|---|---|---|---|
| Idea | The site is drawn on the hall's real seating plan: 15 rows of 21 seats, in velvet red, and the seats fold up as you pass, like a hall filling up | Every title is set on a slotted lobby letter board; letters slide into grooves as the program changes | The page is the lake's famous water level gauge; scrolling raises the line and each screening is a mark on the scale |
| Anchor | 319 seats, 15 × 21, the number this venue sells to families and organizers alike | the program is literally a hand-updated "לוח" | Tiberias sits on the Kinneret |
| Layout | rows: lists are rows, the transition is rows, the quote form fills seats | grooved board strips | one vertical scale |
| Motion verb | fold up on a hinge, like a cinema seat | slot in sideways | rise like water |
| Signature | pointer folds the seats of the hero hall; an idle wave runs through the audience; the quote form fills the plan with the number of guests | letters slide into place on hover | scroll-scrubbed water line |
| Screenshot | the red hall with a crescent of folded seats under the pointer and the next film on the white screen | a board of Hebrew letters mid-slide | the gauge with a red mark at today |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 3 / 4 / 4 / 4 | 4 / 2 / 3 / 2 |

**Pick A.** It is the only one that serves all three audiences with the same object (families see
seats, organizers see capacity), it is built from a true fact about this hall, and it survives to
the 404 and the form. Stolen from B for the 404: the missing row is announced like a board notice.

## Concept card

```
Idea:        The site is the hall's own seating plan, 15 rows of 21 red seats, and the program sits on its screen.
Metaphor:    a cinema auditorium seen from the back row, house lights up for a family matinee.
Signature:   the hero hall: a canvas of 315 seats that fold up on a hinge under the pointer
             (tap on phones), with an idle "audience wave" every few seconds; reused on /events,
             where the guest count fills the plan seat by seat.
Emotion:     the moment before a matinee: bright, red, expectant, simple enough for a parent with a child on one arm.
Motion verb: fold up on a hinge (origin at the bottom edge, quick, slight settle).
Screenshot:  the red house with a crescent of folded seats, and the next film's title and date on the white screen above.
```

## Art direction

**Palette** (house lights up, not a dark hall)

| Role | Hex | Use |
|---|---|---|
| ground | `#EEEDEA` | screen white, page ground |
| ink | `#16131A` | text |
| muted | `#57525C` | secondary text (6.9:1 on ground) |
| line | `rgb(22 19 26 / .16)` | hairlines, row rules |
| house | `#9E1430` | velvet red: the hall, primary buttons, the transition (white on it 7.6:1) |
| seat / seat-up | `#6F0C22` / `#D9506A` | seat backs at rest / folded seat |

**Type.** Karantina (Google, OFL), a condensed Hebrew poster face, for display: titles, dates,
the big numbers. Rubik (Google, variable 400 to 700) for text and UI: round enough for a family
site, very legible in Hebrew. Both self-hosted with Hebrew + Latin subsets. Display leading 0.86
to 0.95, no negative tracking on Hebrew (it damages the letter joins); scale contrast does the work.
Body 17 to 18 px, leading 1.55.

**Grid.** 12 columns, gutter `clamp(16px, 2.4vw, 32px)`, outer margin = gutter. Everything hangs
from the start line (right edge, RTL) and column 7. Section rhythm: hero full height, timetable
tight, pass airy, rental normal, footer finale.

**Shape.** Radius 0 on blocks; 999px only on seats and filter chips (seats are round-backed).

**Motion language.** One ease family: `cubic-bezier(.2,.8,.2,1)` (out) and
`cubic-bezier(.7,0,.2,1)` (in-out). Hover 0.35 s, transition 0.45 s each way, stagger 18 ms per
row. Everything that moves hinges at its bottom edge.

- Primary buttons: a fill folds up from the bottom edge and the label inverts.
- Nav: a 3 px bar folds up under the link; the current page keeps it.
- Posters and rows: the poster tips back on a bottom hinge (rotateX), the row's seat marker folds.
- Inline links: underline at rest, it thickens on hover.
- Page transition: 15 red rows fold up from the back row to the front, the route changes, they fold away.

**Idle.** The hero hall runs an audience wave (a band of seats lifts and settles) on the GSAP
ticker, paused off screen, off under reduced motion. Inner pages are still at rest by decision:
their life is the hovers and the guest-count plan on /events.

## Composition

```
HOME
┌────────────────────────── header: wordmark · nav · [לרכישת כרטיסים] ─┐
│ RED HOUSE (100svh)                                                    │
│  h1 סינמטק / טבריה (mega, white)        ┌── white SCREEN ──────────┐ │
│  one line: where                         │ ההקרנה הבאה · title XL    │ │
│                                          │ date · time · [כרטיסים]   │ │
│                                          └───────────────────────────┘ │
│  ░░░░░░░░ 15 curved rows × 21 seats (canvas, folds under pointer) ░░  │
│  319 מקומות ישיבה                                    ↓ הלוח            │
├─ TIMETABLE (index list): every upcoming date as a row ────────────────┤
│  day/date (Karantina) │ time │ title + note │ poster │ [כרטיסים]      │
├─ PASS (data): 99 ₪ huge │ 5 כניסות │ text │ [למנוי]                    │
├─ RENTAL (asymmetric pair): 319 mega │ 3 package links → /events, /tech│
└─ FOOTER finale: address, phone, WhatsApp, mail, legal links ──────────┘
/screenings: intro → filter chips → kids pass band → show rows with all dates → board rows
/events:     intro with 319 → packages as rows → quote form beside a live seating plan
/tech:       intro + actions → quick specs strip → spec sheet groups → truss plan → unpublished → gallery
/404:        "שורה 16" — the hall has 15 rows
```

## Genericness test

- A generic model would land on "dark luxury cinema with gold" (the old site) or a projector
  beam (main). Changed: light ground, velvet red, seats as the visual system.
- A generic model would put three equal package cards on /events. Changed: packages are rows
  with their real numbers, and the form sits beside a seating plan that answers the guest count.
- A generic hero would be a poster carousel. Changed: one next screening on a "screen", with the
  hall below it doing the motion.

## Engineering decisions

- Stack: existing Vite + React 19 + Tailwind 4. Added GSAP (one ticker for the seat field, the
  transition and Lenis) and Lenis (fine pointer only, off under reduced motion). framer-motion removed.
- Pre-rendering: `npm run build` also renders every route to static HTML so crawlers and the
  first paint get real text; the client then mounts with `createRoot` (not hydrate) because
  "upcoming" depends on the visitor's clock.
- No production domain is known, so canonical, `og:url` and the sitemap are written only when
  `SITE_URL` is set at build time (`SITE_URL=https://… npm run build`).
