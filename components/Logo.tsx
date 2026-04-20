type LogoProps = {
  size?: number;
  className?: string;
  /**
   * If true, the mark is drawn with accessible decorative styling (aria-hidden).
   * Set `title` for an accessible label when the logo stands alone.
   */
  title?: string;
};

/**
 * Kernel & Oak mark.
 *
 * Visual: a small filled seed (the "kernel") grounds a rising bough with two
 * brass leaves (the "oak"). Stroke picks up `currentColor` so the mark adapts
 * to whichever text color the surrounding context sets; brass accents use the
 * `--k-brass` token so they also theme-swap.
 */
export function Logo({ size = 22, className, title }: LogoProps) {
  const labelId = title ? `ko-logo-${Math.random().toString(36).slice(2, 8)}` : undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={labelId}
      className={className}
    >
      {title && <title id={labelId}>{title}</title>}
      {/* oak boughs */}
      <path
        d="M12 20 Q12 12 5.5 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 20 Q12 12 18.5 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* kernel */}
      <circle cx="12" cy="20" r="2.2" fill="var(--k-brass)" />
      {/* leaves */}
      <circle cx="5.5" cy="7.5" r="1.5" fill="var(--k-brass)" />
      <circle cx="18.5" cy="7.5" r="1.5" fill="var(--k-brass)" />
    </svg>
  );
}
