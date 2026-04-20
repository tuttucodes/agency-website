import { ImageResponse } from "next/og";
import { INSIGHTS, getInsight } from "@/lib/insights";

export const alt = "Kernel & Oak Journal essay";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return INSIGHTS.map((p) => ({ slug: p.slug }));
}

const FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default async function PostOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  const headline = post?.title ?? "Kernel & Oak Journal";
  const author = post?.author ?? "Kernel & Oak Studio";
  const category = post?.category ?? "Essay";
  const date = post ? FORMATTER.format(new Date(post.date)) : "";
  const mins = post?.readMins ?? 0;

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
              "radial-gradient(circle at 86% 14%, rgba(124,139,111,0.35), transparent 50%), radial-gradient(circle at 14% 86%, rgba(201,163,106,0.22), transparent 55%)",
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
            {`Journal · ${category}`}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 60,
              lineHeight: 1.06,
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
              gap: 16,
              alignItems: "center",
              fontSize: 22,
              color: "#A8A298",
              borderTop: "1px solid #2A2720",
              paddingTop: 22,
            }}
          >
            <span style={{ color: "#F5F1E8" }}>{author}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{`${mins} min read`}</span>
            <span style={{ marginLeft: "auto" }}>kernelandoak.vercel.app/journal</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
