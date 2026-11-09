import { ARM, ARM_HINGE, HANDWRITING, HW_BOLD, LETTERS, LOGO_H, LOGO_W } from "../logo/paths";

const colors = {
  light: { letters: "#9E1430", hand: "#16131A" },
  red: { letters: "#F2CF7A", hand: "#FFF8EC" },
} as const;

type Props = {
  tone?: keyof typeof colors;
  /** Small sizes (up to 48 px tall): the handwriting is drawn 1.5x heavier so it stays legible. */
  small?: boolean;
  className?: string;
  title?: string;
};

/** The Cinematheque Tiberias logo as inline SVG; decorative unless a title is given. */
export function Logo({ tone = "light", small = false, className, title }: Props) {
  const c = colors[tone];
  return (
    <svg
      viewBox={`0 0 ${LOGO_W} ${LOGO_H}`}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path fill={c.letters} fillRule="evenodd" d={LETTERS} />
      <path className="logo-arm" style={{ transformOrigin: ARM_HINGE }} fill={c.letters} fillRule="evenodd" d={ARM} />
      <path
        fill={c.hand}
        fillRule="evenodd"
        d={HANDWRITING}
        stroke={small ? c.hand : undefined}
        strokeWidth={small ? HW_BOLD : undefined}
        strokeLinejoin="round"
      />
    </svg>
  );
}
