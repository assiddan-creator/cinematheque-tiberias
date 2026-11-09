import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { RouteTransition } from "./components/RouteTransition";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { scrollToTarget, startSmoothScroll } from "./motion/env";
import { EventsPage } from "./pages/EventsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ScreeningsPage } from "./pages/ScreeningsPage";
import { TechPage } from "./pages/TechPage";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  const lastPath = useRef(pathname);

  useEffect(() => {
    startSmoothScroll();
  }, []);

  useEffect(() => {
    const changedPage = lastPath.current !== pathname;
    lastPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.querySelector(decodeURIComponent(hash)) : null;
      if (target) scrollToTarget(target);
      else if (changedPage || first.current) scrollToTarget(0);
      if (!first.current && changedPage) {
        document.getElementById("main")?.focus({ preventScroll: true });
      }
      first.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export function AppShell() {
  return (
    <div className="min-h-svh">
      <a
        href="#main"
        className="sr-only z-[80] bg-ink font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:px-4 focus:py-3"
      >
        דלגו לתוכן
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/screenings" element={<ScreeningsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

/** Shared by the browser and the build-time pre-render, so the trees match on hydration. */
export function Site() {
  return (
    <>
      <ScrollManager />
      <RouteTransition />
      <AppShell />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
