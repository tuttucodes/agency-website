import Image from "next/image";

const TEAM = [
  {
    name: "Ivy Okafor",
    role: "Co-founder · Principal Engineer",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop",
    alt: "Portrait of studio co-founder in soft lighting",
  },
  {
    name: "Rafael Cortez",
    role: "Co-founder · Design Director",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop",
    alt: "Portrait of studio co-founder in monochrome",
  },
  {
    name: "Mei Zhang",
    role: "Head of Applied AI",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
    alt: "Portrait of head of AI research",
  },
  {
    name: "Samir Dhillon",
    role: "Head of Engineering",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop",
    alt: "Portrait of head of engineering",
  },
];

export function Studio() {
  return (
    <section id="studio" className="relative py-28 md:py-40 border-t border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow"><span className="dot" />06 / Studio</p>
          </div>
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl tracking-tight leading-[0.98]">
              Twenty-two operators who would rather{" "}
              <span className="italic text-text-dim font-normal">ship</span> than pitch.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {TEAM.map((m) => (
            <figure key={m.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface rounded-sm">
                <Image
                  src={m.img}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[800ms]"
                />
              </div>
              <figcaption className="mt-4">
                <p className="font-[family-name:var(--font-display)] text-xl tracking-tight">
                  {m.name}
                </p>
                <p className="text-text-dim text-sm">{m.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
