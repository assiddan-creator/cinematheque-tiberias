import type { Screening } from "../content";
import { futureDates, type Instant } from "../schedule";

const TZ = "Asia/Jerusalem";
const dayFmt = new Intl.DateTimeFormat("he-IL", { day: "numeric", timeZone: TZ });
const monthFmt = new Intl.DateTimeFormat("he-IL", { month: "long", timeZone: TZ });
const weekdayFmt = new Intl.DateTimeFormat("he-IL", { weekday: "long", timeZone: TZ });
const timeFmt = new Intl.DateTimeFormat("he-IL", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ });
const keyFmt = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TZ });

/** Splits an ISO date into display parts in Israel time, plus "today"/"tomorrow" relative to now. */
export function whenParts(iso: string, now = Date.now()) {
  const date = new Date(iso);
  const key = keyFmt.format(date);
  const today = keyFmt.format(new Date(now));
  const tomorrow = keyFmt.format(new Date(now + 24 * 60 * 60 * 1000));
  const relative = key === today ? "היום" : key === tomorrow ? "מחר" : null;
  return {
    day: dayFmt.format(date),
    month: monthFmt.format(date),
    weekday: weekdayFmt.format(date),
    time: timeFmt.format(date),
    relative,
  };
}

export type Slot = { item: Screening; when: Instant };

/** Every upcoming date of every listed show, as one chronological timetable. */
export function timetable(items: Screening[], now = Date.now()): Slot[] {
  return items
    .filter((item) => item.variant === "show")
    .flatMap((item) => futureDates(item.dates, now).map((when) => ({ item, when })))
    .sort((a, b) => a.when.t - b.when.t);
}
