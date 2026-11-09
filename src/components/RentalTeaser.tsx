import { Link } from "react-router-dom";
import { packages, quickSpecs } from "../content";

const rowLink = "row-hover grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-6 py-5";
const rowTitle = "display block text-[clamp(1.9rem,1.4rem+1.4vw,2.75rem)] leading-[0.95]";

export function RentalTeaser() {
  const [seats, ...specs] = quickSpecs;
  return (
    <section className="wrap py-16 lg:py-24" aria-labelledby="rental-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="nums display text-[clamp(8rem,4rem+14vw,17rem)] leading-[0.75] text-house" aria-hidden="true">
            {seats.value}
          </p>
          <h2 id="rental-title" className="display t-l mt-4 max-w-[14ch]">
            האולם להשכרה: {seats.value} {seats.label}
          </h2>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-ink pt-4">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="text-sm text-muted">{spec.label}</dt>
                <dd className="nums display mt-1 text-[1.9rem] leading-none">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="border-t-2 border-ink lg:col-span-7 lg:mt-3">
          {packages.map((item) => (
            <li key={item.id} className="border-b border-[var(--line)]">
              <Link to={item.to} className={rowLink}>
                <span>
                  <span className={rowTitle}>{item.title}</span>
                  <span className="mt-2 block max-w-[34rem] text-muted">{item.cta}</span>
                </span>
                <span className="seat-mark !h-8 !w-7" aria-hidden="true" />
              </Link>
            </li>
          ))}
          <li className="border-b border-[var(--line)]">
            <Link to="/tech" className={rowLink}>
              <span>
                <span className={rowTitle}>מפרט טכני למפיקים</span>
                <span className="mt-2 block text-muted">צוגים, הקרנה, סאונד, חשמל ופריקה</span>
              </span>
              <span className="seat-mark !h-8 !w-7" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
