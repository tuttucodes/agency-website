import { CLIENTS } from "@/lib/clients";
import { ClientLogo } from "@/components/ClientLogo";

/**
 * Client logos marquee.
 *
 * The roster array is duplicated once so the CSS `translateX(-50%)`
 * keyframe creates a seamless loop: at the end of the animation the second
 * copy is in exactly the position the first started from.
 */
export function Marquee() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="relative border-y border-border overflow-hidden py-10 md:py-14"
    >
      <h2 id="clients-heading" className="sr-only">
        Selected clients and partners
      </h2>

      <p className="eyebrow text-center mb-6 md:mb-8">
        <span className="dot" />
        Trusted by teams across retail, banking, telecom, and real estate
      </p>

      <div
        className="marquee text-text-dim"
        style={{ gap: "clamp(2rem, 4vw, 4.5rem)" }}
      >
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            // Every other cell gets a thin divider so long strips of
            // wordmarks don't blur into one another.
            className="flex items-center gap-[clamp(2rem,4vw,4.5rem)]"
          >
            <ClientLogo client={c} />
            <span
              aria-hidden="true"
              className="h-6 md:h-7 w-px bg-border-hi/70"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
