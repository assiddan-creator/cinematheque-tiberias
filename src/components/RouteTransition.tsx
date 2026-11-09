import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { prefersReducedMotion } from "../motion/env";

const names: Record<string, string> = {
  "/": "סינמטק טבריה",
  "/screenings": "סרטים ומופעים",
  "/events": "השכרת האולם",
  "/tech": "מפרט טכני",
};

const ROWS = 15;
const EASE = "cubic-bezier(0.7,0,0.2,1)";

/**
 * Page transition: the 15 rows of the hall fold up from the back row to the front,
 * the route changes behind them, then they fold away. Skipped under reduced motion.
 */
export function RouteTransition() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const current = useRef(pathname);
  current.current = pathname;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === current.current) return; // same page: hash jumps stay instant
      if (prefersReducedMotion() || busy.current || !root.current) return;

      event.preventDefault();
      busy.current = true;
      const rows = Array.from(root.current.querySelectorAll("i"));
      if (label.current) label.current.textContent = names[url.pathname] ?? "";
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        onComplete: () => {
          busy.current = false;
        },
      });
      tl.set(root.current, { visibility: "visible" })
        .set(rows, { transformOrigin: "50% 100%" })
        .to(rows, { scaleY: 1, duration: 0.42, stagger: { each: 0.016, from: "end" } })
        .to(label.current, { opacity: 1, duration: 0.2 }, "-=0.2")
        .add(() => navigate(url.pathname + url.search + url.hash))
        .to(label.current, { opacity: 0, duration: 0.18 }, "+=0.08")
        .to(rows, { scaleY: 0, duration: 0.42, stagger: { each: 0.016, from: "start" } }, "<")
        .set(root.current, { visibility: "hidden" });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return (
    <div ref={root} className="rows-curtain" aria-hidden="true">
      {Array.from({ length: ROWS }, (_, index) => (
        <i key={index} />
      ))}
      <span ref={label} />
    </div>
  );
}
