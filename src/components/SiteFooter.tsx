import { Link } from "react-router-dom";
import { links, venue } from "../content";
import { ExternalLink } from "./ExternalLink";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-gold/20 bg-stone">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl">{venue.name}</p>
          <p className="mt-2 text-sm text-silver">מרכז תרבות, קולנוע וכנסים</p>
        </div>
        <address className="text-sm not-italic text-silver">
          <p className="text-ivory">ביקור ופנייה</p>
          <p className="mt-2">
            <ExternalLink href={venue.maps} className="hover:text-ivory">
              {venue.place}, {venue.street}, {venue.city}
            </ExternalLink>
          </p>
          <p className="mt-2">
            <a href={`tel:${venue.phoneTel}`} className="hover:text-ivory">
              {venue.phoneDisplay}
            </a>
          </p>
          <p>
            <ExternalLink href={`https://wa.me/${venue.whatsappE164}`} className="hover:text-ivory">
              וואטסאפ {venue.whatsappDisplay}
            </ExternalLink>
          </p>
          <p>
            <a href={`mailto:${venue.email}`} className="hover:text-ivory">
              {venue.email}
            </a>
          </p>
        </address>
        <nav aria-label="קישורים נוספים" className="flex flex-col gap-2 text-sm text-silver">
          <Link to="/screenings" className="hover:text-ivory">
            סרטים ומופעים
          </Link>
          <Link to="/events" className="hover:text-ivory">
            השכרת האולם
          </Link>
          <Link to="/tech" className="hover:text-ivory">
            מפרט טכני
          </Link>
          <ExternalLink href={links.buyers} className="hover:text-ivory">
            מידע לרוכשים
          </ExternalLink>
          <ExternalLink href={links.access} className="hover:text-ivory">
            הסדרי נגישות
          </ExternalLink>
          <ExternalLink href={links.terms} className="hover:text-ivory">
            תקנון
          </ExternalLink>
          <ExternalLink href={venue.facebook} className="hover:text-ivory">
            פייסבוק
          </ExternalLink>
        </nav>
      </div>
    </footer>
  );
}
