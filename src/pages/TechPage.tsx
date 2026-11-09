import { PageIntro } from "../components/PageIntro";
import { TechActions } from "../components/TechActions";
import { TechGallery } from "../components/TechGallery";
import { TrussDiagram } from "../components/TrussDiagram";
import { ExternalLink } from "../components/ExternalLink";
import { links, quickSpecs, specGroups, unpublished, venue } from "../content";
import { usePageTitle } from "../lib/usePageTitle";
import { container } from "../ui";

export function TechPage() {
  usePageTitle("מפרט טכני למפיקים — סינמטק טבריה");

  return (
    <div id="tech-root" className="tech-sheet pb-16">
      <PageIntro
        title="מפרט טכני למפיקים וטכנאים"
        lede="נתוני האולם, הבמה, ההקרנה, הסאונד, התאורה והפריקה של סינמטק טבריה. מה שלא מופיע כאן עדיין לא פורסם, ואפשר לברר אותו בטלפון."
      >
        <p className="mt-4 text-sm text-silver">
          {venue.place}, {venue.street}, {venue.city}
          <span className="mx-2 text-mist">/</span>
          <a href={`tel:${venue.phoneTel}`} className="text-ivory">
            {venue.phoneDisplay}
          </a>
          <span className="mx-2 text-mist">/</span>
          <a href={`mailto:${venue.email}`} className="text-ivory">
            {venue.email}
          </a>
        </p>
        <TechActions />
      </PageIntro>

      <div className={`${container} grid gap-10`}>
        <section aria-labelledby="quick-specs">
          <h2 id="quick-specs" className="sr-only">
            נתונים עיקריים
          </h2>
          <dl className="grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
            {quickSpecs.map((item) => (
              <div key={item.label} className="bg-stone p-4">
                <dt className="text-sm text-silver">{item.label}</dt>
                <dd className="nums mt-1 font-display text-3xl">{item.value}</dd>
                <dd className="text-sm text-mist">{item.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="hall-title" className="grid gap-8">
          <h2 id="hall-title" className="display-section">
            נתוני האולם והבמה
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {specGroups.map((group) => (
              <article key={group.title} className="border border-gold/20 bg-stone p-5">
                <h3 className="text-2xl">{group.title}</h3>
                <dl className="mt-4 grid gap-3">
                  {group.rows.map((row) => (
                    <div key={row.label} className="border-t border-gold/20 pt-3">
                      <dt className="text-sm text-silver">{row.label}</dt>
                      <dd className="mt-1">
                        {row.value}{" "}
                        {row.href && row.hrefLabel ? (
                          <ExternalLink href={row.href} className="text-ivory underline decoration-gold/40 underline-offset-4">
                            {row.hrefLabel}
                          </ExternalLink>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="truss-heading">
          <h2 id="truss-heading" className="display-section">
            ארבעת הצוגים מעל הבמה
          </h2>
          <p className="mt-3 max-w-2xl text-silver">
            מבט על. הצוג הקדמי, הקרוב לקהל, פנוי לתלייה. שאר הצוגים תפוסים בפנסים ובמסך.
          </p>
          <div className="mt-6">
            <TrussDiagram />
          </div>
        </section>

        <section aria-labelledby="missing-title">
          <h2 id="missing-title" className="text-2xl">
            מה עדיין לא פורסם
          </h2>
          <ul className="mt-3 grid max-w-2xl gap-2 text-silver">
            {unpublished.map((item) => (
              <li key={item} className="border-t border-gold/20 pt-2">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-silver">
            לבירור:{" "}
            <a href={`tel:${venue.phoneTel}`} className="text-ivory">
              {venue.phoneDisplay}
            </a>{" "}
            או{" "}
            <a href={`mailto:${venue.email}`} className="text-ivory">
              {venue.email}
            </a>
            . פרטי נגישות לקהל:{" "}
            <ExternalLink href={links.access} className="text-ivory underline decoration-gold/40 underline-offset-4">
              הסדרי נגישות באולם
            </ExternalLink>
            .
          </p>
        </section>

        <section aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="display-section">
            גלריה להחלפה בצילומי האולם
          </h2>
          <p className="mt-3 max-w-2xl text-silver">
            הסקיצות מסמנות איפה תיכנס כל תמונה: הבמה, הפנסים, המסך המקופל, מסלול הפריקה, חדרי ההלבשה ושקעי החשמל.
          </p>
          <div className="mt-6">
            <TechGallery />
          </div>
        </section>
      </div>
    </div>
  );
}
