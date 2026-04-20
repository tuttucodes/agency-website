import { ImageResponse } from "next/og";

export const alt = "Kernel & Oak — Applications · Web Systems · Applied AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
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
          padding: "72px",
          position: "relative",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 22%, rgba(201,163,106,0.35), transparent 48%), radial-gradient(circle at 82% 18%, rgba(124,139,111,0.40), transparent 52%), radial-gradient(circle at 60% 90%, rgba(42,30,21,0.55), transparent 60%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M12 20 Q12 12 5.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M12 20 Q12 12 18.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="12" cy="20" r="2.2" fill="#C9A36A" />
            <circle cx="5.5" cy="7.5" r="1.5" fill="#C9A36A" />
            <circle cx="18.5" cy="7.5" r="1.5" fill="#C9A36A" />
          </svg>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", display: "flex", gap: 4 }}>
            <span>Kernel</span>
            <span style={{ color: "#C9A36A" }}>&amp;</span>
            <span>Oak</span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 15,
              color: "#A8A298",
              letterSpacing: "0.20em",
              textTransform: "uppercase",
            }}
          >
            Independent engineering studio
          </div>
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
              fontSize: 96,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              maxWidth: 1040,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>We design &amp; engineer</div>
            <div style={{ display: "flex", gap: 16 }}>
              <span>the interfaces of</span>
              <span style={{ color: "#C9A36A" }}>tomorrow.</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              fontSize: 22,
              color: "#A8A298",
              borderTop: "1px solid #2A2720",
              paddingTop: 22,
            }}
          >
            <span>Applications</span>
            <span>·</span>
            <span>Web Systems</span>
            <span>·</span>
            <span>Applied AI</span>
            <span style={{ marginLeft: "auto", color: "#F5F1E8" }}>kernelandoak.vercel.app</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
