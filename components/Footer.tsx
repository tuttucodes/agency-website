export function Footer() {
  return (
    <footer className="relative py-14 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-14">
          <div className="col-span-12 md:col-span-6">
            <p className="font-[family-name:var(--font-display)] text-[18vw] md:text-[13vw] leading-[0.82] tracking-tightest">
              HELIX
            </p>
          </div>
          <div className="col-span-6 md:col-span-3 text-sm space-y-2 text-text-dim">
            <p className="eyebrow mb-4">Studios</p>
            <p>Bangalore · 560008</p>
            <p>Lisbon · 1250-096</p>
          </div>
          <div className="col-span-6 md:col-span-3 text-sm space-y-2 text-text-dim">
            <p className="eyebrow mb-4">Follow</p>
            <p>
              <a
                href="https://read.cv"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                Read.cv
              </a>
            </p>
            <p>
              <a
                href="https://are.na"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                Are.na
              </a>
            </p>
            <p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                GitHub
              </a>
            </p>
            <p>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-sweep hover:text-text"
              >
                X / @helix
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-border text-xs text-text-mute font-[family-name:var(--font-mono)]">
          <span>© 2026 HELIX Studio Pvt. Ltd. · All rights reserved</span>
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
