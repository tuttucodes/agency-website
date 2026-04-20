import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

const SITE_URL = "https://kernelandoak.vercel.app";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Kernel & Oak Studio",
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      sameAs: [
        "https://github.com/kernelandoak",
        "https://x.com/kernelandoak",
        "https://read.cv/kernelandoak",
      ],
      foundingDate: "2020",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 22 },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Kernel & Oak — Engineering Studio",
      url: SITE_URL,
      image: `${SITE_URL}/apple-icon`,
      priceRange: "$$$",
      areaServed: "Worldwide",
      address: [
        { "@type": "PostalAddress", addressLocality: "Bangalore", postalCode: "560008", addressCountry: "IN" },
        { "@type": "PostalAddress", addressLocality: "Lisbon", postalCode: "1250-096", addressCountry: "PT" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Native Application Engineering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Platform Engineering" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Applied AI Systems" } },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Kernel & Oak",
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does an engagement actually cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Discovery is fixed at $18k for 2 weeks. Build engagements typically land between $85k and $480k depending on scope. Retainers start at $24k/month.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can you start?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We book one to two quarters out. Urgent projects can usually be triaged within 10 business days if scope fits an existing pod.",
          },
        },
        {
          "@type": "Question",
          name: "Who actually does the work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The same senior engineers and designers who wrote the proposal. We do not subcontract or staff with juniors.",
          },
        },
      ],
    },
  ],
};

// FOUC guard: read saved theme (or system preference) and apply the class
// before any paint. Runs synchronously — keep it tiny.
const THEME_BOOTSTRAP = `(function(){try{var k='kao-theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: light)').matches;var t=(s==='light'||s==='dark')?s:(m?'light':'dark');var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.dataset.theme=t;r.style.colorScheme=t;}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://kernelandoak.vercel.app"),
  title: {
    default: "Kernel & Oak — Applications · Web Systems · Applied AI",
    template: "%s · Kernel & Oak",
  },
  description:
    "Kernel & Oak is an independent engineering studio designing and shipping category-defining apps, web platforms, and AI systems for ambitious teams.",
  keywords: [
    "app development agency",
    "AI systems agency",
    "web platform engineering",
    "Next.js studio",
    "SwiftUI agency",
    "applied AI consultancy",
  ],
  authors: [{ name: "Kernel & Oak Studio" }],
  openGraph: {
    type: "website",
    title: "Kernel & Oak — Applications · Web Systems · Applied AI",
    description:
      "Independent engineering studio shipping category-defining apps, web platforms, and applied AI.",
    siteName: "Kernel & Oak",
  },
  twitter: { card: "summary_large_image", creator: "@kernelandoak" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F1E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@300,400,500,700&f[]=jetbrains-mono@400,500&display=swap"
        />
        <script
          // FOUC guard — runs sync before first paint.
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }}
        />
      </head>
      <body className="grain">
        <script
          type="application/ld+json"
          // Static const, no user input. Escape `</` → `<\/` to prevent any future
          // string from breaking out of the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
          }}
        />
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
