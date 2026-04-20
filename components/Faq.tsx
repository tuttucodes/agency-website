"use client";

import { useState } from "react";

type Item = { q: string; a: string };

const ITEMS: Item[] = [
  {
    q: "What does an engagement actually cost?",
    a: "Discovery is fixed at $18k and runs 2 weeks. Build engagements typically land between $85k and $480k depending on scope. We quote a single fixed price after Discovery — no hourly, no scope-creep tax. Retainers start at $24k/month.",
  },
  {
    q: "How fast can you start?",
    a: "We book one to two quarters out. For Q3 2026 starts, kickoff slots remain in late June and August. Urgent projects can usually be triaged within 10 business days if scope fits an existing pod.",
  },
  {
    q: "Do you work with pre-revenue startups?",
    a: "Selectively — we take 1 founder-stage project per quarter at reduced rates in exchange for a small equity grant. Default minimum is a funded seed or paying enterprise customer.",
  },
  {
    q: "Who actually does the work?",
    a: "The same senior engineers and designers who wrote the proposal. We do not subcontract, do not staff with juniors, and do not run an offshore back-office. Twenty-two operators, all named on the Studio page.",
  },
  {
    q: "How do you handle IP and confidentiality?",
    a: "All code, designs, and trained model weights belong to you on day one. Mutual NDAs are standard and signed before Discovery. SOC 2 Type II report and standard MSAs are available on request.",
  },
  {
    q: "Will you work in our codebase, or rebuild from scratch?",
    a: "Both. About 60% of engagements are greenfield, 40% are surgical work inside an existing repo. We audit the codebase during Discovery and recommend the path with the better risk/reward tradeoff — not the one that bills more hours.",
  },
  {
    q: "What happens after launch?",
    a: "We offer a 90-day stabilization retainer at 50% of build velocity, then transition to either a long-term retainer or a clean handoff to your in-house team. We document everything in your wiki and run a 2-week pairing period with whoever inherits the system.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-10 sm:mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />08 / Frequently Asked</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[0.98]">
              The questions{" "}
              <span className="italic text-text-dim font-normal">every</span> founder asks
              before signing.
            </h2>
          </div>
        </div>

        <ul className="border-y border-border-hi divide-y divide-border-hi">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-12 items-start gap-3 sm:gap-4 md:gap-6 py-6 md:py-8 text-left group hover:bg-surface-2/40 transition-colors px-2 sm:px-4 md:px-6"
                >
                  <span className="md:col-span-1 font-[family-name:var(--font-mono)] text-xs sm:text-sm text-text-mute pt-1.5 shrink-0">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <h3 className="md:col-span-10 font-[family-name:var(--font-display)] text-lg sm:text-2xl md:text-3xl tracking-tight leading-snug break-words [overflow-wrap:anywhere] min-w-0">
                    {item.q}
                  </h3>
                  <span
                    className={`md:col-span-1 justify-self-end pt-2 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "rotate-45 text-accent" : "text-text-dim"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M11 3 V19 M3 11 H19" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className="px-2 sm:px-4 md:px-6 overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="min-h-0 md:pl-[calc(8.333%_+_1.5rem)]">
                    <p className="pb-6 md:pb-8 max-w-[68ch] text-text-dim leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-sm text-text-dim">
          Something we didn&rsquo;t cover?{" "}
          <a href="mailto:hello@kernelandoak.com" className="link-sweep text-text">
            hello@kernelandoak.com
          </a>
        </div>
      </div>
    </section>
  );
}
