import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tailles typographiques personnalisées (globals.css) — à ne pas confondre avec des couleurs.
const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-size": [{ text: ["display", "h2"] }] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Absolute URL from a site-relative path, always with a trailing slash for pages. */
export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ere-habitat.com").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
