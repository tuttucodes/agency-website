"use client";
import { useEffect, useRef } from "react";

type Metric = { value: string; label: string; accent?: boolean };

const METRICS: Metric[] = [
  { value: "47", label: "Products shipped" },
  { value: "$2.1B", label: "Portfolio valuation" },
  { value: "22", label: "Engineers & designers" },
  { value: "98", label: "Avg Lighthouse score", accent: true },
];

/**
 * Count-up metrics strip.
 *
 * Uses `IntersectionObserver` + `requestAnimationFrame` to tween each number
 * when it first enters the viewport. This used to pull in GSAP ScrollTrigger
 * (~18KB min+gz) just for this effect — the native observer costs zero bytes
 * on top of what every browser already ships.
 */
export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const runTween = (node: HTMLElement) => {
      const raw = node.dataset.raw ?? node.textContent ?? "";
      const match = raw.match(/([\d.]+)/);
      if (!match) return;
      const target = parseFloat(match[1]);
      const prefix = raw.slice(0, match.index ?? 0);
      const suffix = raw.slice((match.index ?? 0) + match[0].length);

      const start = performance.now();
      const duration = 1800;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // Cubic ease-out — matches the feel of the old gsap `expo.out`.
        const eased = 1 - Math.pow(1 - t, 3);
        const v = target * eased;
        const formatted =
          target >= 100 ? Math.round(v).toString() : v.toFixed(1).replace(/\.0$/, "");
        node.textContent = prefix + formatted + suffix;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runTween(entry.target as HTMLElement);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.35 },
    );
    root.querySelectorAll<HTMLElement>(".num").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 border-y border-border bg-surface-2/50">
      <div
        ref={ref}
        className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-4 sm:gap-x-6"
      >
        {METRICS.map((m) => (
          <div key={m.label} className="min-w-0">
            <div
              data-raw={m.value}
              className={`num font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tightest whitespace-nowrap ${
                m.accent ? "text-accent" : ""
              }`}
            >
              {m.value}
            </div>
            <p className="eyebrow mt-2 min-h-[2.8em]">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
