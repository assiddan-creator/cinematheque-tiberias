import { venue } from "./content";
import { hebrewInputDate } from "./schedule";

export type QuoteInput = {
  name: string;
  org: string;
  phone: string;
  eventType: string;
  date: string;
  guests: string;
  addons: string[];
};

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function quoteText(input: QuoteInput) {
  const addons = input.addons.length
    ? input.addons.map((item) => `• ${item}`).join("\n")
    : "ללא שירותי הפקה נוספים";

  return [
    "שלום, אבקש לבדוק זמינות ולקבל הצעת מחיר לאירוע בסינמטק טבריה.",
    "",
    `שם מלא: ${clean(input.name)}`,
    `ארגון / בית ספר / חברה: ${clean(input.org)}`,
    `טלפון: ${clean(input.phone)}`,
    `סוג האירוע: ${clean(input.eventType)}`,
    `תאריך משוער: ${hebrewInputDate(input.date)}`,
    `כמות משתתפים: ${clean(input.guests)} (האולם עד 319)`,
    "",
    "שדרוגים ושירותי הפקה:",
    addons,
  ].join("\n");
}

export function quoteSubject(org: string) {
  return `הצעת מחיר לאירוע: ${clean(org)}`;
}

export function techShareText(url: string) {
  return [
    "מפרט טכני, סינמטק טבריה",
    `${venue.place}, ${venue.street}, ${venue.city}`,
    `טלפון ${venue.phoneDisplay} | ${venue.email}`,
    "",
    "אולם: 319 מושבים (15 שורות × 21), מונגש. אורך 20 מ׳, רוחב 16 מ׳.",
    "במה: רוחב 9.5 מ׳, עומק 6.5 מ׳, גובה פנוי 4.9 מ׳. המסך עולה לתקרה.",
    "צוג 1 קדמי: פנוי לתלייה.",
    "צוג 2: 12 פנסי תומס.",
    "צוג 3: מסך קולנוע מתרומם.",
    "צוג 4 אחורי: 18 פנסי תומס, ג'ל כחול ואדום.",
    "הקרנה: מקרן לייזר NEC NC1201L-A (2K, 3D), שרת GDC SR-1000, קובצי DCP. מצגות: Wireless HDMI.",
    "סאונד: 5.1 לסרטים. למופעים: 2 רמקולים FBT J-Maxx 112A. מיקסר QL-Milano AB-4.",
    "מיקרופונים: 2 אלחוטיים דיגיטליים TRX Audio + 2 Shure SM58.",
    "חשמל: תלת-פאזי 63A ו-32A. תאורה: 30 פנסי תומס.",
    "פריקה: כ-40 שניות הליכה מהחניה לבמה. 2 חדרי הלבשה נפרדים.",
    "",
    url,
  ].join("\n");
}

export function techUrl() {
  return `${window.location.origin}/tech`;
}
