import { useEffect } from "react";
import { routeMeta } from "../meta";

export function usePageMeta(key: keyof typeof routeMeta | string) {
  const meta = routeMeta[key] ?? routeMeta["404"];
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
  }, [meta]);
}
