import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy.
 * - Google Tag Manager n'est chargé qu'après consentement (voir components/consent).
 * - 'unsafe-inline' sur les scripts est requis par l'hydratation Next.js sans nonce.
 *   Pour durcir : passer à une CSP à nonce via proxy.ts (voir README).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // Redirections 301 : variantes d'URL fréquentes vers les pages canoniques.
    return [
      { source: "/devis", destination: "/devis-panneaux-solaires/", permanent: true },
      { source: "/batterie", destination: "/batterie-stockage-solaire/", permanent: true },
      { source: "/photovoltaique-caen", destination: "/panneaux-solaires-caen/", permanent: true },
      { source: "/realisations", destination: "/nos-realisations/", permanent: true },
      { source: "/qui-sommes-nous", destination: "/a-propos/", permanent: true },
    ];
  },
};

export default nextConfig;
