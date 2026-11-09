import type { Screening } from "./content";

const GRACE_MS = 3 * 60 * 60 * 1000;

const dateFmt = new Intl.DateTimeFormat("he-IL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jerusalem",
});

const timeFmt = new Intl.DateTimeFormat("he-IL", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jerusalem",
});

export type Instant = { iso: string; t: number };

export function futureDates(dates: string[] | undefined, now = Date.now()): Instant[] {
  if (!dates?.length) return [];
  return dates
    .map((iso) => ({ iso, t: new Date(iso).getTime() }))
    .filter((item) => item.t + GRACE_MS > now)
    .sort((a, b) => a.t - b.t);
}

export function formatWhen(iso: string) {
  const date = new Date(iso);
  return {
    date: dateFmt.format(date),
    time: timeFmt.format(date),
  };
}

export function isListed(item: Screening, now = Date.now()) {
  if (item.variant !== "show") return true;
  return futureDates(item.dates, now).length > 0;
}

export function upcomingShows(items: Screening[], limit = 3, now = Date.now()) {
  return items
    .filter((item) => item.variant === "show")
    .map((item) => ({ item, next: futureDates(item.dates, now)[0] }))
    .filter((entry): entry is { item: Screening; next: Instant } => Boolean(entry.next))
    .sort((a, b) => a.next.t - b.next.t)
    .slice(0, limit)
    .map((entry) => entry.item);
}

export function hebrewInputDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return dateFmt.format(new Date(year, month - 1, day));
}
