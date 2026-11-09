import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../motion/env";

type Props = { src: string; poster: string; w: number; h: number; label: string; className?: string };

/**
 * Muted looping clip. The file is only requested when the video comes near the screen,
 * it plays only while visible, and under reduced motion only the poster is shown.
 */
export function LoopVideo({ src, poster, w, h, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (prefersReducedMotion()) {
      setStill(true);
      return;
    }
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    near.observe(video);
    seen.observe(video);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  if (still) {
    return <img src={poster} alt={label} width={w} height={h} loading="lazy" decoding="async" className={`block h-full w-full object-cover ${className ?? ""}`} />;
  }

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      width={w}
      height={h}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={`block h-full w-full object-cover ${className ?? ""}`}
    />
  );
}
