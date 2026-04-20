import { ImageResponse } from "next/og";
import { CASES, getCase } from "@/lib/cases";

export const alt = "Kernel & Oak case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export default async function CaseOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCase(slug);
  const headline = c?.title ?? "Kernel & Oak case study";
  const client = c?.client ?? "Kernel & Oak Studio";
  const industry = c?.industry ?? "Engineering studio";
  const tag = c?.tags[0] ?? "Selected work";
  const caseNum = c?.n ?? "00";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0A",
          color: "#F5F1E8",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 12% 18%, rgba(201,163,106,0.30), transparent 48%), radial-gradient(circle at 88% 24%, rgba(124,139,111,0.35), transparent 50%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            position: "relative",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 20 Q12 12 5.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M12 20 Q12 12 18.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="20" r="2.2" fill="#C9A36A" />
            <circle cx="5.5" cy="7.5" r="1.5" fill="#C9A36A" />
            <circle cx="18.5" cy="7.5" r="1.5" fill="#C9A36A" />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", display: "flex", gap: 4 }}>
            <span>Kernel</span>
            <span style={{ color: "#C9A36A" }}>&amp;</span>
            <span>Oak</span>
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 15,
              color: "#A8A298",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {`Case · ${caseNum}`}
          </span>
        </div>

        <div
          style={{
            marginTop: 64,
            display: "flex",
            gap: 12,
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 16,
              padding: "8px 16px",
              border: "1px solid #3A362D",
              borderRadius: 999,
              color: "#F5F1E8",
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            {tag}
          </span>
          <span
            style={{
              fontSize: 16,
              padding: "8px 16px",
              border: "1px solid #3A362D",
              borderRadius: 999,
              color: "#A8A298",
              letterSpacing: "0.04em",
              display: "flex",
            }}
          >
            {industry}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.04,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              maxWidth: 1040,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              fontSize: 22,
              color: "#A8A298",
              borderTop: "1px solid #2A2720",
              paddingTop: 22,
            }}
          >
            <span style={{ color: "#F5F1E8" }}>{client}</span>
            <span style={{ marginLeft: "auto" }}>{`kernelandoak.vercel.app/work/${slug}`}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
