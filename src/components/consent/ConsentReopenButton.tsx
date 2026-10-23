"use client";

import { Button } from "@/components/ui/Button";
import { openConsent } from "./ConsentBanner";

export function ConsentReopenButton() {
  return (
    <Button variant="secondary" onClick={openConsent} className="not-prose">
      Modifier mes préférences
    </Button>
  );
}
