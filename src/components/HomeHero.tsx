import { Link } from "react-router-dom";
import { categoryLabel, links, quickSpecs, screenings, venue } from "../content";
import { timetable, whenParts } from "../lib/when";
import { btnGhost, btnWhite } from "../ui";
import { ExternalLink } from "./ExternalLink";
import { Fresh } from "./Fresh";
import { SeatField } from "./SeatField";
import { Logo } from "./Logo";

function NextScreening() {
  const next = timetable(screenings)[0];
  const when = next ? whenParts(next.when.iso) : null;
  return (
          <div className="relative bg-paper p-5 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)] sm:p-7">
            {next && when ? (
              <>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] font-medium text-muted">
                  <span className="text-house">ההקרנה הבאה</span>
                  <span aria-hidden="true" className="h-px w-6 bg-[var(--line)]" />
                  <span>{categoryLabel[next.item.categories[0]]}</span>
                </p>
                <h2 className="display t-l mt-3 max-w-[18ch]">{next.item.title}</h2>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-[var(--line)] pt-4">
                  <p className="nums leading-none">
                    <span className="display t-m block text-house">
                      {when.relative ? `${when.relative}, ` : ""}
                      {when.weekday}
                    </span>
                    <span className="mt-1.5 block text-[1.0625rem] font-medium">
                      {when.day} ב{when.month}, בשעה {when.time}
                    </span>
                  </p>
                  <ExternalLink href={next.item.buyHref} className="btn btn-red" arrow>
                    לרכישת כרטיסים
                  </ExternalLink>
                </div>
              </>
            ) : (
              <>
                <h2 className="display t-l">לוח ההקרנות</h2>
                <p className="mt-3 text-muted">המועדים המעודכנים מתפרסמים בעמוד הסינמטק בתרבות טבריה.</p>
                <ExternalLink href={links.cinematheque} className="btn btn-red mt-5" arrow>
                  לרכישת כרטיסים
                </ExternalLink>
              </>
            )}
          </div>
  );
}

export function HomeHero() {
  const seats = quickSpecs[0];

  return (
    <section
      className="house on-house relative isolate overflow-hidden"
      aria-labelledby="home-title"
      data-seat-host
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[46%] -z-10 sm:top-[40%] lg:top-[34%]">
        <SeatField mode="hall" />
      </div>

      <div className="wrap grid min-h-[calc(100svh-3.75rem)] grid-cols-1 content-start gap-y-6 pb-[52vw] pt-6 sm:pb-[38vw] lg:min-h-[44rem] lg:grid-cols-12 lg:gap-x-8 lg:pb-[30vw] lg:pt-12 xl:pb-[26rem]">
        <div className="lg:col-span-5">
          <h1 id="home-title" className="sr-only">
            סינמטק טבריה
          </h1>
          <div id="hero-logo" className="-ms-1 w-full max-w-[34rem] lg:-ms-3">
            <Logo tone="red" className="block h-auto w-full" />
          </div>
          <p className="over-seats mt-4 max-w-[22rem] text-[1rem] leading-snug text-white sm:mt-5 sm:text-[1.0625rem]">
            {venue.place}, {venue.street.split(" / ")[0]}, {venue.city}. סרטי ילדים מדובבים, טרום-בכורה, מופעים וכנסים.
          </p>
        </div>

        {/* the screen: the next screening */}
        <div className="lg:col-span-7 lg:col-start-6 lg:pt-6">
          <Fresh>
            <NextScreening />
          </Fresh>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/screenings" className={btnWhite}>
              כל הסרטים והמועדים
            </Link>
            <Link to="/events" className={`${btnGhost} bg-house/90`}>
              השכרת האולם
            </Link>
          </div>
        </div>
      </div>

      <p className="nums pointer-events-none absolute bottom-4 end-[var(--gutter)] bg-house/85 px-2.5 py-1.5 text-end text-sm font-medium text-white sm:bottom-6">
        <span className="display block text-[2.6rem] leading-none text-white">{seats.value}</span>
        {seats.label}, {seats.note}
      </p>
    </section>
  );
}
