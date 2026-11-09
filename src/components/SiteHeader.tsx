import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { links, venue } from "../content";
import { ExternalLink } from "./ExternalLink";
import { Logo } from "./Logo";
import { btnRed } from "../ui";

const items = [
  { to: "/screenings", label: "סרטים ומופעים" },
  { to: "/events", label: "השכרת האולם" },
  { to: "/events#education", label: "הסינמטק החינוכי" },
  { to: "/tech", label: "מפרט טכני" },
];

function isCurrent(pathname: string, hash: string, to: string) {
  const [path, fragment] = to.split("#");
  if (fragment) return pathname === path && hash === `#${fragment}`;
  if (path === "/events") return pathname === "/events" && hash !== "#education";
  return pathname === path;
}

export function SiteHeader() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";
  const [heroLogoGone, setHeroLogoGone] = useState(!onHome);

  useEffect(() => {
    if (!onHome) {
      setHeroLogoGone(true);
      return;
    }
    const target = document.getElementById("hero-logo");
    if (!target) {
      setHeroLogoGone(true);
      return;
    }
    setHeroLogoGone(false);
    const io = new IntersectionObserver(([entry]) => setHeroLogoGone(!entry.isIntersecting), {
      rootMargin: "-68px 0px 0px 0px",
    });
    io.observe(target);
    return () => io.disconnect();
  }, [onHome]);
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = [menuButton.current, ...panel.current.querySelectorAll<HTMLElement>("a")].filter(
        Boolean,
      ) as HTMLElement[];
      const index = focusables.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= focusables.length) {
        event.preventDefault();
        focusables[nextIndex < 0 ? focusables.length - 1 : 0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--line)] bg-ground/95 backdrop-blur-sm">
      <div className="wrap flex min-h-[3.75rem] items-center gap-2.5 sm:min-h-[4.25rem] sm:gap-4">
        <Link
          to="/"
          className="logo header-logo min-w-0 shrink-0 py-1.5"
          aria-label={venue.name}
          data-hidden={heroLogoGone ? undefined : "true"}
        >
          <Logo small className="block h-11 w-auto lg:h-12" />
        </Link>

        <nav className="ms-8 hidden items-center gap-7 lg:flex" aria-label="ניווט ראשי">
          {items.map((item) => {
            const current = isCurrent(pathname, hash, item.to);
            return (
              <Link key={item.to} to={item.to} aria-current={current ? "page" : undefined} className="navlink">
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ExternalLink href={links.cinematheque} className={`${btnRed} btn-sm ms-auto shrink-0 px-3 sm:px-4`}>
          לרכישת כרטיסים
        </ExternalLink>

        <button
          ref={menuButton}
          type="button"
          className="btn btn-line btn-sm min-w-[4.25rem] px-3 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "סגירה" : "תפריט"}
        </button>
      </div>

      <div
        id={menuId}
        ref={panel}
        hidden={!open}
        className="border-t border-[var(--line)] bg-ground lg:hidden"
      >
        <nav aria-label="ניווט ראשי בטלפון" className="wrap">
          <ul className="py-3">
            {[{ to: "/", label: "עמוד הבית" }, ...items].map((item) => {
              const current = item.to === "/" ? pathname === "/" : isCurrent(pathname, hash, item.to);
              return (
                <li key={item.to} className="border-b border-[var(--line)] last:border-0">
                  <Link
                    to={item.to}
                    aria-current={current ? "page" : undefined}
                    className="row-hover flex min-h-14 items-center justify-between gap-4 font-display text-[2.4rem] font-bold leading-none"
                    onClick={() => setOpen(false)}
                  >
                    <span>{item.label}</span>
                    {current ? <span className="seat-mark" aria-hidden="true" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
