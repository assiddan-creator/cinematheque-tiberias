/**
 * Real photos and video from the hall (public/media, WebP/MP4, metadata stripped).
 * Each photo has a 2000px and an 800px version.
 */
export type Photo = { name: string; w: number; h: number; alt: string };

export const photos = {
  hallScreening: {
    name: "hall-screening",
    w: 1536,
    h: 2048,
    alt: "הקרנה באולם הסינמטק: הקהל יושב מול המסך הגדול, והשורות האחרונות בכיסאות האדומים",
  },
  hallFilmFull: {
    name: "hall-film-full",
    w: 2000,
    h: 1500,
    alt: "אולם מלא בזמן הקרנת סרט מצויר, מבט מהשורות האחוריות אל המסך ואל גשר התאורה",
  },
  showStage: {
    name: "show-stage",
    w: 2000,
    h: 1500,
    alt: "מופע מוזיקה על הבמה: זמרת וזמר עם מיקרופון, להקה ותאורה כחולה, והקהל בשורות הקדמיות",
  },
  standup: {
    name: "standup",
    w: 1536,
    h: 2047,
    alt: "אמן בחולצה שחורה עומד עם מיקרופון על רצפת העץ של הבמה, בין עמדות תווים",
  },
  eventWide: {
    name: "event-wide",
    w: 2000,
    h: 1478,
    alt: "האולם המלא באירוע: קהל רב בשורות, גשר תאורה מעל הבמה ומצגת על המסך",
  },
  lectureStage: {
    name: "lecture-stage",
    w: 1536,
    h: 2048,
    alt: "הרצאה על במה פתוחה: המסך מקופל למעלה, מרצה עומד מול עמדה והקהל יושב באולם",
  },
  workshopModel: {
    name: "workshop-model",
    w: 2000,
    h: 1500,
    alt: "סדנת יצירה: יד מניחה שורת כיסאות אדומים מנייר בתוך דגם קטן של אולם קולנוע",
  },
  stageScreenUp: {
    name: "stage-screen-up",
    w: 2000,
    h: 1500,
    alt: "הבמה כשמסך הקולנוע מקופל לתקרה: רצפת עץ לכל רוחב הבמה, מרצה במרכזה והקהל באולם",
  },
} satisfies Record<string, Photo>;

export const videos = {
  lobby: {
    src: "/media/lobby-reception.mp4",
    poster: "/media/lobby-reception-poster.webp",
    w: 848,
    h: 478,
    label: "קבלת פנים בלובי הסינמטק: אורחים מתכנסים סביב שולחנות לפני אירוע",
  },
};
