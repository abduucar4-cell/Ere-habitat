import { ImageResponse } from "next/og";

export const alt = "ERE Habitat — Panneaux solaires et batteries de stockage à Caen et dans le Calvados";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0c1726", color: "white", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            <div style={{ width: 14, height: 36, background: "#D7221F" }} />
            <div style={{ width: 14, height: 48, background: "#EB8235" }} />
            <div style={{ width: 14, height: 48, background: "#F4E70F" }} />
            <div style={{ width: 14, height: 36, background: "#009C6D" }} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>ERE Habitat</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Panneaux solaires et batteries de stockage à Caen et dans le Calvados
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>Étude personnalisée · Devis gratuit · Interlocuteur local</div>
        </div>
      </div>
    ),
    size,
  );
}
