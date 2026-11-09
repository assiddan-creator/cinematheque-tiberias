import { Link } from "react-router-dom";
import { packages } from "../content";
import { PageIntro } from "../components/PageIntro";
import { QuoteForm } from "../components/QuoteForm";
import { ExternalLink } from "../components/ExternalLink";
import { usePageTitle } from "../lib/usePageTitle";
import { container, wineButton, lineButton } from "../ui";

export function EventsPage() {
  usePageTitle("השכרת אולם וכנסים — סינמטק טבריה");

  return (
    <div className="pb-16">
      <PageIntro
        title="השכרת אולם וכנסים"
        lede="אולם מונגש ל-319 מקומות, עם במה רחבה ומערכות הקרנה וסאונד מתקדמות. מתאים לכנסים, בתי ספר, הקרנות פרטיות ומופעים."
      />
      <div className={`${container} space-y-10 pb-8`}>
        <section id="packages" className="grid gap-6 md:grid-cols-3">
          {packages.map((item) => (
            <article key={item.id} className="flex flex-col border border-wine/20 bg-stone p-5">
              <h2 className="text-2xl">{item.title}</h2>
              <p className="mt-3 text-silver">{item.text}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {item.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <Link to={item.to} className={`${wineButton} mt-6`}>
                {item.cta}
              </Link>
              {item.externalHref ? (
                <ExternalLink href={item.externalHref} className={`${lineButton} mt-3`}>
                  {item.externalLabel}
                </ExternalLink>
              ) : null}
            </article>
          ))}
        </section>

        <section id="quote">
          <h2 className="display-section">בדיקת זמינות והצעת מחיר</h2>
          <p className="mt-3 max-w-2xl text-silver">מלאו את הפרטים ונחזור אליכם בוואטסאפ או במייל.</p>
          <div className="mt-6">
            <QuoteForm />
          </div>
        </section>
      </div>
    </div>
  );
}
