"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { CONSENT_KEY, readConsent, type Consent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";

const EVENT = "ere-consent-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function snapshot() {
  const c = readConsent();
  return c ? (c.analytics ? "granted" : "denied") : "none";
}

export function saveConsent(analytics: boolean) {
  const value: Consent = { analytics, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* stockage indisponible : le choix vaut pour la session */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function openConsent() {
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Bandeau cookies conforme aux recommandations CNIL :
 * « Refuser » aussi visible qu'« Accepter », aucun traceur avant consentement.
 */
export function ConsentBanner() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "ssr");

  const gtm = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {gtm && raw === "granted" ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm.replace(/[^A-Z0-9-]/gi, "")}');`}
        </Script>
      ) : null}
      {raw === "none" ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-[88px] z-50 mx-auto max-w-xl rounded-2xl border border-line bg-white p-5 shadow-[0_24px_64px_-24px_rgba(12,23,38,0.35)] sm:bottom-5 sm:left-5 sm:right-auto"
        >
          <h2 id="consent-title" className="font-display text-lg text-ink">
            Vos préférences de mesure d&apos;audience
          </h2>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-slate">
            Avec votre accord, nous mesurons la fréquentation du site et l&apos;efficacité de nos formulaires. Aucun cookie publicitaire.{" "}
            <Link href="/cookies/" className="text-leaf underline underline-offset-2">
              En savoir plus
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => saveConsent(false)}>
              Refuser
            </Button>
            <Button variant="primary" onClick={() => saveConsent(true)}>
              Accepter
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
