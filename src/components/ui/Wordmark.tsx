/**
 * Typographic wordmark — PLACEHOLDER until the owner supplies the official logo (SVG/PNG).
 * Kept as live text so it stays crisp and accessible.
 */
export function Wordmark({ className = "", sub = true }: { className?: string; sub?: boolean }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`} aria-label="LALA Paal Nilayam">
      <span className="font-display font-semibold tracking-[0.18em] text-[1.35rem]">LALA</span>
      {sub && <span className="mt-1 text-[0.5rem] tracking-[0.34em] uppercase text-gold/90">Paal Nilayam</span>}
    </span>
  );
}
