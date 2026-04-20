import { ImageResponse } from "next/og";
import { SERVICES, getService } from "@/lib/services";

export const alt = "Kernel & Oak service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ discipline: s.slug }));
}

const TONE_BG: Record<string, string> = {
  brass:
    "radial-gradient(circle at 18% 22%, rgba(201,163,106,0.45), transparent 50%), radial-gradient(circle at 82% 18%, rgba(124,139,111,0.22), transparent 55%)",
  sage:
    "radial-gradient(circle at 80% 18%, rgba(124,139,111,0.42), transparent 52%), radial-gradient(circle at 18% 82%, rgba(201,163,106,0.22), transparent 55%)",
  oak:
    "radial-gradient(circle at 50% 90%, rgba(42,30,21,0.65), transparent 60%), radial-gradient(circle at 20% 22%, rgba(201,163,106,0.28), transparent 50%)",
};

export default async function ServiceOG({
  params,
}: {
  params: Promise<{ discipline: string }>;
}) {
  const { discipline } = await params;
  const s = getService(discipline);
  const title = s?.title ?? "Kernel & Oak";
  const kicker = s?.kicker ?? "Engineering studio";
  const n = s?.n ?? "00";

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
            background: TONE_BG[s?.tone ?? "brass"],
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
            {`Service · ${n} of 03`}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 110,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              maxWidth: 1040,
            }}
          >
            {title}
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
            <span style={{ color: "#F5F1E8" }}>{kicker}</span>
            <span style={{ marginLeft: "auto" }}>{`kernelandoak.vercel.app/services/${discipline}`}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
