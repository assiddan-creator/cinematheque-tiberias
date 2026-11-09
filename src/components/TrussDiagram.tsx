import { useState } from "react";
import { trusses } from "../content";
import { SeatIcon } from "./SeatIcon";

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
    const fill = gels ? (index % 2 === 0 ? "#3d6ea8" : "#9e1430") : "#e0a526";
    return <circle key={`${y}-${index}`} className={gel} cx={x} cy={y} r={gels ? 5 : 6} fill={fill} />;
  });
}

export function TrussDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
      <figure className="bg-ink p-3 text-white sm:p-5">
        <svg viewBox="0 0 520 400" className="h-auto w-full" role="img" aria-labelledby="truss-title truss-desc">
          <title id="truss-title">מבט על של הבמה וארבעת הצוגים</title>
          <desc id="truss-desc">
            הקהל בתחתית התרשים. צוג 1 הקדמי פנוי, צוג 2 עם 12 פנסים, צוג 3 עם מסך הקולנוע, צוג 4 האחורי עם 18 פנסים.
          </desc>
          <rect className="stage-floor" x="78" y="46" width="364" height="292" fill="#101014" stroke="rgba(255,255,255,0.35)" />
          {positions.map((bar) => {
            const on = active === bar.id;
            return (
              <line
                key={bar.id}
                x1="96"
                y1={bar.y}
                x2="424"
                y2={bar.y}
                stroke={on ? "#ffffff" : "rgba(255,255,255,0.55)"}
                strokeWidth={on ? 4 : 2}
                strokeDasharray={bar.id === "1" ? "7 6" : undefined}
              />
            );
          })}
          <Lamps count={18} y={78} gels />
          <rect className="screen-fill" x="150" y="132" width="220" height="32" fill="#eeedea" stroke="#ffffff" />
          <Lamps count={12} y={228} />
          <rect x="78" y="348" width="364" height="28" fill="rgba(158,20,48,0.55)" stroke="rgba(255,255,255,0.25)" />
        </svg>
        <figcaption className="mt-2 flex justify-between gap-3 text-sm text-white/80">
          <span>למעלה: גב הבמה</span>
          <span>למטה: הקהל</span>
        </figcaption>
      </figure>

      <div className="grid border-t-2 border-ink">
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
              className={`row-hover border-b px-1 py-4 text-start transition-colors ${pressed ? "border-house bg-paper" : "border-[var(--line)]"}`}
            >
              <span className="display flex items-center gap-3 text-[2rem] leading-none"><SeatIcon />{truss.name}</span>
              <span className="mt-1.5 block text-muted">{truss.detail}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
