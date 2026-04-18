import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://helix.studio"),
  title: {
    default: "HELIX — Applications · Web Systems · Applied AI",
    template: "%s · HELIX",
  },
  description:
    "HELIX is an independent engineering studio designing and shipping category-defining apps, web platforms, and AI systems for ambitious teams.",
  keywords: [
    "app development agency",
    "AI systems agency",
    "web platform engineering",
    "Next.js studio",
    "SwiftUI agency",
    "applied AI consultancy",
  ],
  authors: [{ name: "HELIX Studio" }],
  openGraph: {
    type: "website",
    title: "HELIX — Applications · Web Systems · Applied AI",
    description:
      "Independent engineering studio shipping category-defining apps, web platforms, and applied AI.",
    siteName: "HELIX",
  },
  twitter: { card: "summary_large_image", creator: "@helix" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=satoshi@300,400,500,700&f[]=jetbrains-mono@400,500&display=swap"
        />
      </head>
      <body className="grain">
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
