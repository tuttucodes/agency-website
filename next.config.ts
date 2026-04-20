import type { NextConfig } from "next";
import path from "node:path";

const config: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    // 30 days — images are content-hashed via `?w=...&q=...` so we can cache hard.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 828, 1200, 1600, 1920],
  },
  experimental: {
    // Lets Turbopack tree-shake barrel imports from these libraries, trimming
    // the homepage bundle further even though we already dynamic-import them.
    optimizePackageImports: ["gsap", "lenis"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;
