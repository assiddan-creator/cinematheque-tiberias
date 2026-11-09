import { Suspense, type ReactNode } from "react";

/**
 * A hydration boundary for content computed from the current date (next screening,
 * "today", the form's minimum date). A mismatch with the pre-rendered HTML re-renders
 * only this subtree, so the rest of the page (and its LCP text) is kept as painted.
 */
export function Fresh({ children }: { children: ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
