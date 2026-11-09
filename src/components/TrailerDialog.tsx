import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { setScrollLocked } from "../motion/env";

type Trailer = { id: string; title: string };
type Open = (trailer: Trailer, opener: HTMLElement | null) => void;

const TrailerContext = createContext<Open>(() => {});

/** Opens a trailer in a modal: YouTube (no-cookie) iframe, loaded only after the click. */
export function useTrailer() {
  return useContext(TrailerContext);
}

export function TrailerProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [trailer, setTrailer] = useState<Trailer | null>(null);

  const open = useCallback<Open>((next, from) => {
    opener.current = from;
    setTrailer(next);
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const el = dialog.current;
    if (!el || !trailer) return;
    if (!el.open) el.showModal(); // modal: the rest of the page is inert, so focus stays inside
    setScrollLocked(true);
    closeButton.current?.focus();
  }, [trailer]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      setTrailer(null); // removes the iframe, which stops playback
      setScrollLocked(false);
      opener.current?.focus();
    };
    // a click on the backdrop lands on the dialog element itself, outside the panel
    const onClick = (event: MouseEvent) => {
      if (event.target === el) el.close();
    };
    el.addEventListener("close", onClose);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("close", onClose);
      el.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <TrailerContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="trailer-dialog"
        aria-labelledby="trailer-title"
        data-lenis-prevent
      >
        <div className="trailer-panel">
          <div className="flex items-center justify-between gap-4 pb-3">
            <h2 id="trailer-title" className="display text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-[0.95] text-white">
              {trailer ? `טריילר: ${trailer.title}` : "טריילר"}
            </h2>
            <button ref={closeButton} type="button" className="trailer-close" onClick={close}>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M4 4l12 12M16 4L4 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span className="sr-only">סגירת הטריילר</span>
            </button>
          </div>
          <div className="aspect-video w-full bg-black">
            {trailer ? (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${trailer.id}?autoplay=1&rel=0&playsinline=1`}
                title={`טריילר: ${trailer.title}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : null}
          </div>
        </div>
      </dialog>
    </TrailerContext.Provider>
  );
}
