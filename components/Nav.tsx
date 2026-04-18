"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
          <nav
            className={`mt-3 sm:mt-5 flex items-center justify-between rounded-full border border-border-hi/60 backdrop-blur-xl px-4 sm:px-5 md:px-7 py-2.5 sm:py-3 transition-colors ${
              scrolled ? "bg-black/70" : "bg-black/40"
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5 min-h-11" aria-label="HELIX — home">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 4 Q12 12 4 20" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
                <path d="M20 4 Q12 12 20 20" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="1.6" fill="#00FF88" />
              </svg>
              <span className="font-[family-name:var(--font-display)] font-semibold text-[16px] sm:text-[17px] tracking-tight">
                HELIX
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-8 text-[13px] text-text-dim">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-sweep hover:text-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden sm:inline-flex magnetic btn-primary rounded-full px-4 md:px-5 py-2 md:py-2.5 text-[12px] md:text-[13px] font-medium items-center"
              >
                <span>Start a project</span>
                <span className="ml-1">→</span>
              </a>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden relative h-11 w-11 rounded-full border border-border-hi/60 flex items-center justify-center"
              >
                <span
                  className={`block h-px w-5 bg-text transition-transform ${
                    open ? "translate-y-[3px] rotate-45" : "-translate-y-[3px]"
                  }`}
                />
                <span
                  className={`block h-px w-5 bg-text absolute transition-transform ${
                    open ? "-translate-y-[0px] -rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 w-full sm:w-[420px] bg-surface border-l border-border-hi flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 84px)" }}
        >
          <nav className="flex-1 px-6 overflow-y-auto">
            <p className="eyebrow mb-6">
              <span className="dot" />
              Menu
            </p>
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li
                  key={l.href}
                  className="overflow-hidden"
                  style={{
                    transitionDelay: `${open ? 120 + i * 40 : 0}ms`,
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block font-[family-name:var(--font-display)] text-5xl sm:text-6xl tracking-tightest leading-[0.95] py-2 transition-all duration-500 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${open ? 120 + i * 50 : 0}ms` }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="p-6 border-t border-border-hi"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-full w-full flex items-center justify-center gap-2 py-4 font-medium text-sm"
            >
              Start a project <span>→</span>
            </a>
            <a
              href="mailto:hello@helix.studio"
              className="block mt-4 text-center text-sm text-text-dim link-sweep"
            >
              hello@helix.studio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
