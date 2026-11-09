import { ScreeningsBrowser } from "../components/Screenings";
import { Fresh } from "../components/Fresh";
import { usePageMeta } from "../lib/usePageTitle";

export function ScreeningsPage() {
  usePageMeta("/screenings");

  return (
    <div className="pb-20">
      <header className="wrap pb-3 pt-6 lg:pb-4 lg:pt-10">
        <h1 className="display t-m">סרטים, מנויים ומופעים</h1>
      </header>
      <Fresh>
        <ScreeningsBrowser />
      </Fresh>
    </div>
  );
}
