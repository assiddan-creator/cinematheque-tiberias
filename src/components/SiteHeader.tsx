import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { links, venue } from "../content";
import { ExternalLink } from "./ExternalLink";
import { goldButton } from "../ui";

const items = [
  { to: "/screenings", label: "סרטים ומופעים" },
  { to: "/events", label: "אירועים וכנסים" },
  { to: "/events#education", label: "הסינמטק החינוכי" },
  { to: "/tech", label: "מפרט טכני למפיקים" },
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
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (!open) {
      if (restoreFocus.current) {
        menuButton.current?.focus();
        restoreFocus.current = false;
      }
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocus.current = true;
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closeFromLink() {
    restoreFocus.current = false;
    setOpen(false);
  }

  return (
    <header className="no-print sticky top-0 z-40 border-b border-gold/20 bg-void/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="min-w-0 leading-tight" onClick={closeFromLink}>
          <span className="block font-display text-lg text-ivory sm:text-xl">{venue.name}</span>
          <span className="block text-xs text-silver sm:text-sm">מרכז תרבות, קולנוע וכנסים</span>
        </Link>

        <nav className="me-auto ms-6 hidden items-center gap-5 lg:flex" aria-label="ניווט ראשי">
          {items.map((item) => {
            const current = isCurrent(pathname, hash, item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={current ? "page" : undefined}
                className={`text-sm ${current ? "text-ivory" : "text-silver hover:text-ivory"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ExternalLink href={links.cinematheque} className={`${goldButton} ms-auto shrink-0 px-3 text-xs sm:px-4 sm:text-sm lg:ms-0`}>
          לרכישת כרטיסים
        </ExternalLink>

        <button
          ref={menuButton}
          type="button"
          className="inline-flex size-11 items-center justify-center border border-gold/25 lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => {
            restoreFocus.current = false;
            setOpen((value) => !value);
          }}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label="ניווט ראשי"
            className="border-t border-gold/20 bg-void lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
              {items.map((item) => {
                const current = isCurrent(pathname, hash, item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={current ? "page" : undefined}
                      className="flex min-h-11 items-center text-base text-ivory"
                      onClick={closeFromLink}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
