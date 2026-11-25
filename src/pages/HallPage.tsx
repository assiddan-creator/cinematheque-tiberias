import { Link } from "react-router-dom";
import { links, quickSpecs, venue } from "../content";
import { usePageMeta } from "../lib/usePageTitle";
import { photos, videos, type Photo as PhotoData } from "../media";
import { Photo } from "../components/Photo";
import { LoopVideo } from "../components/LoopVideo";
import { SeatIcon } from "../components/SeatIcon";
import { ExternalLink } from "../components/ExternalLink";
import { HallForm } from "../components/HallForm";
import { Logo } from "../components/Logo";
import { btnLine, btnRed } from "../ui";

/**
 * /hall: the page we send to producers, organizations and schools by email.
 * Each audience has an anchor (#producers, #organizations, #schools) so a mail can open on it.
 * Facts only from content.ts (owner's data); no prices are published.
 */

const wa = (text: string) => `https://wa.me/${venue.hallWhatsappE164}?text=${encodeURIComponent(text)}`;

type Audience = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  points: string[];
  photo: PhotoData;
  photoCaption: string;
  photoFocus?: string;
  photo2?: PhotoData;
  /** Portrait second photo (shown 3:4 instead of 4:3). */
  photo2Tall?: boolean;
  /** Loop video instead of the second photo. */
  video2?: (typeof videos)[keyof typeof videos];
  photo2Caption?: string;
  ask: string;
};

const audiences: Audience[] = [
  {
    id: "producers",
    kicker: "למפיקים, לסוכנויות ולאמנים",
    title: "סטנדאפ, הופעות והצגות",
    text: "במה אמיתית מול 319 מושבים, בלב טבריה. מסך הקולנוע מתקפל לתקרה, וכל רצפת העץ פנויה למופע. כל מה שצריך לערב כבר תלוי ומחובר, ומהחניה לבמה הולכים כ-40 שניות.",
    points: [
      "במה 9.5 × 6.5 מ׳, גובה פנוי 4.9 מ׳",
      "30 פנסי תומס על שני צוגים, ג'לים בכחול ובאדום",
      "2 רמקולים FBT J-Maxx 112A, מיקסר ו-4 מיקרופונים",
      "חשמל תלת-פאזי 63A ו-32A להפקות חוץ",
      "2 חדרי הלבשה נפרדים",
      "צוג קדמי פנוי לתלייה",
    ],
    photo: photos.standupFullHall,
    photoCaption: "ערב סטנדאפ באולם מלא",
    photoFocus: "object-[50%_35%]",
    photo2: photos.lectureScreen,
    photo2Tall: true,
    photo2Caption: "הרצאה מול המסך הגדול: אפשר להקרין ולהרצות באותו ערב",
    ask: "שלום, אני מפיק/ה ומעוניין/ת לבדוק תאריך פנוי למופע בסינמטק טבריה.",
  },
  {
    id: "organizations",
    kicker: "לעיריות, למשרדי ממשלה, לארגונים ולחברות",
    title: "כנסים, ימי עיון ואירועי ערב",
    text: "אולם ממוזג ונגיש לכנס, ליום עיון או לאירוע הוקרה. האורחים מתכנסים בלובי סביב הקייטרינג ועמדת הרישום, ונכנסים לאולם עם מסך קולנוע גדול, סאונד קולנועי ופודיום על הבמה.",
    points: [
      "319 מקומות ישיבה, אולם מונגש",
      "לובי לרישום ולקייטרינג",
      "מצגת אלחוטית מהבמה או מכל מקום באולם",
      "מקרן קולנוע לייזר ומסך גדול",
      "פודיום ומיקרופונים אלחוטיים",
      "אפשר להוסיף צילום, הקלטה ושידור חי",
    ],
    photo: photos.eventWide,
    photoCaption: "כנס באולם מלא, עם מצגת על המסך",
    video2: videos.lobby,
    photo2Caption: "הלובי מלא אורחים לפני אירוע",
    ask: "שלום, אני מעוניין/ת לבדוק זמינות והצעת מחיר לכנס או לאירוע בסינמטק טבריה.",
  },
  {
    id: "schools",
    kicker: "לבתי ספר, לגנים ולמוסדות חינוך",
    title: "הקרנות בוקר, טקסים ומסיבות סיום",
    text: "סרט על מסך קולנוע אמיתי לשכבה שלמה, שיחה עם במאי או עם שחקן, טקס בית-ספרי או מסיבת סיום על הבמה. האולם מכיל שכבה שלמה, והכול קורה במקום אחד.",
    points: [
      "הקרנות בוקר לשכבות גיל",
      "מפגשים עם יוצרים",
      "טקסים ומסיבות סיום על הבמה",
      "תוכנית הסינמטק החינוכי",
      "319 מושבים, אולם מונגש",
      "הקרנת סרטים בתקן קולנוע (DCP)",
    ],
    photo: photos.educationScreening,
    photoCaption: "מפגש של הסינמטק החינוכי באולם",
    photo2: photos.festivalHall,
    photo2Caption: "אולם מלא ילדים בפסטיבל",
    ask: "שלום, אני מבית ספר / ממוסד חינוך ומעוניין/ת לבדוק תאריך להקרנה או לאירוע בסינמטק טבריה.",
  },
];

const included = [
  { label: "הקרנה", value: "מקרן קולנוע לייזר NEC (2K, 3D), שרת DCP, ו-HDMI אלחוטי למצגות" },
  { label: "סאונד", value: "5.1 קולנועי לסרטים, ומערכת FBT עם מיקסר למופעים ולהרצאות" },
  { label: "מיקרופונים", value: "2 אלחוטיים דיגיטליים ו-2 Shure SM58" },
  { label: "תאורה", value: "30 פנסי תומס תלויים, שטיפת במה ומיקוד פרטני" },
  { label: "חשמל", value: "תלת-פאזי 63A ו-32A" },
  { label: "פריקה", value: "כ-40 שניות הליכה מהחניה עד הבמה" },
  { label: "אמנים", value: "2 חדרי הלבשה נפרדים" },
  { label: "קהל", value: "לובי לקבלת פנים, אולם ממוזג ומונגש" },
];

const gallery: { photo: PhotoData; caption: string }[] = [
  { photo: photos.hallBackToScreen, caption: "האולם והמסך, מהשורה האחרונה" },
  { photo: photos.stageScreenUp, caption: "המסך מקופל, הבמה פנויה" },
  { photo: photos.hallFilmFull, caption: "הקרנה באולם מלא" },
  { photo: photos.lectureStage, caption: "הרצאה על הבמה" },
  { photo: photos.hallFromStage, caption: "מבט מהבמה אל האולם" },
  { photo: photos.redRows, caption: "319 כיסאות אדומים" },
];

export function HallPage() {
  usePageMeta("/hall");

  return (
    <div className="pb-20">
      <header className="wrap grid gap-8 pb-10 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-14 lg:pt-20">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Logo title={venue.name} className="block h-16 w-auto sm:h-20" />
            <div className="flex items-center gap-5 border-s border-[var(--line)] ps-5" aria-label="בשיתוף">
              <img src="/partners/haogen.svg" alt="העוגן, רשת המתנ״סים טבריה" width={210} height={272} className="h-12 w-auto sm:h-14" />
              <img src="/partners/tiberias-municipality.png" alt="עיריית טבריה" width={157} height={69} className="h-8 w-auto sm:h-9" />
            </div>
          </div>
          <p className="mt-8 font-medium text-house">{venue.name} · {venue.place}</p>
          <h1 className="display t-xl mt-3 max-w-[13ch]">האולם שלכם בטבריה</h1>
          <p className="mt-6 max-w-[38rem] text-[1.125rem] text-muted">
            אולם קולנוע ותיאטרון של 319 מושבים, עם במה מלאה, הקרנה וסאונד של קולנוע ולובי לקבלת פנים. למופע, לכנס,
            לאירוע של העירייה או להקרנה לבית הספר. משאירים פרטים בטופס או מדברים איתנו ישירות, ואנחנו בודקים תאריך ושולחים הצעה.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={btnRed}>
              לטופס הפנייה
            </a>
            <ExternalLink href={wa("שלום, אני מעוניין/ת לבדוק תאריך פנוי בסינמטק טבריה.")} className={`${btnLine} nums`}>
              וואטסאפ {venue.hallPhoneDisplay}
            </ExternalLink>
            <a href={`tel:${venue.hallPhoneTel}`} className={`${btnLine} nums`}>
              שיחה {venue.hallPhoneDisplay}
            </a>
          </div>
          <nav aria-label="בחרו מה מתאים לכם" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            {audiences.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="inline-link">
                {a.title}
              </a>
            ))}
          </nav>
        </div>
        <figure className="lg:col-span-5 lg:self-end">
          <div className="aspect-[4/3] overflow-hidden bg-ink">
            <LoopVideo {...videos.festivalHall} />
          </div>
          <figcaption className="mt-2 text-sm text-muted">אולם מלא בסינמטק טבריה</figcaption>
        </figure>
      </header>

      <section className="wrap" aria-label="נתונים עיקריים">
        <dl className="grid grid-cols-2 border-y-2 border-ink lg:grid-cols-4">
          {quickSpecs.map((item, index) => (
            <div
              key={item.label}
              className={`py-5 pe-4 ${index % 2 === 1 ? "border-s border-[var(--line)] ps-4" : ""} ${index > 1 ? "border-t border-[var(--line)] lg:border-t-0" : ""} ${index === 2 ? "lg:border-s lg:ps-4" : ""}`}
            >
              <dt className="text-sm font-medium text-muted">{item.label}</dt>
              <dd className="nums display mt-2 text-[clamp(2.4rem,1.8rem+2.4vw,4.2rem)] leading-[0.85]">{item.value}</dd>
              <dd className="mt-2 text-sm text-muted">{item.note}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap pt-16" aria-label="למי האולם מתאים">
        <ol className="border-t-2 border-ink">
          {audiences.map((a) => (
            <li key={a.id} id={a.id} className="scroll-mt-24 border-b border-[var(--line)]">
              <article className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <p className="text-sm font-medium text-house">{a.kicker}</p>
                  <h2 className="display t-l mt-2 flex items-baseline gap-3">
                    <SeatIcon />
                    <span>{a.title}</span>
                  </h2>
                  <figure className="mt-6">
                    <div className="aspect-[4/3] overflow-hidden bg-ink">
                      <Photo photo={a.photo} sizes="(min-width: 1024px) 38vw, 100vw" className={a.photoFocus} />
                    </div>
                    <figcaption className="mt-2 text-sm text-muted">{a.photoCaption}</figcaption>
                  </figure>
                </div>
                <div className="lg:col-span-7">
                  <p className="max-w-[40rem] text-[1.125rem]">{a.text}</p>
                  <ul className="mt-6 grid gap-x-6 sm:grid-cols-2">
                    {a.points.map((point) => (
                      <li key={point} className="border-t border-[var(--line)] py-2.5 text-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                  {a.photo2 || a.video2 ? (
                    <figure className={`mt-6 ${a.photo2Tall ? "max-w-[22rem]" : "max-w-[28rem]"}`}>
                      <div className={`${a.photo2Tall ? "aspect-[3/4]" : "aspect-[4/3]"} overflow-hidden bg-ink`}>
                        {a.video2 ? (
                          <LoopVideo {...a.video2} />
                        ) : a.photo2 ? (
                          <Photo photo={a.photo2} sizes="(min-width: 1024px) 22rem, 100vw" />
                        ) : null}
                      </div>
                      <figcaption className="mt-2 text-sm text-muted">{a.photo2Caption}</figcaption>
                    </figure>
                  ) : null}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ExternalLink href={wa(a.ask)} className={btnRed}>
                      בדיקת תאריך בוואטסאפ
                    </ExternalLink>
                    {a.id === "producers" ? (
                      <Link to="/tech" className={btnLine}>
                        המפרט הטכני המלא
                      </Link>
                    ) : null}
                    {a.id === "schools" ? (
                      <ExternalLink href={links.education} className={btnLine}>
                        תוכנית הסינמטק החינוכי
                      </ExternalLink>
                    ) : null}
                    {a.id === "organizations" ? (
                      <Link to="/events#quote" className={btnLine}>
                        טופס הצעת מחיר
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap grid gap-8 pt-20 lg:grid-cols-12" aria-labelledby="included-title">
        <div className="lg:col-span-4">
          <h2 id="included-title" className="display t-l">
            מה יש באולם
          </h2>
          <p className="mt-4 text-muted">הציוד קבוע באולם. הפרטים המלאים, כולל מפת הצוגים, במפרט הטכני.</p>
          <Link to="/tech" className={`${btnLine} mt-6`}>
            למפרט הטכני
          </Link>
        </div>
        <dl className="border-t-2 border-ink lg:col-span-8">
          {included.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-b border-[var(--line)] py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
            >
              <dt className="font-semibold">{row.label}</dt>
              <dd className="text-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap pt-20" aria-labelledby="photos-title">
        <h2 id="photos-title" className="display t-l">
          האולם בתמונות
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {gallery.map((g) => (
            <li key={g.photo.name}>
              <figure>
                <div className="aspect-[4/3] overflow-hidden bg-ink">
                  <Photo photo={g.photo} sizes="(min-width: 1024px) 31vw, 50vw" />
                </div>
                <figcaption className="mt-2 text-sm text-muted">{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="wrap scroll-mt-24 pt-20" aria-labelledby="contact-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="contact-title" className="display t-l">
            בודקים תאריך?
          </h2>
          <p className="mt-4 max-w-[34rem] text-[1.125rem] text-muted">
            ממלאים את הפרטים ושולחים אלינו בוואטסאפ או במייל. נחזור אליכם עם זמינות והצעת מחיר.
          </p>
          <div className="mt-6">
            <HallForm />
          </div>
        </div>
        <div className="grid content-start gap-3 bg-house p-8 text-white lg:col-span-5 lg:p-10">
            <p className="display text-[2rem] leading-none">או ישירות</p>
            <ExternalLink href={wa("שלום, אני מעוניין/ת לבדוק תאריך פנוי בסינמטק טבריה.")} className="btn btn-white nums mt-3">
              וואטסאפ {venue.hallPhoneDisplay}
            </ExternalLink>
            <a href={`tel:${venue.hallPhoneTel}`} className="btn btn-ghost nums">
              סלולרי {venue.hallPhoneDisplay}
            </a>
            <a href={`mailto:${venue.email}`} className="btn btn-ghost">
              {venue.email}
            </a>
            <ExternalLink href={venue.maps} className="text-sm text-white/85 underline underline-offset-4">
              {venue.place}, {venue.street}, {venue.city}
            </ExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}
