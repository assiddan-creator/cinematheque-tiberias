/** A cinema seat drawn as an icon: back and cushion. In a hovered or focused row the cushion folds up. */
export function SeatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`seat-icon ${className ?? ""}`} aria-hidden="true" focusable="false">
      <rect className="seat-icon__back" x="4" y="1.5" width="12" height="11" rx="3.5" />
      <rect className="seat-icon__cushion" x="2" y="13.5" width="16" height="5" rx="2" />
    </svg>
  );
}
