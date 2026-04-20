import { routes, type VercelConfig } from "@vercel/config/v1";

/**
 * Kernel & Oak — Vercel project config.
 *
 * Replaces the legacy `vercel.json` with a typed, programmable config.
 * Deploys from bom1 (Bangalore) to stay close to the primary audience, with
 * headers enforcing a strict security baseline on every route.
 */
export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "next build",
  installCommand: "npm install",
  regions: ["bom1"],
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
    routes.cacheControl("/opengraph-image", { public: true, maxAge: "1 day" }),
    routes.cacheControl("/twitter-image", { public: true, maxAge: "1 day" }),
  ],
};

export default config;
