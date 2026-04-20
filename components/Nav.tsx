"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#process", label: "Process" },
  { href: "/#studio", label: "Studio" },
  { href: "/journal", label: "Journal" },
  { href: "/#faq", label: "FAQ" },
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
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 md:px-10">
          <nav
            className={`mt-3 sm:mt-5 flex items-center justify-between rounded-full border border-border-hi/60 backdrop-blur-xl px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 transition-colors ${
              scrolled ? "bg-surface/80" : "bg-surface/50"
            }`}
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 min-h-11 text-text"
              aria-label="Kernel & Oak — home"
            >
              <Logo size={22} />
              <span className="font-[family-name:var(--font-display)] font-semibold text-[16px] sm:text-[17px] tracking-tight leading-none">
                Kernel<span className="text-accent mx-[2px]">&amp;</span>Oak
              </span>
            </Link>

            <ul className="hidden lg:flex items-center gap-7 text-[13px] text-text-dim">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-sweep hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle className="hidden sm:inline-block" />
              <Link
                href="/#contact"
                className="hidden sm:inline-flex magnetic btn-primary rounded-full px-4 md:px-5 py-2 md:py-2.5 text-[12px] md:text-[13px] font-medium items-center"
              >
                <span>Start a project</span>
                <span className="ml-1">→</span>
              </Link>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden relative h-11 w-11 rounded-full border border-border-hi/60 flex items-center justify-center text-text"
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
          className="absolute inset-0 bg-ink/70 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 w-full sm:w-[420px] bg-surface border-l border-border-hi flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 84px)" }}
        >
          <nav className="flex-1 px-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="eyebrow">
                <span className="dot" />
                Menu
              </p>
              <ThemeToggle />
            </div>
            <ul className="space-y-2">
              {LINKS.map((l, i) => (
                <li
                  key={l.href}
                  className="overflow-hidden"
                  style={{
                    transitionDelay: `${open ? 120 + i * 40 : 0}ms`,
                  }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block font-[family-name:var(--font-display)] text-5xl sm:text-6xl tracking-tightest leading-[0.95] py-2 transition-all duration-500 ${
                      open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${open ? 120 + i * 50 : 0}ms` }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="p-6 border-t border-border-hi"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
          >
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="btn-primary rounded-full w-full flex items-center justify-center gap-2 py-4 font-medium text-sm"
            >
              Start a project <span>→</span>
            </Link>
            <a
              href="mailto:hello@kernelandoak.com"
              className="block mt-4 text-center text-sm text-text-dim link-sweep"
            >
              hello@kernelandoak.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
