import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { links, screenings } from "../content";
import { formatWhen, futureDates, upcomingShows } from "../schedule";
import { container, goldButton, lineButton } from "../ui";
import { ExternalLink } from "./ExternalLink";

export function SplitHero() {
  const reduce = useReducedMotion();
  const next = upcomingShows(screenings, 1)[0];
  const nextWhen = next ? futureDates(next.dates)[0] : undefined;
  const when = nextWhen ? formatWhen(nextWhen.iso) : null;

  return (
    <section className="border-b border-gold/20" aria-labelledby="home-title">
      <div className={`${container} py-5 lg:py-6`}>
        <motion.h1
          id="home-title"
          className="display-title max-w-4xl"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          סינמטק טבריה — חוויית קולנוע, תרבות וכנסים בסטנדרט יוקרתי
        </motion.h1>
        <p className="mt-3 max-w-2xl text-silver">
          {`מתחם תרבות יד לבנים, רחוב וינגייט 7, טבריה`}
        </p>
      </div>

      <div className="relative grid lg:min-h-[36rem] lg:grid-cols-2">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gold/40 lg:block"
          aria-hidden="true"
        />

        <article className="cinema-panel flex flex-col gap-3 border-b border-gold/20 p-6 lg:border-b-0 lg:p-8">
          <div>
            <h2 className="text-3xl">קולנוע, טרום-בכורה ומופעים</h2>
            <p className="mt-2 max-w-md text-silver">
              צפייה בלוח ההקרנות ורכישת כרטיסים ישירה דרך תרבות טבריה, ולוח ההופעות בטיקצ׳אק.
            </p>
          </div>

          <div className="relative h-32 w-full max-w-xl border border-white/15 bg-black">
            <div className="screen-glow absolute inset-0" aria-hidden="true" />
            <div className="relative flex h-full items-center justify-center p-4 text-center">
              <p className="bg-[#f3ead0]/92 px-3 py-2 font-display text-xl leading-snug text-[#1c160c] sm:text-2xl">
                {next ? next.title : "סינמטק טבריה"}
              </p>
            </div>
          </div>

          {next && when ? (
            <p className="text-sm">
              <span className="text-silver">ההקרנה הקרובה: </span>
              <ExternalLink href={next.buyHref} className="text-ivory underline decoration-gold/40 underline-offset-4">
                {next.title}
              </ExternalLink>
              <span className="mt-1 block nums">
                {when.date}, בשעה {when.time}
              </span>
            </p>
          ) : (
            <p className="text-silver">המועדים המעודכנים מתפרסמים בלוח ההקרנות.</p>
          )}

          <div className="mt-auto flex flex-wrap gap-3">
            <Link to="/screenings" className={lineButton}>
              ללוח ההקרנות
            </Link>
            <ExternalLink href={links.cinematheque} className={goldButton}>
              לרכישת כרטיסים
            </ExternalLink>
            <ExternalLink href={links.tickchak} className={lineButton}>
              לוח ההופעות בטיקצ׳אק
            </ExternalLink>
          </div>
        </article>

        <article className="stage-panel flex flex-col gap-3 p-6 lg:p-8">
          <div>
            <h2 className="text-3xl">אירועים, כנסים ומוסדות חינוך</h2>
            <p className="mt-2 max-w-md text-silver">
              השכרת אולם קולנוע ותיאטרון מונגש, עם במה רחבה ומערכות הקרנה וסאונד מתקדמות.
            </p>
          </div>

          <p className="nums">
            <span className="block font-display text-6xl leading-none">319</span>
            <span className="mt-2 block text-silver">מקומות ישיבה</span>
          </p>

          <dl className="grid max-w-md gap-3 text-sm">
            <div className="border-t border-gold/20 pt-3">
              <dt className="text-silver">במה</dt>
              <dd>רוחב 9.5 מ׳, עומק 6.5 מ׳, גובה פנוי 4.9 מ׳</dd>
            </div>
            <div className="border-t border-gold/20 pt-3">
              <dt className="text-silver">הקרנה ושמע</dt>
              <dd>שרת DCP, מצגות אלחוטיות וסאונד היקפי 5.1</dd>
            </div>
            <div className="border-t border-gold/20 pt-3">
              <dt className="text-silver">נגישות</dt>
              <dd>אולם מונגש במלואו</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-3">
            <Link to="/events#quote" className={goldButton}>
              בדיקת זמינות והצעת מחיר
            </Link>
            <Link to="/events#education" className={lineButton}>
              הסינמטק החינוכי
            </Link>
            <Link to="/tech" className={lineButton}>
              מפרט טכני למפיקים
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
