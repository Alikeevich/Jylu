/**
 * Signature detail: the spot-meter crosshair of a thermal camera.
 * Used in the logo and on hot points in the report preview, nowhere else.
 */
export default function SpotMeter({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <circle cx="8" cy="8" r="4.25" />
      <path d="M8 0.75v3M8 12.25v3M0.75 8h3M12.25 8h3" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
