import { ScreeningsBrowser } from "../components/Screenings";
import { PageIntro } from "../components/PageIntro";
import { links } from "../content";
import { usePageTitle } from "../lib/usePageTitle";
import { container } from "../ui";
import { ExternalLink } from "../components/ExternalLink";

export function ScreeningsPage() {
  usePageTitle("סרטים ומופעים — סינמטק טבריה");

  return (
    <div className="pb-16">
      <PageIntro
        title="סרטים, מנויים ומופעים"
        lede="כרטיסים להקרנות נרכשים בתרבות טבריה. מופעי סטנדאפ והופעות חיות מופיעים גם בלוח טיקצ׳אק."
      >
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <ExternalLink href={links.cinematheque} className="text-ivory underline decoration-gold/40 underline-offset-4">
            עמוד הסינמטק
          </ExternalLink>
          <ExternalLink href={links.allShows} className="text-ivory underline decoration-gold/40 underline-offset-4">
            כל המופעים
          </ExternalLink>
          <ExternalLink href={links.tickchak} className="text-ivory underline decoration-gold/40 underline-offset-4">
            טיקצ׳אק
          </ExternalLink>
        </p>
      </PageIntro>
      <div className={`${container} pb-4`}>
        <ScreeningsBrowser />
      </div>
    </div>
  );
}
