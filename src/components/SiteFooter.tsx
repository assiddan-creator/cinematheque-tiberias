import { Link } from "react-router-dom";
import { links, venue } from "../content";
import { ExternalLink } from "./ExternalLink";

const linkClass = "util-link inline-flex min-h-7 items-center";

export function SiteFooter() {
  return (
    <footer className="no-print bg-ink text-white">
      <div className="wrap grid gap-10 pb-10 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        <div className="lg:col-span-6">
          <p className="display text-[clamp(4rem,2rem+7vw,8.5rem)] leading-[0.8]">{venue.name}</p>
          <p className="mt-4 text-white/75">מרכז תרבות, קולנוע וכנסים</p>
        </div>

        <address className="not-italic lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold leading-normal text-white/75">ביקור ופנייה</h2>
          <ul className="mt-3 space-y-1.5">
            <li>
              <ExternalLink href={venue.maps} className={linkClass}>
                {venue.place}, {venue.street}, {venue.city}
              </ExternalLink>
            </li>
            <li>
              <a href={`tel:${venue.phoneTel}`} className={`${linkClass} nums`}>
                טלפון {venue.phoneDisplay}
              </a>
            </li>
            <li>
              <ExternalLink href={`https://wa.me/${venue.whatsappE164}`} className={`${linkClass} nums`}>
                וואטסאפ {venue.whatsappDisplay}
              </ExternalLink>
            </li>
            <li>
              <a href={`mailto:${venue.email}`} className={linkClass}>
                {venue.email}
              </a>
            </li>
          </ul>
        </address>

        <nav aria-label="קישורים נוספים" className="lg:col-span-3">
          <h2 className="font-sans text-sm font-semibold leading-normal text-white/75">באתר ובתרבות טבריה</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            <li>
              <Link to="/screenings" className={linkClass}>
                סרטים ומופעים
              </Link>
            </li>
            <li>
              <Link to="/events" className={linkClass}>
                השכרת האולם
              </Link>
            </li>
            <li>
              <Link to="/tech" className={linkClass}>
                מפרט טכני
              </Link>
            </li>
            <li>
              <ExternalLink href={links.buyers} className={linkClass}>
                מידע לרוכשים
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.access} className={linkClass}>
                הסדרי נגישות
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={links.terms} className={linkClass}>
                תקנון
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={venue.facebook} className={linkClass}>
                פייסבוק
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="wrap" aria-hidden="true">
        <div className="flex gap-[0.6%] pb-6">
          {Array.from({ length: 21 }, (_, index) => (
            <span key={index} className="h-3 flex-1 rounded-t-full bg-house" />
          ))}
        </div>
      </div>
    </footer>
  );
}
