import { useMemo, useState } from "react";
import { categoryLabel, filters, screenings, type FilterId, type Screening, type ScreeningCategory } from "../content";
import { formatWhen, futureDates, isListed, upcomingShows } from "../schedule";
import { wineButton, lineButton } from "../ui";
import { ExternalLink } from "./ExternalLink";

function Poster({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (<div className="flex h-full items-end bg-[radial-gradient(ellipse_at_center,rgba(139,58,74,0.22),#09090b_72%)] p-4"><span className="font-display text-2xl leading-snug">{title}</span></div>);
  }
  return (<img src={src} alt="" className="h-full w-full object-contain" onError={() => setFailed(true)} />);
}

function ShowTimes({ item }: { item: Screening }) {
  const dates = futureDates(item.dates);
  if (!dates.length) return null;
  const first = formatWhen(dates[0].iso);
  const rest = dates.slice(1);
  return (<div className="nums text-sm"><p className="text-ivory">{first.date}</p><p className="text-silver">בשעה {first.time}</p>{rest.length > 0 ? (<><p className="mt-2 text-silver">מועדים נוספים</p><ul>{rest.map((date) => { const formatted = formatWhen(date.iso); return (<li key={date.iso}>{formatted.date}, בשעה {formatted.time}</li>); })}</ul></>) : null}</div>);
}

function BuyLinks({ item, prominent = false }: { item: Screening; prominent?: boolean }) {
  return (<div className="mt-auto flex flex-wrap gap-2"><ExternalLink href={item.buyHref} className={prominent ? wineButton : lineButton}>לרכישת כרטיסים</ExternalLink>{item.secondaryHref && item.secondaryLabel ? (<ExternalLink href={item.secondaryHref} className={lineButton}>{item.secondaryLabel}</ExternalLink>) : null}</div>);
}

function labelFor(item: Screening, filter: FilterId) {
  if (filter !== "all" && filter in categoryLabel) return categoryLabel[filter as ScreeningCategory];
  return categoryLabel[item.categories[0]];
}

function FeatureCard({ item }: { item: Screening }) {
  return (<article className="grid border border-wine/20 bg-stone lg:grid-cols-[minmax(0,1fr)_16rem]"><div className="flex flex-col gap-4 p-5 sm:p-7"><p className="text-sm text-silver">עונה 2026/2027, {labelFor(item, "family")}</p><h2 className="text-4xl">{item.title}</h2><p className="max-w-xl text-silver">{item.summary}</p><p className="nums font-display text-5xl leading-none">{item.price}</p><p className="text-sm text-silver">{item.priceNote}</p><BuyLinks item={item} prominent /></div><div className="hidden border-s border-wine/20 bg-void lg:block" aria-hidden="true"><div className="flex h-full flex-col justify-between p-6"><p className="font-display text-3xl">5</p><p className="text-sm text-silver">כניסות לסרטים שונים, עד 31.12.2026</p></div></div></article>);
}

function ProgramCard({ item, filter }: { item: Screening; filter: FilterId }) {
  if (item.variant === "board") {
    return (<article className="flex flex-col gap-3 border border-wine/20 bg-stone p-4"><p className="text-sm text-silver">{labelFor(item, filter)}</p><h2 className="text-2xl leading-snug">{item.title}</h2><p className="text-sm text-silver">{item.summary}</p><p className="text-sm text-silver">השעות בעמוד הרכישה</p><BuyLinks item={item} prominent /></article>);
  }
  return (<article className="poster-card flex flex-col border border-wine/20 bg-stone"><div className="aspect-[3/4] bg-void"><Poster src={item.image} title={item.title} /></div><div className="flex flex-1 flex-col gap-3 p-4"><p className="text-sm text-silver">{labelFor(item, filter)}</p><h2 className="text-2xl leading-snug">{item.title}</h2><p className="text-sm text-silver">{item.summary}</p><ShowTimes item={item} /><BuyLinks item={item} prominent /></div></article>);
}

export function ScreeningsBrowser() {
  const [filter, setFilter] = useState<FilterId>("all");
  const visible = useMemo(() => screenings.filter((item) => { const categoryOk = filter === "all" || item.categories.includes(filter); return categoryOk && isListed(item); }), [filter]);
  const featured = visible.filter((item) => item.variant === "feature");
  const rest = visible.filter((item) => item.variant !== "feature");
  return (<div><div role="group" aria-label="סינון לוח" className="flex flex-wrap gap-2">{filters.map((item) => { const pressed = filter === item.id; return (<button key={item.id} type="button" aria-pressed={pressed} onClick={() => setFilter(item.id)} className={`min-h-11 px-3 text-sm font-semibold ${pressed ? "bg-wine text-void" : "border border-wine/25 text-silver hover:border-wine hover:text-ivory"}`}>{item.label}</button>); })}</div><div className="mt-6 space-y-4">{featured.map((item) => (<FeatureCard key={item.id} item={item} />))}</div>{rest.length > 0 ? (<div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{rest.map((item) => (<ProgramCard key={item.id} item={item} filter={filter} />))}</div>) : null}{featured.length === 0 && rest.length === 0 ? (<p role="status" className="mt-8 text-silver">אין כרגע פריטים בקטגוריה הזו. לוח ההקרנות המלא נמצא בעמוד הסינמטק בתרבות טבריה.</p>) : null}<p className="mt-6 max-w-3xl text-sm text-mist">המועדים נלקחו מלוח תרבות טבריה. אם שעה השתנתה או אזלו הכרטיסים, עמוד הרכישה הוא הקובע. תנאי רכישה וביטול לפי תקנון תרבות טבריה.</p></div>);
}

export function UpcomingStrip() {
  const items = upcomingShows(screenings, 3);
  if (!items.length) return null;
  return (<section className="border-b border-wine/20" aria-labelledby="upcoming-title"><div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8"><h2 id="upcoming-title" className="display-section">ההקרנות הקרובות</h2><ul className="mt-6 grid gap-4 lg:grid-cols-3">{items.map((item) => { const next = futureDates(item.dates)[0]; const when = formatWhen(next.iso); return (<li key={item.id}><article className="flex h-full gap-4 border border-wine/20 bg-stone p-3"><div className="h-36 w-28 shrink-0 overflow-hidden rounded-sm"><Poster src={item.image} title={item.title} /></div><div className="flex min-w-0 flex-1 flex-col gap-2"><h3 className="text-xl leading-snug">{item.title}</h3><p className="nums text-sm text-silver">{when.date}<span className="block">בשעה {when.time}</span></p><ExternalLink href={item.buyHref} className={`${lineButton} mt-auto self-start px-3`}>לרכישת כרטיסים</ExternalLink></div></article></li>); })}</ul></div></section>);
}
