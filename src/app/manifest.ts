import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ERE Habitat — Panneaux solaires et batteries",
    short_name: "ERE Habitat",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0c1726",
    lang: "fr",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
