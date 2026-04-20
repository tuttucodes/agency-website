export function Testimonial() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="aurora opacity-40" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 text-center">
        <p className="eyebrow mb-8">
          <span className="dot" />Testimonial · Anya Morales, CPO @ Parallax
        </p>
        <blockquote className="font-[family-name:var(--font-display)] text-3xl md:text-5xl leading-[1.12] tracking-tight">
          &ldquo;We have shipped with five studios over twelve years. Kernel & Oak is the first that
          made our senior engineers ask us to hire them. The{" "}
          <em className="text-accent not-italic">craft</em> speaks for itself — the{" "}
          <em className="text-accent not-italic">candor</em> is rarer.&rdquo;
        </blockquote>
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-text-dim font-[family-name:var(--font-mono)]">
          <span className="h-px w-10 bg-border-hi" />
          <span>Shipped: Parallax v4 · 2025</span>
          <span className="h-px w-10 bg-border-hi" />
        </div>
      </div>
    </section>
  );
}
