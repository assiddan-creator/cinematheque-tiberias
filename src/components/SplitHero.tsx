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
    <section className="relative overflow-hidden border-b border-gold/20" aria-labelledby="home-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} aria-hidden="true" />
      <div className={`${container} relative py-6 lg:py-8`}>
        <motion.h1 id="home-title" className="display-title max-w-4xl" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.5 }}>
          סינמטק טבריה — חוויית קולנוע, תרבות וכנסים בסטנדרט יוקרתי
        </motion.h1>
        <p className="mt-3 max-w-2xl text-silver">מתחם תרבות יד לבנים, רחוב וינגייט 7, טבריה</p>
      </div>
      <div className="relative grid lg:min-h-[40rem] lg:grid-cols-2">
        <article className="cinema-panel relative flex flex-col gap-4 border-b border-gold/20 p-6 lg:border-b-0 lg:p-10">
          <div>
            <h2 className="text-3xl lg:text-4xl">קולנוע, טרום-בכורה ומופעים</h2>
            <p className="mt-2 max-w-md text-silver">צפייה בלוח ההקרנות ורכישת כרטיסים ישירה דרך תרבות טבריה, ולוח ההופעות בטיקצ׳אק.</p>
          </div>
          <div className="relative mt-2 h-48 w-full max-w-2xl overflow-hidden rounded-sm border border-white/10 bg-black shadow-[0_0_80px_rgba(212,175,55,0.15)] sm:h-56">
            <div className="screen-glow absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
            <div className="relative flex h-full items-center justify-center p-6 text-center">
              <p className="bg-[#f3ead0]/95 px-4 py-3 font-display text-2xl leading-snug text-[#1c160c] shadow-lg sm:text-3xl">{next ? next.title : "סינמטק טבריה"}</p>
            </div>
          </div>
          {next && when ? (<p className="text-sm"><span className="text-silver">ההקרנה הקרובה: </span><ExternalLink href={next.buyHref} className="text-ivory underline decoration-gold/40 underline-offset-4">{next.title}</ExternalLink><span className="mt-1 block nums text-gold/90">{when.date}, בשעה {when.time}</span></p>) : (<p className="text-silver">המועדים המעודכנים מתפרסמים בלוח ההקרנות.</p>)}
          <div className="mt-auto flex flex-wrap gap-3 pt-2"><Link to="/screenings" className={lineButton}>ללוח ההקרנות</Link><ExternalLink href={links.cinematheque} className={goldButton}>לרכישת כרטיסים</ExternalLink><ExternalLink href={links.tickchak} className={lineButton}>לוח ההופעות בטיקצ׳אק</ExternalLink></div>
        </article>
        <article className="stage-panel relative flex flex-col gap-4 p-6 lg:p-10">
          <div><h2 className="text-3xl lg:text-4xl">אירועים, כנסים ומוסדות חינוך</h2><p className="mt-2 max-w-md text-silver">השכרת אולם קולנוע ותיאטרון מונגש, עם במה רחבה ומערכות הקרנה וסאונד מתקדמות.</p></div>
          <div className="my-2"><p className="nums"><span className="block font-display text-8xl leading-none tracking-tight text-gold sm:text-9xl">319</span><span className="mt-1 block text-lg text-silver">מקומות ישיבה</span></p></div>
          <dl className="grid max-w-md gap-3 text-sm"><div className="border-t border-gold/20 pt-3"><dt className="text-silver">במה</dt><dd>רוחב 9.5 מ׳, עומק 6.5 מ׳, גובה פנוי 4.9 מ׳</dd></div><div className="border-t border-gold/20 pt-3"><dt className="text-silver">הקרנה ושמע</dt><dd>שרת DCP, מצגות אלחוטיות וסאונד היקפי 5.1</dd></div><div className="border-t border-gold/20 pt-3"><dt className="text-silver">נגישות</dt><dd>אולם מונגש במלואו</dd></div></dl>
          <div className="mt-auto flex flex-wrap gap-3 pt-2"><Link to="/events#quote" className={goldButton}>בדיקת זמינות והצעת מחיר</Link><Link to="/events#education" className={lineButton}>הסינמטק החינוכי</Link><Link to="/tech" className={lineButton}>מפרט טכני למפיקים</Link></div>
        </article>
      </div>
    </section>
  );
}
