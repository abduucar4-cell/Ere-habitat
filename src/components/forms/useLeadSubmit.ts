"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/** Envoi d'une demande + redirection vers la page de remerciement. */
export function useLeadSubmit(formType: string) {
  const router = useRouter();
  const startedAt = useRef(0);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(values: Record<string, unknown>) {
    setServerError(null);
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, formType, startedAt: startedAt.current || Date.now() - 10_000 }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        track("lead_error", { formType, status: res.status });
        setServerError(data.error ?? "Une erreur est survenue. Merci de réessayer ou de nous appeler.");
        return;
      }
      track("lead_submit", { formType });
      router.push(`/merci/?demande=${formType}`);
    } catch {
      track("lead_error", { formType, status: 0 });
      setServerError("Connexion impossible. Vérifiez votre réseau ou appelez-nous.");
    }
  }

  return { submit, serverError };
}
