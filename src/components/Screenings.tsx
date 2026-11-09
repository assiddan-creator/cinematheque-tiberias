import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  categoryLabel,
  filters,
  screenings,
  type FilterId,
  type Screening,
  type ScreeningCategory,
} from "../content";
import { futureDates, isListed } from "../schedule";
import { timetable, whenParts } from "../lib/when";
import { btnLine, btnRed, btnWhite } from "../ui";
import { ExternalLink } from "./ExternalLink";
import { SeatIcon } from "./SeatIcon";
import { FestivalSection } from "./Festival";
import { TrailerProvider, useTrailer } from "./TrailerDialog";

export function Poster({ src, title, eager = false }: { src?: string; title: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full items-end bg-house p-3 text-white">
        <span className="display text-2xl">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`כרזת ${title}`}
      width={300}
      height={420}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="h-full w-full bg-ink object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function labelFor(item: Screening, filter: FilterId) {
  if (filter !== "all" && filter in categoryLabel) {
    return categoryLabel[filter as ScreeningCategory];
  }
  return categoryLabel[item.categories[0]];
}

/** Home: every upcoming date as one row of the timetable. */
export function Timetable({ limit = 7 }: { limit?: number }) {
  const slots = timetable(screenings).slice(0, limit);
  if (!slots.length) return null;

  return (
    <section className="wrap py-16 lg:py-24" aria-labelledby="timetable-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="timetable-title" className="display t-xl">
            המועדים הקרובים
          </h2>
          <p className="mt-4 max-w-[26rem] text-muted">
            כל שורה היא הקרנה. הכפתור פותח את עמוד הרכישה של אותו סרט בתרבות טבריה, או בטיקצ׳אק למופעים.
          </p>
          <Link to="/screenings" className={`${btnLine} mt-6`}>
            ללוח המלא ולמנוי
          </Link>
        </div>

        <ol className="border-t-2 border-ink lg:col-span-8">
          {slots.map(({ item, when }) => {
            const parts = whenParts(when.iso);
            return (
              <li key={`${item.id}-${when.iso}`} className="row-hover border-b border-[var(--line)]">
                <article className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-center gap-x-4 gap-y-3 py-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-x-6">
                  <p className="nums row-span-2 self-start leading-none sm:row-span-1 sm:self-center">
                    <span className="display block text-[3.4rem] leading-[0.8] text-house">{parts.day}</span>
                    <span className="mt-1 block text-sm font-medium">{parts.month}</span>
                  </p>
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="hinge hidden h-[5.25rem] w-[3.75rem] shrink-0 sm:block">
                      <div className="h-full w-full overflow-hidden">
                        <Poster src={item.image} title={item.title} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-muted">
                        <SeatIcon />
                        <span className={parts.relative ? "text-house" : undefined}>
                          {parts.relative ? `${parts.relative}, ` : ""}
                          {parts.weekday}
                        </span>
                        <span className="nums">בשעה {parts.time}</span>
                      </p>
                      <h3 className="display mt-1 text-[clamp(1.75rem,1.3rem+1.3vw,2.4rem)] leading-[0.95]">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <ExternalLink href={item.buyHref} className={`${btnRed} btn-sm col-start-2 justify-self-start sm:col-start-3`}>
                    כרטיסים
                    <span className="sr-only">
                      {" "}
                      ל{item.title}, {parts.weekday} {parts.day} ב{parts.month}
                    </span>
                  </ExternalLink>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/** The kids pass, set as one big number. */
export function PassBand({ item }: { item: Screening }) {
  return (
    <article className="house on-house relative overflow-hidden" aria-labelledby={`${item.id}-title`}>
      <div className="wrap grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-20">
        <div className="lg:col-span-7">
          <p className="text-[0.9375rem] font-medium text-white/85">עונת 2026/2027, {categoryLabel.family}</p>
          <h2 id={`${item.id}-title`} className="display t-xl mt-3">
            {item.title}
          </h2>
          <p className="mt-5 max-w-[34rem] text-white/90">{item.summary}</p>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end lg:text-start">
          <p className="nums display text-[clamp(6rem,3rem+10vw,11rem)] leading-[0.78]">{item.price}</p>
          <p className="mt-3 max-w-[22rem] text-white/90">{item.priceNote}</p>
          <ExternalLink href={item.buyHref} className={`${btnWhite} mt-6`} arrow>
            לרכישת המנוי
          </ExternalLink>
        </div>
      </div>
    </article>
  );
}

/** A poster in a 2:3 frame. Posters of another shape sit whole on a blurred copy of themselves. */
function PosterFrame({ item, eager }: { item: Screening; eager: boolean }) {
  const [shape, setShape] = useState<"tall" | "other">("tall");
  const img = useRef<HTMLImageElement>(null);
  const measure = (el: HTMLImageElement | null) => {
    if (!el || !el.naturalWidth) return;
    const ratio = el.naturalWidth / el.naturalHeight;
    setShape(ratio > 0.6 && ratio < 0.76 ? "tall" : "other");
  };
  // the image may finish loading before React attaches onLoad (pre-rendered HTML)
  useEffect(() => measure(img.current), []);
  if (!item.image) {
    return (
      <div className="flex aspect-[2/3] items-end bg-house p-4 text-white">
        <span className="display text-3xl">{item.title}</span>
      </div>
    );
  }
  return (
    <div className="relative aspect-[2/3] overflow-hidden bg-ink">
      {shape === "other" ? (
        <img src={item.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl" />
      ) : null}
      <img
        src={item.image}
        alt={`כרזת ${item.title}`}
        width={400}
        height={600}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        ref={img}
        onLoad={(event) => measure(event.currentTarget)}
        className={`relative h-full w-full ${shape === "tall" ? "object-cover" : "object-contain"}`}
      />
    </div>
  );
}

function ShowCard({ item, filter, eager }: { item: Screening; filter: FilterId; eager: boolean }) {
  const dates = futureDates(item.dates);
  const openTrailer = useTrailer();
  const [next, ...later] = dates;
  const nextParts = next ? whenParts(next.iso) : null;

  return (
    <li className="row-hover flex flex-col">
      <article className="flex h-full flex-col" aria-labelledby={`show-${item.id}`}>
        <div className="hinge">
          <PosterFrame item={item} eager={eager} />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-muted">
            <SeatIcon />
            {labelFor(item, filter)}
          </p>
          <h3 id={`show-${item.id}`} className="display mt-2 text-[clamp(1.9rem,1.5rem+1.1vw,2.6rem)] leading-[0.92]">
            {item.title}
          </h3>
          <p className="mt-3 text-muted">{item.summary}</p>

          {nextParts ? (
            <div className="nums mt-4 border-t-2 border-ink pt-3">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium text-muted">המועד הקרוב</span>
                {nextParts.relative ? (
                  <span className="bg-house px-1.5 py-0.5 text-sm font-semibold text-white">{nextParts.relative}</span>
                ) : null}
              </p>
              <p className="mt-1 leading-none">
                <span className="display text-[2.4rem] text-house">{nextParts.day}</span>{" "}
                <span className="font-semibold">
                  ב{nextParts.month}, {nextParts.weekday}, {nextParts.time}
                </span>
              </p>
              {later.length ? (
                <ul className="mt-3 divide-y divide-[var(--line)] border-t border-[var(--line)] text-[0.9375rem]">
                  {later.map((date) => {
                    const parts = whenParts(date.iso);
                    return (
                      <li key={date.iso} className="flex items-baseline justify-between gap-3 py-1.5">
                        <span>
                          {parts.relative ? <strong className="font-semibold text-house">{parts.relative}, </strong> : null}
                          {parts.day} ב{parts.month}
                        </span>
                        <span className="text-muted">
                          {parts.weekday}, {parts.time}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <ExternalLink href={item.buyHref} className={btnRed} arrow>
              לרכישת כרטיסים
              <span className="sr-only"> ל{item.title}</span>
            </ExternalLink>
            {item.trailer ? (
              <button
                type="button"
                className={btnLine}
                onClick={(event) => openTrailer({ id: item.trailer!, title: item.title }, event.currentTarget)}
              >
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" focusable="false">
                  <path d="M4 2.5v11l9.5-5.5z" fill="currentColor" />
                </svg>
                צפייה בטריילר
                <span className="sr-only"> של {item.title}</span>
              </button>
            ) : null}
            {item.secondaryHref && item.secondaryLabel ? (
              <ExternalLink href={item.secondaryHref} className={btnLine}>
                {item.secondaryLabel}
              </ExternalLink>
            ) : null}
          </div>
        </div>
      </article>
    </li>
  );
}

export function ScreeningsBrowser() {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = useMemo(
    () =>
      screenings.filter((item) => {
        const categoryOk = filter === "all" || item.categories.includes(filter);
        return categoryOk && isListed(item);
      }),
    [filter],
  );
  const featured = visible.filter((item) => item.variant === "feature");
  const shows = visible
    .filter((item) => item.variant === "show")
    .sort((a, b) => (futureDates(a.dates)[0]?.t ?? 0) - (futureDates(b.dates)[0]?.t ?? 0));
  const boards = visible.filter((item) => item.variant === "board");
  const count = shows.length + featured.length + boards.length;

  return (
    <TrailerProvider>
      <div className="filter-bar sticky z-30 border-b border-[var(--line)] bg-ground/95 backdrop-blur-sm">
        <div className="wrap">
          <div role="group" aria-label="סינון הלוח לפי סוג" className="chip-row flex gap-2 py-3">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
                className="chip shrink-0 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="sr-only" role="status">
        {count} פריטים בלוח
      </p>

      <div className="wrap pt-6">
        {shows.length ? (
          <section aria-labelledby="shows-title">
            <h2 id="shows-title" className="sr-only">
              סרטים ומופעים עם מועד
            </h2>
            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {shows.map((item, index) => (
                <ShowCard key={item.id} item={item} filter={filter} eager={index === 0} />
              ))}
            </ul>
          </section>
        ) : null}

        {count === 0 || (!shows.length && !featured.length) ? (
          <p className="mt-6 text-muted">
            אין כרגע הקרנות עם מועד בקטגוריה הזו. לוח ההקרנות המלא נמצא בעמוד הסינמטק בתרבות טבריה.
          </p>
        ) : null}
      </div>

      {featured.length ? (
        <div className="mt-16">
          {featured.map((item) => (
            <PassBand key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {filter === "all" || filter === "family" ? <FestivalSection /> : null}

      <div className="wrap mt-16">
        <section aria-labelledby="boards-title" className="border-t-2 border-ink pt-5">
          <h2 id="boards-title" className="font-sans text-base font-semibold leading-normal">
            הלוחות המלאים
          </h2>
          <p className="mt-1 max-w-[44rem] text-sm text-muted">
            כרטיסים להקרנות נרכשים בתרבות טבריה. מופעי סטנדאפ והופעות חיות מופיעים גם בלוח טיקצ׳אק.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {(boards.length ? boards : screenings.filter((item) => item.variant === "board")).map((item) => (
              <li key={item.id}>
                <ExternalLink href={item.buyHref} className="inline-link">
                  {item.title}
                </ExternalLink>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[44rem] text-sm text-muted">
            המועדים נלקחו מלוח תרבות טבריה. אם שעה השתנתה או אזלו הכרטיסים, עמוד הרכישה הוא הקובע. תנאי רכישה
            וביטול לפי תקנון תרבות טבריה.
          </p>
        </section>
      </div>
    </TrailerProvider>
  );
}
