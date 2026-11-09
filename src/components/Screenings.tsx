import { useMemo, useState } from "react";
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
import { photos } from "../media";
import { Photo } from "./Photo";

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
                        <span className="seat-mark !h-3 !w-2.5" aria-hidden="true" />
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

function ShowRow({ item, filter }: { item: Screening; filter: FilterId }) {
  const dates = futureDates(item.dates);
  return (
    <li className="row-hover border-b border-[var(--line)]">
      <article className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-5 gap-y-4 py-6 sm:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[10rem_minmax(0,1fr)_minmax(15rem,0.7fr)] lg:gap-x-8">
        <div className="hinge row-span-2 lg:row-span-1">
          <div className="aspect-[5/7] overflow-hidden">
            <Poster src={item.image} title={item.title} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-medium text-muted">
            <span className="seat-mark !h-3 !w-2.5" aria-hidden="true" />
            {labelFor(item, filter)}
          </p>
          <h3 className="display mt-2 text-[clamp(2rem,1.4rem+1.8vw,3.1rem)] leading-[0.92]">{item.title}</h3>
          <p className="mt-3 max-w-[36rem] text-muted">{item.summary}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 sm:col-start-2 lg:col-start-3 lg:row-start-1">
          <ul className="nums divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {dates.map((date) => {
              const parts = whenParts(date.iso);
              return (
                <li key={date.iso} className="flex items-baseline justify-between gap-3 py-2">
                  <span>
                    <span className="display text-[1.9rem] leading-none text-house">{parts.day}</span>{" "}
                    <span className="font-medium">ב{parts.month}</span>
                  </span>
                  <span className="text-sm text-muted">
                    {parts.relative ? <strong className="font-semibold text-house">{parts.relative} </strong> : null}
                    {parts.weekday}, {parts.time}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <ExternalLink href={item.buyHref} className={btnRed} arrow>
              לרכישת כרטיסים
            </ExternalLink>
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

function BoardRow({ item, filter }: { item: Screening; filter: FilterId }) {
  return (
    <li className="row-hover grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-muted">
          <span className="seat-mark !h-3 !w-2.5" aria-hidden="true" />
          {labelFor(item, filter)}. השעות בעמוד הרכישה.
        </p>
        <h3 className="display mt-1.5 text-[clamp(1.75rem,1.3rem+1.2vw,2.4rem)] leading-[0.95]">{item.title}</h3>
        <p className="mt-2 max-w-[40rem] text-muted">{item.summary}</p>
      </div>
      <ExternalLink href={item.buyHref} className={`${btnLine} justify-self-start`}>
        לעמוד הלוח
        <span className="sr-only"> {item.title}</span>
      </ExternalLink>
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
    <div>
      <div className="wrap">
        <div role="group" aria-label="סינון הלוח לפי סוג" className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className="chip"
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          {count} פריטים בלוח
        </p>
      </div>

      {featured.length ? (
        <div className="mt-8">
          {featured.map((item) => (
            <PassBand key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      <div className="wrap">
        {shows.length ? (
          <section aria-labelledby="shows-title" className="mt-12">
            <h2 id="shows-title" className="display t-l">
              הקרנות ומופעים עם מועד
            </h2>
            <ul className="mt-5 border-t-2 border-ink">
              {shows.map((item) => (
                <ShowRow key={item.id} item={item} filter={filter} />
              ))}
            </ul>
          </section>
        ) : null}

        <figure className="mt-14">
          <div className="aspect-[4/3] overflow-hidden bg-ink sm:aspect-[21/9]">
            <Photo photo={photos.hallScreening} sizes="(min-width: 1400px) 1340px, 100vw" className="object-[50%_35%]" />
          </div>
          <figcaption className="mt-2 text-sm text-muted">הקרנה באולם הסינמטק, מבט מהשורות האחוריות</figcaption>
        </figure>

        {boards.length ? (
          <section aria-labelledby="boards-title" className="mt-14">
            <h2 id="boards-title" className="display t-l">
              הלוחות המלאים
            </h2>
            <ul className="mt-5 border-t-2 border-ink">
              {boards.map((item) => (
                <BoardRow key={item.id} item={item} filter={filter} />
              ))}
            </ul>
          </section>
        ) : null}

        {count === 0 ? (
          <p className="mt-10 text-muted">
            אין כרגע פריטים בקטגוריה הזו. לוח ההקרנות המלא נמצא בעמוד הסינמטק בתרבות טבריה.
          </p>
        ) : null}

        <p className="mt-10 max-w-[44rem] text-sm text-muted">
          המועדים נלקחו מלוח תרבות טבריה. אם שעה השתנתה או אזלו הכרטיסים, עמוד הרכישה הוא הקובע. תנאי רכישה
          וביטול לפי תקנון תרבות טבריה.
        </p>
      </div>
    </div>
  );
}
