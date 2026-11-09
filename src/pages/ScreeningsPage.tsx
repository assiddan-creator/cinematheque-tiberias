import { ScreeningsBrowser } from "../components/Screenings";
import { Fresh } from "../components/Fresh";
import { PageIntro } from "../components/PageIntro";
import { links } from "../content";
import { usePageMeta } from "../lib/usePageTitle";
import { ExternalLink } from "../components/ExternalLink";

export function ScreeningsPage() {
  usePageMeta("/screenings");

  return (
    <div className="pb-20">
      <PageIntro
        title="סרטים, מנויים ומופעים"
        lede="כרטיסים להקרנות נרכשים בתרבות טבריה. מופעי סטנדאפ והופעות חיות מופיעים גם בלוח טיקצ׳אק."
      >
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
          <ExternalLink href={links.cinematheque} className="inline-link">
            עמוד הסינמטק
          </ExternalLink>
          <ExternalLink href={links.allShows} className="inline-link">
            כל המופעים
          </ExternalLink>
          <ExternalLink href={links.tickchak} className="inline-link">
            טיקצ׳אק
          </ExternalLink>
        </p>
      </PageIntro>
      <Fresh>
        <ScreeningsBrowser />
      </Fresh>
    </div>
  );
}
