"use client";

import dynamic from "next/dynamic";

/**
 * Lazy-loads every decorative client-only overlay (scroll progress bar, Lenis
 * smooth-scroll, custom cursor) so none of them block or interfere with the
 * initial server render. Next 16 requires `ssr: false` dynamic imports to sit
 * inside a client-component wrapper — this file exists only to provide that
 * wrapper.
 */
const ScrollProgress = dynamic(
  () => import("@/components/ScrollProgress").then((m) => m.ScrollProgress),
  { ssr: false },
);
const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll").then((m) => m.SmoothScroll),
  { ssr: false },
);
const Cursor = dynamic(
  () => import("@/components/Cursor").then((m) => m.Cursor),
  { ssr: false },
);

export function ClientOverlays() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <Cursor />
    </>
  );
}
