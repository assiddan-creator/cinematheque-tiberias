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
    alt: "סדנת יצירה בפסטיבל הילדים: בונים דגם קטן של אולם קולנוע עם שורות כיסאות אדומים מנייר",
  },
  stageScreenUp: {
    name: "stage-screen-up",
    w: 2000,
    h: 1500,
    alt: "הבמה כשמסך הקולנוע מקופל לתקרה: רצפת עץ לכל רוחב הבמה, מרצה במרכזה והקהל באולם",
  },
  festivalOpening: {
    name: "festival-opening",
    w: 2048,
    h: 1536,
    alt: "פתיחת פסטיבל כנרת לסרטי ילדים באולם: שקופית הפסטיבל על המסך והקהל בשורות",
  },
  festivalHall: {
    name: "festival-hall",
    w: 1600,
    h: 1200,
    alt: "אולם מלא בפסטיבל הילדים, הקהל מרים ידיים מול הבמה והמסך",
  },
  festivalGreenscreen: {
    name: "festival-greenscreen-stage",
    w: 1536,
    h: 2048,
    alt: "סדנת מסך ירוק על הבמה: צילום בטאבלט על חצובה, והתמונה מוקרנת על המסך הגדול",
  },
  festivalFilming: {
    name: "festival-filming",
    w: 2048,
    h: 1536,
    alt: "סדנת צילום בפסטיבל הילדים: מנחה מצלם בטאבלט על חצובה ומשתתפים מתרגלים מול המצלמה",
  },
  festivalCraft: {
    name: "festival-craft",
    w: 2048,
    h: 1536,
    alt: "סדנת יצירה בפסטיבל הילדים: שולחנות עבודה עם חומרי יצירה בחדר שקירותיו מכוסים בצילומים היסטוריים",
  },
  educationScreening: {
    name: "education-screening",
    w: 2048,
    h: 1536,
    alt: "מפגש של הסינמטק החינוכי באולם: לוגו התוכנית על המסך, מנחה על הבמה וקהל של תלמידים",
  },
  hallBackToScreen: {
    name: "hall-back-to-screen",
    w: 2000,
    h: 1500,
    alt: "האולם הריק מהשורה האחרונה: שורות הכיסאות יורדות אל הבמה, המסך הלבן וגשר התאורה מעליה",
  },
  redRows: {
    name: "red-rows",
    w: 2000,
    h: 1500,
    alt: "שורות הכיסאות האדומים באולם הריק, מקרוב",
  },
  hallFromStage: {
    name: "hall-from-stage",
    w: 2000,
    h: 1500,
    alt: "מבט מהבמה אל האולם הריק: כל שורות הכיסאות האדומים, ופנסי התומס על הצוג בחלק העליון",
  },
  stageToHall: {
    name: "stage-to-hall",
    w: 2000,
    h: 1500,
    alt: "רצפת העץ של הבמה הריקה ומאחוריה האולם עם שורות הכיסאות וגשר התאורה",
  },
  lobby: {
    name: "lobby",
    w: 2000,
    h: 1129,
    alt: "לובי הסינמטק: שולחנות וכיסאות לקבלת פנים, דלפק ושלט ברוכים הבאים",
  },
} satisfies Record<string, Photo>;

export const videos = {
  festivalHall: {
    src: "/media/festival-hall.mp4",
    poster: "/media/festival-hall-poster.webp",
    w: 848,
    h: 478,
    label: "אולם מלא בפסטיבל הילדים: הקהל עונה למנחה מהבמה",
  },
  lobby: {
    src: "/media/lobby-reception.mp4",
    poster: "/media/lobby-reception-poster.webp",
    w: 848,
    h: 478,
    label: "קבלת פנים בלובי הסינמטק: אורחים מתכנסים סביב שולחנות לפני אירוע",
  },
};
