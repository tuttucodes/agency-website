"use client";
import { useEffect, useRef } from "react";

type Metric = { value: string; label: string; accent?: boolean };

const METRICS: Metric[] = [
  { value: "47", label: "Products shipped" },
  { value: "$2.1B", label: "Portfolio valuation" },
  { value: "22", label: "Engineers & designers" },
  { value: "98", label: "Avg Lighthouse score", accent: true },
];

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!mounted) return;
      gsap.registerPlugin(ScrollTrigger);
      ref.current?.querySelectorAll<HTMLElement>(".num").forEach((el) => {
        const raw = el.dataset.raw ?? el.textContent ?? "";
        const match = raw.match(/([\d.]+)/);
        if (!match) return;
        const target = parseFloat(match[1]);
        const prefix = raw.slice(0, match.index ?? 0);
        const suffix = raw.slice((match.index ?? 0) + match[0].length);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
          onUpdate: () => {
            const formatted =
              target >= 100 ? Math.round(obj.v).toString() : obj.v.toFixed(1).replace(/\.0$/, "");
            el.textContent = prefix + formatted + suffix;
          },
        });
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 border-y border-border bg-surface-2/50">
      <div
        ref={ref}
        className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-4 sm:gap-x-6"
      >
        {METRICS.map((m) => (
          <div key={m.label}>
            <div
              data-raw={m.value}
              className={`num font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl tracking-tightest ${
                m.accent ? "text-accent" : ""
              }`}
            >
              {m.value}
            </div>
            <p className="eyebrow mt-2">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
