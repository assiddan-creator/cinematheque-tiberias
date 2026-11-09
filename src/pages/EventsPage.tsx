import { Link } from "react-router-dom";
import { packages } from "../content";
import { PageIntro } from "../components/PageIntro";
import { QuoteForm } from "../components/QuoteForm";
import { ExternalLink } from "../components/ExternalLink";
import { usePageTitle } from "../lib/usePageTitle";
import { container, goldButton, lineButton } from "../ui";

export function EventsPage() {
  usePageTitle("השכרת אולם וכנסים — סינמטק טבריה");
  const [business, ...rest] = packages;

  return (
    <div className="pb-16">
      <PageIntro
        title="השכרת האולם לכנסים, לחברות ולבתי ספר"
        lede="אולם הקולנוע והתיאטרון עומד להשכרה: 319 מקומות ישיבה, במה ברוחב 9.5 מטר ובעומק 6.5 מטר, והקרנה וסאונד של אולם קולנוע. הפריקה מהחניה אורכת כ-40 שניות הליכה."
      />

      <div className={`${container} grid gap-4`}>
        <article className="border border-gold/20 bg-stone p-5 sm:p-7 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
          <div>
            <h2 className="text-3xl">{business.title}</h2>
            <p className="mt-3 max-w-2xl text-silver">{business.text}</p>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {business.points.map((point) => (
                <li key={point} className="border-t border-gold/20 pt-2">
                  {point}
                </li>
              ))}
            </ul>
            <Link to={business.to} className={`${goldButton} mt-6`}>
              {business.cta}
            </Link>
          </div>
          <p className="nums mt-6 lg:mt-0 lg:text-end">
            <span className="block font-display text-6xl leading-none">319</span>
            <span className="text-sm text-silver">מושבים מונגשים</span>
          </p>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          {rest.map((item) => (
            <article
              key={item.id}
              id={item.id === "education" ? "education" : undefined}
              className="scroll-mt-24 border border-gold/20 bg-stone p-5 sm:p-7"
            >
              <h2 className="text-3xl">{item.title}</h2>
              <p className="mt-3 text-silver">{item.text}</p>
              <ul className="mt-4 grid gap-2 text-sm">
                {item.points.map((point) => (
                  <li key={point} className="border-t border-gold/20 pt-2">
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to={item.to} className={goldButton}>
                  {item.cta}
                </Link>
                {"externalHref" in item && item.externalHref ? (
                  <ExternalLink href={item.externalHref} className={lineButton}>
                    {item.externalLabel}
                  </ExternalLink>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="quote" className={`${container} scroll-mt-24 pt-10`}>
        <QuoteForm />
      </div>
    </div>
  );
}
