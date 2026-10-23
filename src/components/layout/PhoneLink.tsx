"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

/** Lien téléphone avec mesure du clic (après consentement). */
export function PhoneLink({ children, className, location }: { children: ReactNode; className?: string; location: string }) {
  return (
    <a href={site.contact.phoneHref} className={className} onClick={() => track("phone_click", { location })}>
      {children}
    </a>
  );
}
