import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../motion/env";

/**
 * The hall's seating plan: 15 rows of 21 seats, seen from the back row.
 * mode "hall": red house, seats fold up on a hinge under the pointer (tap on touch),
 *   with an idle audience wave. One driver: fold[i] in 0..1, fed by pointer + wave.
 * mode "plan": light ground, `filled` seats light up in velvet red (the quote form).
 */
const ROWS = 15;
const COLS = 21;
const TOTAL = ROWS * COLS;

const C = {
  seat: [111, 12, 34],
  seatUp: [217, 80, 106],
  planEmpty: [205, 202, 198],
  planFull: [158, 20, 48],
};

type Props = {
  mode: "hall" | "plan";
  filled?: number;
  className?: string;
};

type Seat = { x: number; y: number; w: number; h: number; row: number; col: number };

function mix(a: number[], b: number[], t: number) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)} ${Math.round(a[1] + (b[1] - a[1]) * t)} ${Math.round(
    a[2] + (b[2] - a[2]) * t,
  )})`;
}

function layout(width: number, height: number, mode: Props["mode"]): Seat[] {
  const seats: Seat[] = [];
  const padX = mode === "hall" ? width * 0.04 : width * 0.02;
  const usable = width - padX * 2;
  // perspective: front rows (row 0, nearest the screen) are smaller
  const scales = Array.from({ length: ROWS }, (_, r) => (mode === "hall" ? 0.7 + 0.3 * (r / (ROWS - 1)) : 1));
  const rowGap = mode === "hall" ? 1.18 : 1.32;
  const pitchFor = (s: number) => (usable / COLS) * s;
  const totalH = scales.reduce((sum, s) => sum + pitchFor(s) * rowGap * 0.82, 0);
  const fit = Math.min(1, (height * 0.94) / totalH);
  let y = mode === "hall" ? height - totalH * fit : (height - totalH * fit) / 2;
  for (let r = 0; r < ROWS; r++) {
    const s = scales[r] * fit;
    const pitch = pitchFor(s);
    const rowWidth = pitch * COLS;
    const x0 = (width - rowWidth) / 2;
    const curve = mode === "hall" ? pitch * 0.7 : 0;
    for (let c = 0; c < COLS; c++) {
      const u = (c - (COLS - 1) / 2) / ((COLS - 1) / 2);
      // RTL: seat 1 of each row sits on the right
      const col = COLS - 1 - c;
      seats.push({
        x: x0 + pitch * c + pitch * 0.11,
        y: y - curve * u * u,
        w: pitch * 0.78,
        h: pitch * 0.8,
        row: r,
        col,
      });
    }
    y += pitch * rowGap * 0.82;
  }
  return seats;
}

const LEVELS = 16;
const palettes = {
  hall: Array.from({ length: LEVELS + 1 }, (_, i) => mix(C.seat, C.seatUp, i / LEVELS)),
  plan: Array.from({ length: LEVELS + 1 }, (_, i) => mix(C.planEmpty, C.planFull, i / LEVELS)),
};
const buckets: number[][] = Array.from({ length: LEVELS + 1 }, () => []);

/** Draws every seat, batched by colour level: one path and one fill per level, cheap on phones. */
function drawAll(ctx: CanvasRenderingContext2D, seats: Seat[], fold: Float32Array, mode: Props["mode"]) {
  for (const b of buckets) b.length = 0;
  for (let i = 0; i < seats.length; i++) buckets[Math.round(fold[i] * LEVELS)].push(i);
  const colors = palettes[mode];
  for (let level = 0; level <= LEVELS; level++) {
    const list = buckets[level];
    if (!list.length) continue;
    const f = level / LEVELS;
    ctx.fillStyle = colors[level];
    ctx.beginPath();
    for (const i of list) {
      const s = seats[i];
      const r = s.w * 0.32;
      if (mode === "plan") {
        ctx.roundRect(s.x, s.y, s.w, s.h * 0.86, [r, r, r * 0.3, r * 0.3]);
        continue;
      }
      const back = s.h * 0.64;
      const cushion = s.h * 0.26;
      const bottom = s.y + s.h;
      // the back stays and lightens; the cushion hinges up into a thin lip against it
      ctx.roundRect(s.x, bottom - cushion - back, s.w, back * (1 - 0.12 * f), [r, r, r * 0.25, r * 0.25]);
      const ch = cushion * (1 - 0.78 * f);
      const lift = cushion * 0.55 * f;
      ctx.roundRect(s.x - s.w * 0.04, bottom - ch - lift, s.w * 1.08, ch, s.w * 0.12);
    }
    ctx.fill();
  }
}

export function SeatField({ mode, filled = 0, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const filledRef = useRef(filled);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    filledRef.current = filled;
    kick.current();
  }, [filled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = prefersReducedMotion();
    const fold = new Float32Array(TOTAL);
    let seats: Seat[] = [];
    let width = 0;
    let height = 0;
    let visible = false;
    let running = false;
    const pointer = { x: -9999, y: -9999, active: false, strength: 0 };
    const tap = { x: 0, y: 0, t: -10 };
    let start = gsap.ticker.time;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seats = layout(width, height, mode);
      draw();
    }

    function planTarget(i: number) {
      const seat = seats[i];
      if (!seat) return 0;
      const order = seat.row * COLS + seat.col; // front row first, seat 1 first
      const n = Math.round((Math.min(319, Math.max(0, filledRef.current)) / 319) * TOTAL);
      return order < n ? 1 : 0;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      drawAll(ctx!, seats, fold, mode);
    }

    const touch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    let lastScroll = window.scrollY;
    function step() {
      frame++;
      if (touch) {
        const y = window.scrollY;
        const scrolling = y !== lastScroll;
        lastScroll = y;
        if (scrolling || frame % 2) return; // phones: 30 fps, and never compete with scrolling
      }
      const t = gsap.ticker.time - start;
      const ratio = gsap.ticker.deltaRatio() * (touch ? 2 : 1);
      let moving = false;
      if (mode === "hall") {
        pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * (1 - Math.pow(0.88, ratio));
        const radius = Math.max(70, width * 0.11);
        // idle: an audience wave crosses the hall every ~11 s
        const cycle = 11;
        const phase = (t % cycle) / cycle;
        const waveX = width * (1.25 - phase * 1.5);
        const waveW = Math.max(40, width * 0.05);
        const tapAge = gsap.ticker.time - tap.t;
        for (let i = 0; i < seats.length; i++) {
          const s = seats[i];
          const cx = s.x + s.w / 2;
          const cy = s.y + s.h / 2;
          let target = 0;
          if (pointer.strength > 0.01) {
            const d = Math.hypot(cx - pointer.x, (cy - pointer.y) * 1.25);
            const k = 1 - d / radius;
            if (k > 0) target = Math.max(target, k * k * (3 - 2 * k) * pointer.strength);
          }
          if (tapAge < 1.6) {
            const d = Math.hypot(cx - tap.x, cy - tap.y);
            const ring = tapAge * width * 0.7;
            const k = 1 - Math.abs(d - ring) / (width * 0.08);
            if (k > 0) target = Math.max(target, k * (1 - tapAge / 1.6));
          }
          const dx = (cx - waveX) / waveW;
          target = Math.max(target, 0.62 * Math.exp(-dx * dx - (s.row % 2) * 0.15));
          const next = fold[i] + (target - fold[i]) * (1 - Math.pow(target > fold[i] ? 0.7 : 0.86, ratio));
          if (Math.abs(next - fold[i]) > 0.001) moving = true;
          fold[i] = next;
        }
        moving = true; // the wave keeps the hall breathing while it is on screen
      } else {
        for (let i = 0; i < seats.length; i++) {
          const target = planTarget(i);
          const delay = (seats[i].row * COLS + seats[i].col) * 0.0009;
          if (gsap.ticker.time - start < delay) {
            moving = true;
            continue;
          }
          const next = fold[i] + (target - fold[i]) * (1 - Math.pow(0.8, ratio));
          if (Math.abs(target - next) > 0.002) moving = true;
          fold[i] = Math.abs(target - next) > 0.002 ? next : target;
        }
      }
      draw();
      if (!moving) stop();
    }

    function go() {
      if (running || reduce || !visible) return;
      running = true;
      gsap.ticker.add(step);
    }
    function stop() {
      if (!running) return;
      running = false;
      gsap.ticker.remove(step);
    }

    kick.current = () => {
      if (mode !== "plan") return;
      if (reduce) {
        for (let i = 0; i < seats.length; i++) fold[i] = planTarget(i);
        draw();
        return;
      }
      start = gsap.ticker.time;
      go();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = event.pointerType === "mouse" || event.pointerType === "pen";
      go();
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") return;
      const rect = canvas.getBoundingClientRect();
      tap.x = event.clientX - rect.left;
      tap.y = event.clientY - rect.top;
      tap.t = gsap.ticker.time;
      go();
    };

    const host: HTMLElement = canvas.closest<HTMLElement>("[data-seat-host]") ?? canvas.parentElement ?? canvas;
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) go();
      else stop();
    });
    io.observe(canvas);

    if (mode === "plan") {
      for (let i = 0; i < TOTAL; i++) fold[i] = 0;
    }
    resize();
    if (mode === "plan") kick.current();

    if (mode === "hall" && !reduce) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown, { passive: true });
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      kick.current = () => {};
    };
  }, [mode]);

  return <canvas ref={canvasRef} className={`seat-canvas ${className ?? ""}`} aria-hidden="true" />;
}
