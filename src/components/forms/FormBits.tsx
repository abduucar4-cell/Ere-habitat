import Link from "next/link";
import { Lock } from "lucide-react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { site } from "@/lib/site";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Champ piège invisible pour les robots. */
export function Honeypot({ register }: { register: UseFormRegister<any> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Ne pas remplir
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </label>
    </div>
  );
}

export function ConsentFields({ register, errors, idPrefix }: { register: UseFormRegister<any>; errors: FieldErrors; idPrefix: string }) {
  const err = errors.consent?.message as string | undefined;
  return (
    <div className="space-y-3 text-[0.88rem] leading-relaxed text-slate">
      <div className="flex gap-3">
        <input
          id={`${idPrefix}-consent`}
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-[var(--color-ink)]"
          aria-invalid={err ? "true" : "false"}
          aria-describedby={err ? `${idPrefix}-consent-error` : undefined}
          {...register("consent")}
        />
        <label htmlFor={`${idPrefix}-consent`}>
          J&apos;accepte que {site.name} utilise ces informations pour me recontacter au sujet de ma demande.{" "}
          <Link href="/politique-confidentialite/" className="text-leaf underline underline-offset-2">
            Politique de confidentialité
          </Link>
          <span className="text-[#b42318]" aria-hidden="true"> *</span>
        </label>
      </div>
      {err ? (
        <p id={`${idPrefix}-consent-error`} role="alert" className="text-sm text-[#b42318]">
          {err}
        </p>
      ) : null}
      <div className="flex gap-3">
        <input id={`${idPrefix}-marketing`} type="checkbox" className="mt-1 size-4 shrink-0 accent-[var(--color-ink)]" {...register("marketing")} />
        <label htmlFor={`${idPrefix}-marketing`}>J&apos;accepte de recevoir occasionnellement des informations de {site.name} (facultatif).</label>
      </div>
    </div>
  );
}

export function Reassurance() {
  return (
    <p className="flex items-center gap-2 text-[0.82rem] text-slate">
      <Lock className="size-3.5" aria-hidden="true" />
      Gratuit et sans engagement · Vos données ne sont jamais revendues
    </p>
  );
}

export function ServerError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-xl border border-[#f2c9c5] bg-[#fdf3f2] px-4 py-3 text-[0.95rem] text-[#8f1d14]">
      {message}{" "}
      <a href={site.contact.phoneHref} className="font-medium underline">
        {site.contact.phoneDisplay}
      </a>
    </div>
  );
}
