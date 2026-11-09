/**
 * כל הטקסטים, הקישורים ונתוני האולם נמצאים כאן.
 * לעדכון לוח ההקרנות ערכו את המערך screenings.
 * תאריכי נובמבר 2026 הם לפי שעון ישראל (UTC+2).
 */

export const venue = {
  name: "סינמטק טבריה",
  logo: "סינמטק טבריה | מרכז תרבות, קולנוע וכנסים",
  place: "מתחם תרבות יד לבנים",
  street: "רחוב וינגייט 7 / הגדוד העברי 4",
  city: "טבריה",
  phoneDisplay: "04-6305248",
  phoneTel: "+97246305248",
  /** המספר שמסומן כוואטסאפ בעמוד הסינמטק באתר תרבות טבריה. */
  whatsappDisplay: "050-6512147",
  whatsappE164: "972506512147",
  email: "cinema.tbr@gmail.com",
  facebook: "https://www.facebook.com/kolnoatiberias/",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("סינמטק טבריה, רחוב וינגייט 7, טבריה"),
};

export const links = {
  cinematheque: "https://www.tarbutiberias.co.il/סינמטק",
  allShows: "https://www.tarbutiberias.co.il/כל_המופעים",
  kidsPass: "https://www.tarbutiberias.co.il/מנוי_סרטי_ילדים",
  tickchak: "https://live.tickchak.co.il/cinema-tiberias",
  education: "https://www.tarbutiberias.co.il/סינמטק_חינוכי_בקולנוע_טבריה",
  buyers: "https://www.tarbutiberias.co.il/מידע_לרוכשים",
  access: "https://www.tarbutiberias.co.il/הסדרי_נגישות_באולם",
  terms: "https://www.tarbutiberias.co.il/תקנון",
  maniTickets: "https://h1.nu/1A02B",
};

export type ScreeningCategory = "family" | "premiere" | "live";

export type Screening = {
  id: string;
  title: string;
  categories: ScreeningCategory[];
  variant: "feature" | "show" | "board";
  summary: string;
  image?: string;
  dates?: string[];
  price?: string;
  priceNote?: string;
  buyHref: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** YouTube video id of the trailer, from the film's page on Tarbut Tiberias. */
  trailer?: string;
};

export const categoryLabel: Record<ScreeningCategory, string> = {
  family: "ילדים ומשפחה",
  premiere: "טרום-בכורה",
  live: "מופע חי",
};

export const filters = [
  { id: "all", label: "הכל" },
  { id: "family", label: "סרטי ילדים ומשפחה" },
  { id: "premiere", label: "טרום-בכורה ומבוגרים" },
  { id: "live", label: "מופעים וסטנדאפ" },
] as const;

export type FilterId = (typeof filters)[number]["id"];

export const screenings: Screening[] = [
  {
    id: "kids-pass",
    title: "מנוי סרטי ילדים",
    categories: ["family"],
    variant: "feature",
    summary:
      "כרטיסייה לחמישה סרטים שונים בעונת 2026/2027. בתוקף למימוש עד 31.12.2026. בעת המימוש בוחרים סרט באתר תרבות טבריה, והמערכת מזהה את המנוי.",
    price: "99 ₪",
    priceNote: "5 כניסות. כרטיס בודד לילד או לנוער: 27 ₪.",
    buyHref: links.kidsPass,
  },
  {
    id: "ted",
    title: "טד החוקר ומנורת הקסמים (מדובב)",
    categories: ["family"],
    variant: "show",
    summary:
      "טד ושרה נשאבים לעבר בעקבות מנורת קסמים, מממלכת פאיטיטי ועד המזרח התיכון. מדובב.",
    image: "/posters/ted.jpg",
    dates: ["2026-11-09T17:00:00+02:00", "2026-11-17T17:00:00+02:00"],
    buyHref: "https://www.tarbutiberias.co.il/טד_החוקר_ומנורת_הקסמים__מדובב_",
    trailer: "6uHe_-Gr_F8",
  },
  {
    id: "series",
    title: "הסדרתיים — שני פרקים לפני כולם",
    categories: ["family", "premiere"],
    variant: "show",
    summary:
      "רון וגאיה חוזרים לתוך הסדרה של כאן חינוכית ופוגשים עולם שהשתנה. הקרנת שני פרקים לפני כולם.",
    image: "/posters/series.png",
    dates: ["2026-11-11T17:00:00+02:00"],
    buyHref:
      "https://www.tarbutiberias.co.il/הסדרתיים_-_שני_פרקים_לפני_כולם__כאן_חינוכית",
  },
  {
    id: "phoenix",
    title: "פיניק: להציל את המפלצות (חדש, מדובב)",
    categories: ["family"],
    variant: "show",
    summary:
      "פיניק, יצור נסתר ששומר על הבית, יוצא למסע כשסדרת תקלות מאיימת לחשוף את עולמו. חדש, מדובב.",
    image: "/posters/phoenix.jpg",
    dates: ["2026-11-12T17:00:00+02:00", "2026-11-23T17:00:00+02:00"],
    buyHref:
      "https://www.tarbutiberias.co.il/פיניק__להציל_את_המפלצות__חדש._מדובב_",
    trailer: "lgsflwRRRIg",
  },
  {
    id: "wonder",
    title: "וונדר דוג (מדובב)",
    categories: ["family"],
    variant: "show",
    summary:
      "צ'ארלי, כלב משפחתי, נקלע לאירוע לא צפוי ומגלה שיש בו יותר ממה שנדמה. מדובב.",
    image: "/posters/wonder.jpg",
    dates: [
      "2026-11-24T17:00:00+02:00",
      "2026-11-26T17:00:00+02:00",
      "2026-11-30T17:00:00+02:00",
    ],
    buyHref: "https://www.tarbutiberias.co.il/וונדר_דוג__מדובב_",
    trailer: "sCeQE-QEW8A",
  },
  {
    id: "mani",
    title: "מני עוזרי במופע סטנדאפ",
    categories: ["live"],
    variant: "show",
    summary: "מופע סטנדאפ באולם הסינמטק. המופעים מצולמים.",
    image: "/posters/mani.jpeg",
    dates: ["2026-11-21T21:00:00+02:00"],
    buyHref: links.maniTickets,
    secondaryHref: links.tickchak,
    secondaryLabel: "לוח ההופעות בטיקצ'אק",
  },
  {
    id: "cinematheque-board",
    title: "הקרנות הסינמטק בתרבות טבריה",
    categories: ["family", "premiere"],
    variant: "board",
    summary:
      "לוח ההקרנות המלא של האולם, כולל סרטים ומועדים שמתעדכנים ישירות בעמוד הרכישה.",
    buyHref: links.cinematheque,
  },
  {
    id: "all-shows",
    title: "כל המופעים בתרבות טבריה",
    categories: ["premiere", "live"],
    variant: "board",
    summary: "לוח המופעים של תרבות טבריה, מעבר להקרנות שמוצגות כאן.",
    buyHref: links.allShows,
  },
  {
    id: "tickchak-board",
    title: "מופעי סטנדאפ והופעות חיות",
    categories: ["live"],
    variant: "board",
    summary:
      "לוח ההופעות של סינמטק טבריה בטיקצ'אק. כרטיס למופע מסוים נרכש בקישור שמופיע בעמוד שלו.",
    buyHref: links.tickchak,
  },
];

export const eventTypes = [
  { id: "conference", label: "כנס עסקי, משרד ממשלה או ארגון" },
  { id: "school", label: "בית ספר או מוסד חינוך" },
  { id: "private", label: "הקרנה פרטית" },
  { id: "lecture", label: "הרצאה" },
  { id: "show", label: "מופע" },
  { id: "other", label: "אירוע אחר" },
] as const;

export const addons = [
  { id: "stills", label: "צילום סטילס מקצועי לאירוע/כנס" },
  { id: "booth", label: "עמדת צילום חווייתית (Photobooth / מגנטים) בלובי" },
  { id: "video", label: "צילום והקלטת הרצאות/כנס בווידאו" },
  { id: "stream", label: "שידור חי (Live Stream) מרובה מצלמות לאורחים מרחוק" },
] as const;

export const packages = [
  {
    id: "business",
    title: "כנסים עסקיים, משרדי ממשלה וארגונים",
    text: "אולם ממוזג ונגיש ליום עיון, כנס או כינוס ארגוני, עם לובי להתכנסות ולקייטרינג וציוד נאום על הבמה.",
    points: [
      "319 מקומות ישיבה",
      "לובי להתכנסות ולקייטרינג",
      "פודיום לנאומים",
      "מצגות אלחוטיות מהבמה או מהאולם, תמונה וסאונד",
    ],
    to: "/events?type=conference#quote",
    cta: "בדיקת זמינות והצעת מחיר",
  },
  {
    id: "education",
    title: "הסינמטק החינוכי לבתי ספר ומוסדות חינוך",
    text: "הקרנות בוקר לבתי ספר, שיחה עם במאי או עם שחקן ראשי, וטקסים בית-ספריים. לפי תוכנית הסינמטק החינוכי בקולנוע טבריה.",
    points: [
      "הקרנות בוקר לשכבות גיל",
      "שיחות עם יוצרים",
      "טקסים בית-ספריים",
    ],
    to: "/events?type=school#quote",
    cta: "בדיקת זמינות לבית הספר",
    externalHref: links.education,
    externalLabel: "לתוכנית הסינמטק החינוכי",
  },
  {
    id: "private",
    title: "הקרנות פרטיות ואירועי תרבות",
    text: "השכרת האולם להקרנה סגורה, להרצאה או למופע. מסך הקולנוע עולה לתקרה, ואפשר לעבוד על מלוא הבמה.",
    points: [
      "הקרנות סגורות",
      "הרצאות ומופעים",
      "במה ברוחב 9.5 מ׳ ובעומק 6.5 מ׳",
    ],
    to: "/events?type=private#quote",
    cta: "בדיקת זמינות להקרנה או למופע",
  },
] as const;

export const quickSpecs = [
  { label: "מקומות ישיבה", value: "319", note: "15 שורות × 21 כיסאות" },
  { label: "מידות האולם", value: "20 × 16 מ׳", note: "אורך × רוחב" },
  { label: "מידות הבמה", value: "9.5 × 6.5 מ׳", note: "גובה פנוי 4.9 מ׳" },
  { label: "חשמל להפקה", value: "63A + 32A", note: "תלת-פאזי" },
];

export type SpecRow = {
  label: string;
  value: string;
  href?: string;
  hrefLabel?: string;
};

export const specGroups: { title: string; rows: SpecRow[] }[] = [
  {
    title: "אולם וישיבה",
    rows: [
      { label: "תכולה", value: "319 מקומות ישיבה, 15 שורות × 21 כיסאות בשורה." },
      {
        label: "נגישות",
        value: "האולם מונגש במלואו.",
        href: links.buyers,
        hrefLabel: "מידע לרוכשים בתרבות טבריה",
      },
      { label: "מידות", value: "אורך 20 מ׳, רוחב 16 מ׳." },
    ],
  },
  {
    title: "במה",
    rows: [
      { label: "רוחב", value: "9.5 מ׳." },
      { label: "עומק", value: "6.5 מ׳." },
      {
        label: "גובה פנוי",
        value: "4.9 מ׳ מרצפת הבמה עד למסך הקולנוע כשהוא מקופל למעלה.",
      },
      {
        label: "שטח עבודה",
        value:
          "מסך הקולנוע מתרומם ומתקפל לתקרה, ואפשר להשתמש במלוא הרוחב והעומק להצגות, למופעים ולכנסים.",
      },
    ],
  },
  {
    title: "הקרנה ומצגות",
    rows: [
      {
        label: "שרת קולנוע",
        value: "GDC SR-1000 Standalone IMB. תמיכה בקובצי DCP ב־2K, בתקני SMPTE ו-Interop.",
      },
      {
        label: "מקרן",
        value:
          "NEC NC1201L-A. מקרן קולנוע דיגיטלי DLP Cinema עם מקור אור לייזר, ברזולוציה 2K (2048×1080), תומך ב-3D. לפי היצרן מתאים למסכים ברוחב של עד 12 מ׳.",
      },
      {
        label: "מצגת מרצה",
        value:
          "Wireless HDMI Transmitter and Receiver Extender Kit. חיבור אלחוטי של מחשב נייד, תמונה וסאונד, מהבמה או מכל נקודה באולם.",
      },
    ],
  },
  {
    title: "סאונד ומיקרופונים",
    rows: [
      { label: "לסרטים", value: "סאונד היקפי 5.1 של קולנוע." },
      {
        label: "למופעים ולהרצאות",
        value: "שני רמקולים מוגברים FBT J-Maxx 112A בצידי הבמה, 900W כל אחד.",
      },
      { label: "מיקסר", value: "QL-Milano AB-4, 4 ערוצים, עם אפקטים, Bluetooth ו-USB להקלטה." },
      { label: "אלחוטי", value: "2 מיקרופונים אלחוטיים דיגיטליים של TRX Audio." },
      { label: "חוטי", value: "2 מיקרופונים דינמיים Shure SM58." },
    ],
  },
  {
    title: "תאורה וחשמל",
    rows: [
      {
        label: "פנסים",
        value:
          "30 פנסי תומס (PAR) תלויים: 12 בצוג 2 ו-18 בצוג 4. שטיפת במה, הדלקה ומיקוד פרטני לכל פנס.",
      },
      { label: "צבע", value: "בצוג 4 יש ג'לים בכחול ובאדום לתאורת אווירה." },
      { label: "63 אמפר", value: "שקע תלת-פאזי 63A להפקות חוץ." },
      { label: "32 אמפר", value: "שקע תלת-פאזי 32A להפקות חוץ." },
    ],
  },
  {
    title: "פריקה וחדרי אמנים",
    rows: [
      { label: "מסלול פריקה", value: "מהחניה עד הבמה, כ-40 שניות הליכה." },
      { label: "הלבשה", value: "2 חדרי הלבשה נפרדים לאמנים או למרצים, בלי מעבר פנימי ביניהם." },
      { label: "לובי ובמה", value: "שולחנות לרישום ולקייטרינג בלובי, ופודיום על הבמה." },
    ],
  },
];

export const unpublished = [
  "גובה פני הבמה מרצפת השורה הראשונה באולם.",
  "מידות המסך הפתוח.",
  "דגם המיקרופונים האלחוטיים.",
];

export const trusses = [
  {
    id: "1",
    name: "צוג 1 (קדמי)",
    detail: "ריק. פנוי לתלייה.",
    tone: "empty",
  },
  {
    id: "2",
    name: "צוג 2",
    detail: "תפוס. 12 פנסי תומס לשטיפת במה.",
    tone: "front",
  },
  {
    id: "3",
    name: "צוג 3",
    detail: "תפוס. מסך הקולנוע המתרומם.",
    tone: "screen",
  },
  {
    id: "4",
    name: "צוג 4 (אחורי)",
    detail: "תפוס. 18 פנסי תומס, עם ג'לים בכחול ובאדום.",
    tone: "back",
  },
] as const;

export const gallery: { src: string; title: string; caption: string; alt?: string }[] = [
  {
    src: "/media/hall-screening-800.webp",
    title: "חזית הבמה והמסך",
    caption: "מבט מהאולם אל הבמה ומסך הקולנוע בזמן הקרנה.",
    alt: "מבט מהשורות האחוריות אל חזית הבמה ומסך הקולנוע הגדול בזמן הקרנה, עם גשר התאורה מעל",
  },
  {
    src: "/media/hall-from-stage-800.webp",
    title: "פנסי התומס על הצוגים",
    caption: "פנסי התומס על הצוג, במבט מהבמה אל האולם.",
    alt: "מבט מהבמה אל האולם הריק, ופנסי התומס התלויים על הצוג בחלק העליון של התמונה",
  },
  {
    src: "/media/stage-screen-up-800.webp",
    title: "המסך מקופל לתקרה",
    caption: "הבמה כשמסך הקולנוע למעלה: כל רוחב רצפת העץ פנוי.",
    alt: "הבמה כשמסך הקולנוע מקופל לתקרה: רצפת עץ לכל רוחב הבמה, מרצה במרכזה והקהל באולם",
  },
  {
    src: "/media/control-booth-800.webp",
    title: "עמדת השליטה",
    caption: "מבט מעמדת השליטה אל הבמה.",
    alt: "עמדת השליטה: שולחן עבודה מעץ, ומעבר לו האולם והבמה עם גשר התאורה",
  },
  {
    src: "/media/hall-film-full-800.webp",
    title: "הקרנה באולם מלא",
    caption: "האולם בזמן הקרנה, מבט מהשורות האחוריות.",
    alt: "אולם מלא בזמן הקרנת סרט מצויר, מבט מהשורות האחוריות אל המסך ואל גשר התאורה",
  },
  {
    src: "/media/show-stage-800.webp",
    title: "ערב מופע",
    caption: "הבמה בערב מופע מוזיקה, עם הגברה ותאורה.",
    alt: "מופע מוזיקה על הבמה: זמרת וזמר עם מיקרופון, להקה ותאורה כחולה, והקהל בשורות הקדמיות",
  },
  {
    src: "/media/standup-800.webp",
    title: "על במת העץ",
    caption: "אמן עם מיקרופון על רצפת העץ של הבמה.",
    alt: "אמן בחולצה שחורה עומד עם מיקרופון על רצפת העץ של הבמה, בין עמדות תווים",
  },
  {
    src: "/gallery/load-in.svg",
    title: "מסלול הפריקה",
    caption: "סקיצה להחלפה בצילום ההליכה מהחניה לבמה.",
  },
  {
    src: "/media/dressing-room-800.webp",
    title: "שני חדרי הלבשה",
    caption: "חדר הלבשה לאמנים ולמרצים.",
    alt: "חדר הלבשה: ספה ומושב עור חומים ומראה גבוהה נשענת על הקיר",
  },
  {
    src: "/gallery/power.svg",
    title: "חיבורי 63A ו-32A",
    caption: "סקיצה להחלפה בצילום שקעי החשמל.",
  },
];
