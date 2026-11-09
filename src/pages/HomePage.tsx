import { Link } from "react-router-dom";
import { CinemaHero } from "../components/CinemaHero";
import { usePageTitle } from "../lib/usePageTitle";
import { lineButton } from "../ui";

export function HomePage() {
  usePageTitle("סינמטק טבריה — קולנוע, תרבות וכנסים");

  return (
    <>
      <CinemaHero />
      <section className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-2xl">אולם להשכרה ולכנסים</h2>
          <p className="mt-2 max-w-xl text-silver">319 מקומות, במה רחבה, מערכות הקרנה וסאונד מתקדמות.</p>
        </div>
        <Link to="/events" className={lineButton}>
          להשכרת האולם
        </Link>
      </section>
    </>
  );
}
