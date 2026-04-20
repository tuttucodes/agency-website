"use client";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-px z-[60] origin-left"
      style={{
        // Brand-matched: aged brass → sage, replacing the old mint → violet.
        background:
          "linear-gradient(to right, var(--k-brass), var(--k-sage))",
        transform: "scaleX(0)",
      }}
      ref={ref}
    />
  );
}
