import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0B0B0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path d="M12 20 Q12 12 5.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12 20 Q12 12 18.5 7.5" stroke="#F5F1E8" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="20" r="2.2" fill="#C9A36A" />
          <circle cx="5.5" cy="7.5" r="1.5" fill="#C9A36A" />
          <circle cx="18.5" cy="7.5" r="1.5" fill="#C9A36A" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
