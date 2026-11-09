import { useState } from "react";
import { trusses } from "../content";

const positions = [
  { id: "4", y: 78 },
  { id: "3", y: 148 },
  { id: "2", y: 228 },
  { id: "1", y: 308 },
];

function Lamps({ count, y, gels }: { count: number; y: number; gels?: boolean }) {
  const start = 118;
  const end = 402;
  return Array.from({ length: count }, (_, index) => {
    const x = start + ((end - start) * index) / (count - 1);
    const gel = gels ? (index % 2 === 0 ? "gel-blue" : "gel-red") : "lamp";
    const fill = gels ? (index % 2 === 0 ? "#3d6ea8" : "#8e2f3a") : "#d4af37";
    return <circle key={`${y}-${index}`} className={gel} cx={x} cy={y} r={gels ? 5 : 6} fill={fill} />;
  });
}

export function TrussDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <figure className="border border-gold/20 bg-stone p-3 sm:p-4">
        <svg viewBox="0 0 520 400" className="h-auto w-full" role="img" aria-labelledby="truss-title truss-desc">
          <title id="truss-title">מבט על של הבמה וארבעת הצוגים</title>
          <desc id="truss-desc">
            הקהל בתחתית התרשים. צוג 1 הקדמי פנוי, צוג 2 עם 12 פנסים, צוג 3 עם מסך הקולנוע, צוג 4 האחורי עם 18 פנסים.
          </desc>
          <rect className="stage-floor" x="78" y="46" width="364" height="292" fill="#101014" stroke="rgba(212,175,55,0.45)" />
          {positions.map((bar) => {
            const on = active === bar.id;
            return (
              <line
                key={bar.id}
                x1="96"
                y1={bar.y}
                x2="424"
                y2={bar.y}
                stroke={on ? "#f5f5f4" : "rgba(212,175,55,0.85)"}
                strokeWidth={on ? 4 : 2}
                strokeDasharray={bar.id === "1" ? "7 6" : undefined}
              />
            );
          })}
          <Lamps count={18} y={78} gels />
          <rect className="screen-fill" x="150" y="132" width="220" height="32" fill="#f3ead0" stroke="#d4af37" />
          <Lamps count={12} y={228} />
          <rect x="78" y="348" width="364" height="28" fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.25)" />
        </svg>
        <figcaption className="mt-2 flex justify-between gap-3 text-sm text-silver">
          <span>למעלה: גב הבמה</span>
          <span>למטה: הקהל</span>
        </figcaption>
      </figure>

      <div className="grid gap-2">
        {trusses.map((truss) => {
          const pressed = active === truss.id;
          return (
            <button
              key={truss.id}
              type="button"
              aria-pressed={pressed}
              onMouseEnter={() => setActive(truss.id)}
              onFocus={() => setActive(truss.id)}
              onClick={() => setActive(truss.id)}
              className={`border px-3 py-3 text-start ${pressed ? "border-gold bg-void" : "border-gold/20 bg-stone"}`}
            >
              <span className="block font-display text-xl">{truss.name}</span>
              <span className="mt-1 block text-sm text-silver">{truss.detail}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
