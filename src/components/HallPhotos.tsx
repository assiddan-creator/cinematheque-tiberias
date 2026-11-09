import { photos } from "../media";
import { Photo } from "./Photo";

/** Home: the empty hall from three sides. */
export function HallPhotos() {
  return (
    <section className="wrap pb-16 lg:pb-24" aria-labelledby="hall-photos-title">
      <h2 id="hall-photos-title" className="display t-xl">
        באולם
      </h2>
      <p className="mt-4 max-w-[30rem] text-muted">כך נראה האולם כשהוא ריק, מכל צד. הכיסאות באמת אדומים.</p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-6">
        <figure className="col-span-2 lg:col-span-7 lg:row-span-2">
          <div className="aspect-[4/3] overflow-hidden bg-ink lg:aspect-auto lg:h-full">
            <Photo photo={photos.hallBackToScreen} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <figcaption className="mt-2 text-sm text-muted">מהשורה האחרונה אל המסך</figcaption>
        </figure>
        <figure className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-ink lg:aspect-[4/3]">
            <Photo photo={photos.redRows} sizes="(min-width: 1024px) 40vw, 50vw" />
          </div>
          <figcaption className="mt-2 text-sm text-muted">שורות הכיסאות</figcaption>
        </figure>
        <figure className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-ink lg:aspect-[4/3]">
            <Photo photo={photos.hallFromStage} sizes="(min-width: 1024px) 40vw, 50vw" />
          </div>
          <figcaption className="mt-2 text-sm text-muted">מהבמה אל האולם</figcaption>
        </figure>
      </div>
    </section>
  );
}
