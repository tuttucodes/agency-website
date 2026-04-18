"use client";
import { useEffect, useRef } from "react";

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const gsap = (await import("gsap")).default;
      if (!mounted) return;
      gsap.to(headlineRef.current?.querySelectorAll(".kinetic .word > span") || [], {
        y: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-40 pb-14">
      <div className="aurora" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="relative mx-auto max-w-[1600px] w-full px-6 md:px-10">
        <div className="flex items-start justify-between mb-16 md:mb-24 gap-6">
          <p className="eyebrow max-w-[22ch]">
            <span className="dot" />Independent engineering studio — est. MMXX
          </p>
          <p className="hidden md:block text-text-dim text-sm max-w-[30ch] text-right leading-snug">
            Based in Bangalore &amp; Lisbon.
            <br />
            Shipping worldwide across 14 timezones.
          </p>
        </div>

        <h1
          ref={headlineRef}
          className="kinetic font-[family-name:var(--font-display)] font-semibold text-[12.5vw] md:text-[9.5vw] leading-[0.92] tracking-tightest"
        >
          <span className="word"><span>We&nbsp;engineer</span></span>
          <br />
          <span className="word"><span>the&nbsp;</span></span>
          <span className="word"><span>interfaces</span></span>
          &nbsp;
          <span className="word">
            <span className="italic font-normal text-text-dim">of</span>
          </span>
          <br />
          <span className="word"><span>tomorrow&apos;s</span></span>
          &nbsp;
          <span className="word"><span className="text-accent">software.</span></span>
        </h1>

        <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6">
          <p className="col-span-12 md:col-span-5 text-lg md:text-xl text-text leading-relaxed">
            HELIX is a 22-person studio building category-defining{" "}
            <em className="text-text-dim not-italic">apps</em>,{" "}
            <em className="text-text-dim not-italic">web platforms</em>, and{" "}
            <em className="text-text-dim not-italic">applied&nbsp;AI</em> for founders and
            enterprise teams who refuse to ship anything ordinary.
          </p>
          <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col gap-5 md:items-end">
            <div className="flex flex-wrap gap-3">
              <a href="#work" className="btn-ghost magnetic rounded-full px-6 py-3 text-sm">
                See selected work →
              </a>
              <a
                href="#contact"
                className="btn-primary magnetic rounded-full px-6 py-3 text-sm font-medium"
              >
                Book intro call
              </a>
            </div>
            <div className="eyebrow">Replies within 8 business hours · NDAs standard</div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 flex items-center justify-between pt-6 border-t border-border">
          <span className="eyebrow">Scroll · 01 / 08</span>
          <div className="flex items-center gap-2 text-text-mute text-xs font-[family-name:var(--font-mono)]">
            <span className="block w-8 h-px bg-text-mute" />
            latest: AURORA-TRADER launched · GA · 2026
          </div>
        </div>
      </div>
    </section>
  );
}
