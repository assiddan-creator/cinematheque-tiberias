import { festival } from "../festival";
import { photos, videos } from "../media";
import { LoopVideo } from "./LoopVideo";
import { Photo } from "./Photo";

/** Home: a short band, one photo and one sentence. */
export function FestivalBand() {
  return (
    <section className="bg-ink text-white" aria-labelledby="festival-band-title">
      <div className="wrap grid items-center gap-6 py-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-10 lg:py-14">
        <div>
          <p className="text-sm font-medium text-white/75">פעם בשנה, {festival.when}</p>
          <h2 id="festival-band-title" className="display t-l mt-2">
            {festival.name}
          </h2>
          <p className="mt-4 max-w-[30rem] text-white/85">
            הקרנות, סדנאות יצירה ומפגשים עם יוצרים, וגם סדנאות מסך ירוק, איפור ופעלולים בסרטים.
          </p>
        </div>
        <figure>
          <div className="aspect-[4/3] overflow-hidden bg-black">
            <Photo photo={photos.festivalOpening} sizes="(min-width: 640px) 52vw, 100vw" />
          </div>
        </figure>
      </div>
    </section>
  );
}

const gallery = [
  { photo: photos.festivalGreenscreen, caption: "סדנת מסך ירוק על הבמה", ratio: "aspect-[4/5]" },
  { photo: photos.workshopModel, caption: "סדנת יצירה", ratio: "aspect-[4/5]" },
  { photo: photos.festivalFilming, caption: "סדנת צילום", ratio: "aspect-[4/3]" },
  { photo: photos.festivalCraft, caption: "שולחנות היצירה", ratio: "aspect-[4/3]" },
];

/** Screenings page, next to the kids pass: the festival in more detail. */
export function FestivalSection() {
  return (
    <section className="wrap mt-14" aria-labelledby="festival-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-muted">פסטיבל שנתי, {festival.when}</p>
          <h2 id="festival-title" className="display t-l mt-2">
            {festival.name}
          </h2>
          <p className="mt-4 max-w-[34rem]">{festival.history}</p>
          <h3 className="mt-6 font-sans text-base font-semibold leading-normal">מה יש בפסטיבל</h3>
          <ul className="mt-2 border-t-2 border-ink">
            {festival.activities.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-[var(--line)] py-2.5">
                <span className="seat-mark !h-3 !w-2.5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          <figure className="col-span-2">
            <div className="aspect-[16/9] overflow-hidden bg-ink">
              <LoopVideo {...videos.festivalHall} />
            </div>
            <figcaption className="mt-2 text-sm text-muted">אולם מלא בפסטיבל</figcaption>
          </figure>
          {gallery.map((item) => (
            <figure key={item.photo.name}>
              <div className={`${item.ratio} overflow-hidden bg-ink`}>
                <Photo photo={item.photo} sizes="(min-width: 1024px) 28vw, 50vw" />
              </div>
              <figcaption className="mt-2 text-sm text-muted">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
