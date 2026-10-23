"use client";

import { openConsent } from "./ConsentBanner";

export function ConsentReopen() {
  return (
    <button type="button" onClick={openConsent} className="hover:text-white">
      Gérer les cookies
    </button>
  );
}
