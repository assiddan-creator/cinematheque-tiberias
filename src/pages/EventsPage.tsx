import { Link } from "react-router-dom";
import { packages, quickSpecs } from "../content";
import { PageIntro } from "../components/PageIntro";
import { QuoteForm } from "../components/QuoteForm";
import { ExternalLink } from "../components/ExternalLink";
import { usePageMeta } from "../lib/usePageTitle";
import { photos, videos } from "../media";
import { Photo } from "../components/Photo";
import { LoopVideo } from "../components/LoopVideo";
import { SeatIcon } from "../components/SeatIcon";
import { btnLine, btnRed } from "../ui";

const packageMedia: Record<string, { photo: (typeof photos)[keyof typeof photos]; caption: string }> = {
  business: { photo: photos.eventWide, caption: "אירוע באולם מלא, עם מצגת על המסך" },
  education: { photo: photos.educationScreening, caption: "מפגש של הסינמטק החינוכי באולם" },
  private: { photo: photos.stageToHall, caption: "הבמה פנויה לכל רוחבה, מבט מהבמה אל האולם" },
};

export function EventsPage() {
  usePageMeta("/events");
  const seats = quickSpecs[0];

  return (
    <div className="pb-20">
      <PageIntro
        title="השכרת האולם לכנסים, לחברות ולבתי ספר"
        lede="אולם הקולנוע והתיאטרון עומד להשכרה: 319 מקומות ישיבה, במה ברוחב 9.5 מטר ובעומק 6.5 מטר, והקרנה וסאונד של אולם קולנוע. הפריקה מהחניה אורכת כ-40 שניות הליכה."
        aside={
          <p className="nums leading-none">
            <span className="display block text-[clamp(7rem,4rem+9vw,12rem)] leading-[0.75] text-house">{seats.value}</span>
            <span className="mt-3 block font-medium">{seats.label}</span>
            <span className="mt-1 block text-sm text-muted">{seats.note}</span>
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quote" className={btnRed}>
            בדיקת זמינות והצעת מחיר
          </a>
          <Link to="/tech" className={btnLine}>
            מפרט טכני למפיקים
          </Link>
        </div>
      </PageIntro>

      <section className="wrap" aria-label="סוגי השכרה">
        <ol className="border-t-2 border-ink">
          {packages.map((item) => (
            <li
              key={item.id}
              id={item.id === "education" ? "education" : undefined}
              className="row-hover scroll-mt-24 border-b border-[var(--line)]"
            >
              <article className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <h2 className="display t-m flex items-baseline gap-3">
                    <SeatIcon />
                    <span>{item.title}</span>
                  </h2>
                  {packageMedia[item.id] ? (
                    <figure className="mt-6">
                      <div className="aspect-[4/3] overflow-hidden bg-ink">
                        <Photo photo={packageMedia[item.id].photo} sizes="(min-width: 1024px) 38vw, 100vw" />
                      </div>
                      <figcaption className="mt-2 text-sm text-muted">{packageMedia[item.id].caption}</figcaption>
                    </figure>
                  ) : null}
                  {item.id === "business" ? (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <figure>
                        <div className="aspect-[4/3] overflow-hidden bg-ink">
                          <Photo photo={photos.lobby} sizes="(min-width: 1024px) 19vw, 50vw" />
                        </div>
                        <figcaption className="mt-2 text-sm text-muted">הלובי לקבלת פנים ולקייטרינג</figcaption>
                      </figure>
                      <figure>
                        <div className="aspect-[4/3] overflow-hidden bg-ink">
                          <LoopVideo {...videos.lobby} />
                        </div>
                        <figcaption className="mt-2 text-sm text-muted">הלובי לפני אירוע</figcaption>
                      </figure>
                    </div>
                  ) : null}
                </div>
                <div className="lg:col-span-7">
                  <p className="max-w-[40rem] text-[1.0625rem]">{item.text}</p>
                  <ul className="mt-5 grid gap-x-6 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li key={point} className="border-t border-[var(--line)] py-2.5 text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to={item.to} className={btnRed}>
                      {item.cta}
                    </Link>
                    {"externalHref" in item && item.externalHref ? (
                      <ExternalLink href={item.externalHref} className={btnLine}>
                        {item.externalLabel}
                      </ExternalLink>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <div id="quote" className="wrap scroll-mt-24 pt-20">
        <QuoteForm />
      </div>
    </div>
  );
}
