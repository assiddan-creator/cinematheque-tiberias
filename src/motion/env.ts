import { gsap } from "gsap";
import Lenis from "lenis";

export const isBrowser = typeof window !== "undefined";

export function prefersReducedMotion() {
  return isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isFinePointer() {
  return isBrowser && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

let lenis: Lenis | null = null;

/** Smooth scroll on fine pointers only; native scroll on touch and under reduced motion. */
export function startSmoothScroll() {
  if (!isBrowser || lenis || prefersReducedMotion() || !isFinePointer()) return;
  lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, autoRaf: false });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: Element | number) {
  if (lenis) {
    lenis.scrollTo(target as HTMLElement | number, { immediate: true, force: true, offset: typeof target === "number" ? 0 : -88 });
    return;
  }
  if (typeof target === "number") window.scrollTo(0, target);
  else target.scrollIntoView();
}

/** Stops page scrolling while a modal is open (smooth scroll and native). */
export function setScrollLocked(locked: boolean) {
  if (!isBrowser) return;
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
