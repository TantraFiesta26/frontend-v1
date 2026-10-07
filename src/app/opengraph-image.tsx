import { ImageResponse } from "next/og";

export const alt = "TantraFiesta 2026 — IIIT Nagpur. On its way.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "70px 76px", background: "#241A4C", color: "#FFFF1A", border: "24px solid #FFFF1A", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 23, fontWeight: 700, letterSpacing: 5 }}>
        <span>IIIT NAGPUR</span><span>EDITION / 2026</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 102, fontWeight: 900, lineHeight: 0.94, letterSpacing: -5, color: "#FFFFFF" }}>TANTRA</div>
        <div style={{ fontSize: 102, fontWeight: 900, lineHeight: 0.94, letterSpacing: -5 }}>FIESTA</div>
        <div style={{ width: 520, height: 13, marginTop: 22, background: "#F44383", borderRadius: 20 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", color: "#FFFFFF", fontSize: 29, fontWeight: 700 }}>
        <span>ON ITS WAY...</span><span style={{ color: "#FFFF1A", fontSize: 18 }}>THE NATIONAL TECHNICAL FESTIVAL</span>
      </div>
    </div>,
    size,
  );
}
