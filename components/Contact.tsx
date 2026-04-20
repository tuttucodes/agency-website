"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitLead, type LeadState } from "@/app/actions";
import { Turnstile } from "@/components/Turnstile";

const INITIAL: LeadState = { ok: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-primary magnetic rounded-full px-7 py-4 text-sm font-medium mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "Sending…" : "Send brief →"}
    </button>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(submitLead, INITIAL);
  const errs = state.fieldErrors ?? {};

  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 overflow-hidden border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />09 / Contact</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-[12vw] md:text-[9vw] leading-[0.88] tracking-tightest">
              Got a project
              <br />
              that deserves&nbsp;<span className="italic font-normal text-text-dim">real</span>
              <br />
              <span className="text-accent">engineering?</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 border-t border-border-hi pt-10">
          <div className="col-span-12 md:col-span-5 space-y-8">
            <div>
              <p className="eyebrow mb-3">Direct</p>
              <a
                href="mailto:hello@kernelandoak.com"
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight link-sweep"
              >
                hello@kernelandoak.com
              </a>
            </div>
            <div>
              <p className="eyebrow mb-3">Intro call</p>
              <a
                href="mailto:hello@kernelandoak.com?subject=Book%20a%2030-minute%20intro%20call&body=Hi%20Kernel%20%26%20Oak%20%E2%80%94%20I%27d%20like%20to%20book%20an%20intro%20call.%0A%0ACompany%3A%0AProject%20scope%3A%0ATimeline%3A%0A"
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-tight link-sweep"
              >
                Book 30 min →
              </a>
            </div>
            <div className="pt-6 border-t border-border-hi text-sm text-text-dim leading-relaxed max-w-[44ch]">
              Engagements start at <span className="text-text">$85k</span>. We take on 6 projects
              per year and book 2 quarters ahead. Budgets below{" "}
              <span className="text-text">$60k</span> — we&rsquo;ll happily recommend studios we
              love.
            </div>
          </div>

          <form action={formAction} className="col-span-12 md:col-span-7 space-y-5">
            {/* honeypot */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

            <div className="grid grid-cols-2 gap-5">
              <label className="block">
                <span className="eyebrow">Name</span>
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full bg-transparent border-b border-border-hi focus:border-accent transition-colors py-3 outline-none text-text placeholder:text-text-mute"
                  placeholder="Eve Callahan"
                />
                {errs.name && <span className="block mt-2 text-xs text-red-400">{errs.name}</span>}
              </label>
              <label className="block">
                <span className="eyebrow">Company</span>
                <input
                  type="text"
                  name="company"
                  autoComplete="organization"
                  className="mt-2 w-full bg-transparent border-b border-border-hi focus:border-accent transition-colors py-3 outline-none text-text placeholder:text-text-mute"
                  placeholder="Parallax Labs"
                />
              </label>
            </div>

            <label className="block">
              <span className="eyebrow">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="mt-2 w-full bg-transparent border-b border-border-hi focus:border-accent transition-colors py-3 outline-none text-text placeholder:text-text-mute"
                placeholder="eve@parallax.io"
              />
              {errs.email && <span className="block mt-2 text-xs text-red-400">{errs.email}</span>}
            </label>

            <div>
              <span className="eyebrow mb-3 block">Engagement type</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: "app", l: "Native App" },
                  { v: "web", l: "Web Platform" },
                  { v: "ai", l: "AI Systems" },
                  { v: "rebrand", l: "Full Rebuild" },
                ].map((c) => (
                  <label key={c.v} className="cursor-pointer">
                    <input type="checkbox" name="scope" value={c.v} className="peer sr-only" />
                    <span className="chip peer-checked:[&]:chip-checked peer-checked:bg-accent peer-checked:text-[var(--k-canvas-bg)] peer-checked:border-accent">
                      {c.l}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="eyebrow">Tell us about the work</span>
              <textarea
                name="brief"
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-border-hi focus:border-accent transition-colors py-3 outline-none text-text placeholder:text-text-mute resize-none"
                placeholder="What are you building, and who is it for?"
              />
            </label>

            <Turnstile />

            <SubmitButton />

            {state.message && (
              <p
                role={state.ok ? "status" : "alert"}
                aria-live="polite"
                className={`text-sm mt-3 ${state.ok ? "text-accent" : "text-red-400"}`}
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
