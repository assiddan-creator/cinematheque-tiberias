import { PageIntro } from "../components/PageIntro";
import { TechActions } from "../components/TechActions";
import { TechGallery } from "../components/TechGallery";
import { TrussDiagram } from "../components/TrussDiagram";
import { ExternalLink } from "../components/ExternalLink";
import { links, quickSpecs, specGroups, unpublished, venue } from "../content";
import { usePageMeta } from "../lib/usePageTitle";

export function TechPage() {
  usePageMeta("/tech");

  return (
    <div id="tech-root" className="tech-sheet pb-20">
      <PageIntro
        title="מפרט טכני למפיקים וטכנאים"
        lede="נתוני האולם, הבמה, ההקרנה, הסאונד, התאורה והפריקה של סינמטק טבריה. מה שלא מופיע כאן עדיין לא פורסם, ואפשר לברר אותו בטלפון."
      >
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
          <span className="text-muted">
            {venue.place}, {venue.street}, {venue.city}
          </span>
          <a href={`tel:${venue.phoneTel}`} className="inline-link nums">
            {venue.phoneDisplay}
          </a>
          <a href={`mailto:${venue.email}`} className="inline-link">
            {venue.email}
          </a>
        </p>
        <TechActions />
      </PageIntro>

      <div className="wrap grid gap-20">
        <section aria-labelledby="quick-specs">
          <h2 id="quick-specs" className="sr-only">
            נתונים עיקריים
          </h2>
          <dl className="grid grid-cols-2 border-t-2 border-ink lg:grid-cols-4">
            {quickSpecs.map((item, index) => (
              <div
                key={item.label}
                className={`border-b border-[var(--line)] py-5 pe-4 ${index % 2 === 1 ? "ps-4 border-s" : ""} lg:border-s-0 lg:ps-0 ${index > 0 ? "lg:border-s lg:ps-5" : ""}`}
              >
                <dt className="text-sm font-medium text-muted">{item.label}</dt>
                <dd className="nums display mt-2 text-[clamp(2.6rem,1.8rem+2.4vw,4.2rem)] leading-[0.85]">{item.value}</dd>
                <dd className="mt-2 text-sm text-muted">{item.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="hall-title">
          <h2 id="hall-title" className="display t-l">
            נתוני האולם והבמה
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-12 lg:grid-cols-2">
            {specGroups.map((group) => (
              <article key={group.title}>
                <h3 className="display border-b-2 border-ink pb-2 text-[2.2rem] leading-none">{group.title}</h3>
                <dl>
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1 border-b border-[var(--line)] py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
                    >
                      <dt className="font-semibold">{row.label}</dt>
                      <dd className="text-muted">
                        {row.value}{" "}
                        {row.href && row.hrefLabel ? (
                          <ExternalLink href={row.href} className="inline-link text-ink">
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
          <h2 id="truss-heading" className="display t-l">
            ארבעת הצוגים מעל הבמה
          </h2>
          <p className="mt-4 max-w-[40rem] text-muted">
            מבט על. הצוג הקדמי, הקרוב לקהל, פנוי לתלייה. שאר הצוגים תפוסים בפנסים ובמסך.
          </p>
          <div className="mt-8">
            <TrussDiagram />
          </div>
        </section>

        <section aria-labelledby="missing-title" className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <h2 id="missing-title" className="display t-m lg:col-span-4">
            מה עדיין לא פורסם
          </h2>
          <div className="lg:col-span-8">
            <ul className="border-t-2 border-ink">
              {unpublished.map((item) => (
                <li key={item} className="border-b border-[var(--line)] py-3">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-muted">
              לבירור:{" "}
              <a href={`tel:${venue.phoneTel}`} className="inline-link nums text-ink">
                {venue.phoneDisplay}
              </a>{" "}
              או{" "}
              <a href={`mailto:${venue.email}`} className="inline-link text-ink">
                {venue.email}
              </a>
              . פרטי נגישות לקהל:{" "}
              <ExternalLink href={links.access} className="inline-link text-ink">
                הסדרי נגישות באולם
              </ExternalLink>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="display t-l">
            הבמה והאולם בתמונות
          </h2>
          <p className="mt-4 max-w-[40rem] text-muted">
            הבמה, הפנסים, חדר ההלבשה ועמדת השליטה מצולמים מהאולם. למסלול הפריקה ולשקעי החשמל עדיין אין צילום, ובמקומם מוצגת סקיצה.
          </p>
          <div className="mt-8">
            <TechGallery />
          </div>
        </section>
      </div>
    </div>
  );
}
