const CLIENTS = [
  "Stripe", "Notion", "Perplexity", "Ramp", "Vercel",
  "Figma", "Linear", "Anthropic", "OpenAI", "Arc",
];

export function Marquee() {
  return (
    <section className="py-10 border-y border-border overflow-hidden">
      <div className="marquee font-[family-name:var(--font-display)] text-5xl md:text-6xl text-text-dim whitespace-nowrap">
        {[...CLIENTS, ...CLIENTS].map((name, i) => (
          <span key={i} aria-hidden={i >= CLIENTS.length || undefined}>
            {name}&nbsp;/
          </span>
        ))}
      </div>
    </section>
  );
}
