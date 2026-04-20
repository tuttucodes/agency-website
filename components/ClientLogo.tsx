import type { ClientEntry } from "@/lib/clients";

const WIDTH_MAP: Record<NonNullable<ClientEntry["width"]>, string> = {
  sm: "w-[120px]",
  md: "w-[170px]",
  lg: "w-[210px]",
};

/**
 * Renders a single client mark inside the marquee.
 *
 * Strategy
 * ────────
 * • Brands that exist on Simple Icons render as a CSS-masked SVG: we use the
 *   CDN SVG as a mask and fill it with `currentColor`, which means the logo
 *   automatically inherits the theme's accent/text color and looks consistent
 *   at any scale. No external `<img>`, no next/image round-trip.
 * • Brands without a Simple Icons entry (Federal Bank, Amrita, noon, etc.)
 *   render as editorial wordmark text in the display face. They still sit at
 *   the same cap-height as the masked logos so the marquee's rhythm is clean.
 *
 * Accessibility: each cell is a single `<span role="img">` with the full
 * brand name as its label, and the visible text (for wordmarks) is
 * `aria-hidden` — screen readers never see the stylized abbreviation.
 */
export function ClientLogo({ client }: { client: ClientEntry }) {
  const widthClass = WIDTH_MAP[client.width ?? "sm"];

  if (client.slug) {
    const url = `https://cdn.simpleicons.org/${client.slug}`;
    return (
      <span
        role="img"
        aria-label={client.name}
        className={`client-logo-mask shrink-0 ${widthClass} h-8 md:h-10`}
        style={{
          WebkitMaskImage: `url(${url})`,
          maskImage: `url(${url})`,
        }}
      />
    );
  }

  const styleClass =
    client.style === "mono"
      ? "font-[family-name:var(--font-mono)] tracking-[0.08em]"
      : client.style === "allCaps"
        ? "font-[family-name:var(--font-display)] uppercase tracking-[0.06em]"
        : client.style === "smallCaps"
          ? "font-[family-name:var(--font-display)] [font-variant:all-small-caps] tracking-[0.06em]"
          : "font-[family-name:var(--font-display)]";

  return (
    <span
      role="img"
      aria-label={client.name}
      className={`shrink-0 inline-flex items-center whitespace-nowrap ${styleClass}`}
    >
      <span aria-hidden="true">{client.fallback}</span>
    </span>
  );
}
