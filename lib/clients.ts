/**
 * Partner / client roster for the homepage marquee.
 *
 * For each entry:
 *  - `slug`     — Simple Icons brand slug. When present, the logo renders as
 *                  a CSS-masked SVG from cdn.simpleicons.org so it inherits
 *                  `currentColor` and themes correctly.
 *  - `fallback` — Editorial wordmark rendered when no Simple Icons entry
 *                  exists. Kept visually close to the brand's real wordmark.
 *  - `style`    — Optional tweak hints so India/GCC local brands that lack a
 *                  Simple Icons entry still feel distinctive when they mount
 *                  as text ("mono", "serif", "smallCaps", "allCaps").
 */
export type ClientStyle = "display" | "mono" | "allCaps" | "smallCaps";

export type ClientEntry = {
  name: string;
  slug?: string;
  fallback: string;
  style?: ClientStyle;
  /** Relative width multiplier for text wordmark cells — nudge wide names. */
  width?: "sm" | "md" | "lg";
};

export const CLIENTS: ClientEntry[] = [
  { name: "Amazon", slug: "amazon", fallback: "amazon" },
  { name: "Shopify", slug: "shopify", fallback: "Shopify" },
  { name: "Tata Consultancy Services", slug: "tataconsultancyservices", fallback: "TCS" },
  { name: "Federal Bank", fallback: "Federal Bank", style: "display", width: "md" },
  { name: "Razorpay", slug: "razorpay", fallback: "razorpay" },
  { name: "Carrefour", slug: "carrefour", fallback: "Carrefour" },
  { name: "noon", fallback: "noon", style: "display" },
  { name: "Saudi Aramco", slug: "saudiaramco", fallback: "ARAMCO" },
  { name: "Du (Etisalat)", slug: "etisalat", fallback: "du" },
  { name: "Khaleej Times", fallback: "Khaleej Times", style: "display", width: "md" },
  { name: "Reliance", fallback: "Reliance", style: "display" },
  { name: "Amrita Builders", fallback: "Amrita Builders", style: "display", width: "lg" },
  { name: "Asset Homes", fallback: "Asset Homes", style: "display", width: "md" },
];
