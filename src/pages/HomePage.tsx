import { Link } from "react-router-dom";
import { screenings } from "../content";
import { upcomingShows } from "../schedule";
import { SplitHero } from "../components/SplitHero";
import { UpcomingStrip } from "../components/Screenings";
import { usePageTitle } from "../lib/usePageTitle";
import { lineButton } from "../ui";

export function HomePage() {
  usePageTitle("סינמטק טבריה — קולנוע, תרבות וכנסים");
  const hasShows = upcomingShows(screenings, 1).length > 0;

  return (
    <>
      <SplitHero />
      {hasShows ? <UpcomingStrip /> : null}
      <section className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-10 sm:px-6 lg:px-8">
        <p className="max-w-xl text-silver">הלוח המלא, המנויים ומופעי הסטנדאפ נמצאים בעמוד הסרטים.</p>
        <Link to="/screenings" className={lineButton}>
          לכל הסרטים והמופעים
        </Link>
      </section>
    </>
  );
}
