import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { EventsPage } from "./pages/EventsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ScreeningsPage } from "./pages/ScreeningsPage";
import { TechPage } from "./pages/TechPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-svh bg-void font-sans text-ivory">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-void"
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
    </BrowserRouter>
  );
}
