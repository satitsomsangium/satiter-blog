import { ImageResponse } from "next/og";

export const alt = "SATITER";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#2563eb",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em" }}>SATITER</div>
        <div style={{ marginTop: 24, fontSize: 32, fontWeight: 500, color: "#64748b" }}>Personal blog</div>
      </div>
    ),
    size,
  );
}
