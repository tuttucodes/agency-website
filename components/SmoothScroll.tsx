"use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Lenis on touch / narrow viewports causes momentum lag; skip there.
    const isTouch = window.matchMedia("(hover: none)").matches;
    const isNarrow = window.matchMedia("(max-width: 768px)").matches;
    if (isTouch || isNarrow) return;

    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;

    (async () => {
      const mod = await import("lenis");
      const Lenis = mod.default;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
