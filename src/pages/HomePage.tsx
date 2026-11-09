import { screenings } from "../content";
import { Fresh } from "../components/Fresh";
import { HomeHero } from "../components/HomeHero";
import { PassBand, Timetable } from "../components/Screenings";
import { RentalTeaser } from "../components/RentalTeaser";
import { usePageMeta } from "../lib/usePageTitle";

export function HomePage() {
  usePageMeta("/");
  const pass = screenings.find((item) => item.variant === "feature");

  return (
    <>
      <HomeHero />
      <Fresh>
        <Timetable />
      </Fresh>
      {pass ? <PassBand item={pass} /> : null}
      <RentalTeaser />
    </>
  );
}
