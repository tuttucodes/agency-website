import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="relative py-14 md:py-20 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-16">
          <div className="col-span-12 md:col-span-7 flex items-center gap-6 md:gap-8">
            <Logo size={52} className="shrink-0" title="Kernel & Oak logomark" />
            <p className="font-[family-name:var(--font-display)] text-[16vw] md:text-[11vw] leading-[0.82] tracking-tightest">
              Kernel<span className="text-accent">&amp;</span>Oak
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 text-sm space-y-2 text-text-dim">
            <p className="eyebrow mb-4">Studios</p>
            <p>Bangalore · 560008</p>
            <p>Lisbon · 1250-096</p>
            <p className="pt-3">
              <a href="mailto:hello@kernelandoak.com" className="link-sweep text-text">
                hello@kernelandoak.com
              </a>
            </p>
          </div>
          <div className="col-span-6 md:col-span-2 text-sm space-y-2 text-text-dim">
            <p className="eyebrow mb-4">Follow</p>
            <p>
              <a
                href="https://read.cv/kernelandoak"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                Read.cv
              </a>
            </p>
            <p>
              <a
                href="https://are.na/kernelandoak"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                Are.na
              </a>
            </p>
            <p>
              <a
                href="https://github.com/kernelandoak"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                GitHub
              </a>
            </p>
            <p>
              <a
                href="https://x.com/kernelandoak"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                X / @kernelandoak
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border text-xs text-text-mute font-[family-name:var(--font-mono)]">
          <span>© 2026 Kernel &amp; Oak Studio Pvt. Ltd. · All rights reserved</span>
          <span>Crafted in-house. 100% hand-coded. No Webflow.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Accepting Q3 2026 projects
          </span>
        </div>
      </div>
    </footer>
  );
}
