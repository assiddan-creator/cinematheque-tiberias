import { Link } from "react-router-dom";
import { screenings } from "../content";
import { formatWhen, futureDates, upcomingShows } from "../schedule";
import { wineButton, lineButton } from "../ui";
import { ExternalLink } from "./ExternalLink";

export function CinemaHero() {
  const upcoming = upcomingShows(screenings, 6);
  const featured = upcoming[0];
  const rest = upcoming.slice(1, 5);
  const nextDate = featured ? futureDates(featured.dates)[0] : undefined;
  const when = nextDate ? formatWhen(nextDate.iso) : null;

  return (
    <section className="border-b border-wine/20">
      {featured ? (
        <div className="relative overflow-hidden bg-stone">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_minmax(0,28rem)] lg:px-8 lg:py-14">
            <div className="order-2 lg:order-1">
              <p className="text-sm uppercase tracking-wide text-wine">עכשיו בסינמטק</p>
              <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{featured.title}</h1>
              <p className="mt-4 max-w-xl text-silver">{featured.summary}</p>
              {when ? (
                <p className="mt-4 nums text-lg text-ivory">
                  {when.date} <span className="text-silver">·</span> {when.time}
                </p>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3">
                <ExternalLink href={featured.buyHref} className={wineButton}>
                  לרכישת כרטיסים
                </ExternalLink>
                <Link to="/screenings" className={lineButton}>
                  לכל הסרטים
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="mx-auto aspect-[2/3] max-w-sm overflow-hidden rounded-sm border border-wine/20 shadow-2xl shadow-black/50">
                {featured.image ? (
                  <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-end bg-wine/20 p-6">
                    <span className="font-display text-3xl">{featured.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl">הסרטים הקרובים</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {rest.map((item) => {
              const d = futureDates(item.dates)[0];
              const w = d ? formatWhen(d.iso) : null;
              return (
                <article key={item.id} className="group">
                  <div className="aspect-[2/3] overflow-hidden rounded-sm border border-wine/15 bg-stone">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-end bg-wine/10 p-3 text-sm">{item.title}</div>
                    )}
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug">{item.title}</h3>
                  {w ? <p className="mt-1 nums text-xs text-silver">{w.date}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
