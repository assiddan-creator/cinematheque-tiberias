import { Link } from "react-router-dom";
import { quickSpecs } from "../content";
import { usePageMeta } from "../lib/usePageTitle";
import { btnLine, btnRed } from "../ui";

const ROWS = 15;
const SEATS = 21;

export function NotFoundPage() {
  usePageMeta("404");

  return (
    <div className="wrap grid min-h-[70svh] content-center gap-10 py-16 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <img
          src="/media/logo-sparkle-800.webp"
          srcSet="/media/logo-sparkle-800.webp 800w, /media/logo-sparkle.webp 1600w"
          sizes="(min-width: 1024px) 22rem, 70vw"
          width={1600}
          height={679}
          alt="סינמטק טבריה"
          className="mb-8 block h-auto w-full max-w-[22rem]"
        />
        <p className="text-sm font-medium text-muted">העמוד לא נמצא</p>
        <h1 className="display t-xl mt-3">שורה 16 לא קיימת</h1>
        <p className="mt-5 max-w-[30rem] text-[1.125rem] text-muted">
          באולם יש {quickSpecs[0].note}, והקישור הזה לא מוביל לאף אחת מהן.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/" className={btnRed}>
            חזרה לעמוד הבית
          </Link>
          <Link to="/screenings" className={btnLine}>
            לסרטים ולמופעים
          </Link>
        </div>
      </div>
      <div className="lg:col-span-5 lg:col-start-8" aria-hidden="true">
        <div className="grid gap-[0.45rem]">
          {Array.from({ length: ROWS + 1 }, (_, row) => (
            <div key={row} className="flex gap-[0.45rem]">
              {Array.from({ length: SEATS }, (_, seat) => (
                <span
                  key={seat}
                  className={`h-2.5 flex-1 rounded-t-full ${
                    row === ROWS ? "border border-dashed border-house" : "bg-[#cdcac6]"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
