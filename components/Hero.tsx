"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";

/**
 * Kernel & Oak hero — responsive, top-notch.
 *
 * Layout strategy
 * ───────────────
 * Mobile (<640):  single column, tight padding, compact stat row below.
 * Tablet (≥640):  4-up stats, CTAs inline.
 * Desktop (≥1024): 12-col grid, right rail holds stats + lead copy.
 *
 * Motion strategy
 * ───────────────
 * Headline words render in their final position by default — the `.js-motion`
 * class is only added client-side *after* GSAP is available, at which point
 * the CSS transforms kick in and the timeline animates them back into place.
 * Net result: first paint shows the real headline (no invisible-until-JS bug,
 * no CLS), and motion is additive for capable clients.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const gsap = (await import("gsap")).default;
      if (!mounted || !rootRef.current) return;

      // Activate the translated starting state *now* that JS is ready.
      rootRef.current.classList.add("js-motion");

      const words = headlineRef.current?.querySelectorAll<HTMLElement>(".kinetic .word > span") ?? [];
      const eyebrow = rootRef.current.querySelectorAll<HTMLElement>("[data-hero-fade]");
      const ctas = rootRef.current.querySelectorAll<HTMLElement>("[data-hero-rise]");
      const stats = rootRef.current.querySelectorAll<HTMLElement>("[data-hero-stat]");

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(eyebrow, { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 })
        .to(words, { y: 0, duration: 1.25, stagger: 0.07 }, "-=0.55")
        .from(ctas, { opacity: 0, y: 20, duration: 0.9, stagger: 0.08 }, "-=0.6")
        .from(stats, { opacity: 0, y: 16, duration: 0.8, stagger: 0.08 }, "-=0.7");
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-32 sm:pt-40 md:pt-44 pb-10 sm:pb-14"
    >
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {/* Soft grid lines behind the hero — editorial anchor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] hidden sm:block"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          color: "var(--k-text)",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, #000 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, #000 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] w-full px-5 sm:px-6 md:px-10">
        {/* Eyebrow row */}
        <div className="flex items-start justify-between mb-8 sm:mb-14 md:mb-20 gap-4 sm:gap-6">
          <p className="eyebrow max-w-[22ch]" data-hero-fade>
            <span className="dot" />
            Independent engineering studio — est. MMXX
          </p>
          <p
            className="hidden md:flex items-center gap-3 text-text-dim text-sm text-right leading-snug"
            data-hero-fade
          >
            <span className="inline-block h-px w-10 bg-text-mute" />
            Bangalore · Lisbon · shipping across 14 timezones
          </p>
        </div>

        {/* Kinetic headline */}
        <h1
          ref={headlineRef}
          className="kinetic font-[family-name:var(--font-display)] font-semibold leading-[0.92] tracking-tightest break-words [overflow-wrap:anywhere] max-w-full"
          style={{ fontSize: "clamp(2.25rem, 11vw, 12rem)" }}
        >
          <span className="word"><span>We design</span></span>{" "}
          <span className="word">
            <span className="italic font-normal text-text-dim">&amp;</span>
          </span>{" "}
          <span className="word"><span>engineer</span></span>
          <br />
          <span className="word"><span>the</span></span>{" "}
          <span className="word"><span>interfaces</span></span>{" "}
          <span className="word">
            <span className="italic font-normal text-text-dim">of</span>
          </span>
          <br />
          <span className="word"><span>tomorrow&apos;s</span></span>{" "}
          <span className="word"><span className="text-accent">software.</span></span>
        </h1>

        {/* Lead + CTA grid */}
        <div className="mt-8 sm:mt-14 md:mt-20 grid grid-cols-12 gap-6">
          <p
            className="col-span-12 md:col-span-5 text-base sm:text-lg md:text-xl text-text leading-relaxed"
            data-hero-rise
          >
            Kernel <span className="text-accent">&amp;</span> Oak is a 22-person studio
            building category-defining{" "}
            <em className="text-text-dim not-italic">apps</em>,{" "}
            <em className="text-text-dim not-italic">web platforms</em>, and{" "}
            <em className="text-text-dim not-italic">applied&nbsp;AI</em> for founders and
            enterprise teams who refuse to ship anything ordinary.
          </p>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-3" data-hero-rise>
              <Link
                href="#work"
                className="btn-ghost magnetic rounded-full px-5 sm:px-6 py-3 text-sm"
              >
                See selected work →
              </Link>
              <Link
                href="#contact"
                className="btn-primary magnetic rounded-full px-5 sm:px-6 py-3 text-sm font-medium"
              >
                Book intro call
              </Link>
            </div>
            <div className="eyebrow" data-hero-rise>
              Replies within 8 business hours · NDAs standard
            </div>
          </div>
        </div>

        {/* Stats rail */}
        <dl className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 md:gap-6 pt-6 border-t border-border">
          {[
            { v: "22", l: "Operators in-house" },
            { v: "47", l: "Products shipped" },
            { v: "$2.1B", l: "Portfolio valuation" },
            { v: "98", l: "Avg Lighthouse" },
          ].map((s) => (
            <div key={s.l} data-hero-stat className="min-w-0">
              <dt className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl tracking-tightest num whitespace-nowrap">
                {s.v}
              </dt>
              <dd className="eyebrow mt-1.5 min-h-[2.8em]">{s.l}</dd>
            </div>
          ))}
        </dl>

        {/* Scroll indicator */}
        <div
          className="mt-8 sm:mt-14 flex items-center justify-between pt-5 sm:pt-6 border-t border-border gap-4"
          data-hero-fade
        >
          <span className="eyebrow flex items-center gap-3 shrink-0">
            <Logo size={14} />
            <span>Scroll · 01 / 09</span>
          </span>
          <div className="hidden sm:flex items-center gap-2 text-text-mute text-xs font-[family-name:var(--font-mono)] min-w-0 truncate">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="truncate">latest: AURORA-TRADER launched · GA · 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
