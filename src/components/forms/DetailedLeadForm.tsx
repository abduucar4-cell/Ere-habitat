"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { DELAYS, HOUSING_TYPES, PROJECT_TYPES, detailedLeadSchema } from "@/lib/lead-schema";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ConsentFields, Honeypot, Reassurance, ServerError } from "./FormBits";
import { useLeadSubmit } from "./useLeadSubmit";

const clientSchema = detailedLeadSchema.omit({ formType: true, startedAt: true });
type Values = z.input<typeof clientSchema>;

function Legend({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <legend className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.08em] text-slate uppercase">
      <span className="text-ink">{n}</span>
      <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
      {children}
    </legend>
  );
}

export function DetailedLeadForm({ defaultProject }: { defaultProject?: string }) {
  const { submit, serverError } = useLeadSubmit("detailed");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(clientSchema),
    defaultValues: { projectType: defaultProject ?? "", housing: "", delay: "", marketing: false },
    mode: "onTouched",
  });

  const id = (n: string) => `detailed-${n}`;
  const a11y = (n: keyof Values) => ({
    id: id(n),
    "aria-invalid": errors[n] ? ("true" as const) : ("false" as const),
    "aria-describedby": errors[n] ? `${id(n)}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit((v) => submit(v))} noValidate className="relative grid gap-10" aria-label="Demande de devis détaillée">
      <Honeypot register={register} />

      <fieldset className="grid gap-5">
        <Legend n="01">Vos coordonnées</Legend>
        <Field id={id("fullName")} label="Prénom et nom" required error={errors.fullName?.message}>
          <Input autoComplete="name" {...a11y("fullName")} {...register("fullName")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("phone")} label="Téléphone" required error={errors.phone?.message}>
            <Input type="tel" inputMode="tel" autoComplete="tel" {...a11y("phone")} {...register("phone")} />
          </Field>
          <Field id={id("email")} label="E-mail" required error={errors.email?.message}>
            <Input type="email" autoComplete="email" {...a11y("email")} {...register("email")} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
          <Field id={id("city")} label="Commune" required error={errors.city?.message}>
            <Input autoComplete="address-level2" {...a11y("city")} {...register("city")} />
          </Field>
          <Field id={id("postalCode")} label="Code postal" required error={errors.postalCode?.message}>
            <Input inputMode="numeric" autoComplete="postal-code" maxLength={5} {...a11y("postalCode")} {...register("postalCode")} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="grid gap-5">
        <Legend n="02">Votre logement</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("housing")} label="Type de logement" required error={errors.housing?.message}>
            <Select {...a11y("housing")} {...register("housing")}>
              <option value="" disabled>
                Sélectionnez…
              </option>
              {HOUSING_TYPES.map((h) => (
                <option key={h.value} value={h.value}>
                  {h.label}
                </option>
              ))}
            </Select>
          </Field>
          <fieldset aria-describedby={errors.hasPanels ? `${id("hasPanels")}-error` : undefined}>
            <legend className="text-sm font-medium text-ink">
              Panneaux déjà installés ?<span className="text-[#b42318]" aria-hidden="true"> *</span>
            </legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {(["oui", "non"] as const).map((v) => (
                <label
                  key={v}
                  className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-line-strong text-[0.98rem] capitalize transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ink/15"
                >
                  <input type="radio" value={v} className="sr-only" {...register("hasPanels")} />
                  {v}
                </label>
              ))}
            </div>
            {errors.hasPanels ? (
              <p id={`${id("hasPanels")}-error`} role="alert" className="mt-1.5 text-sm text-[#b42318]">
                {errors.hasPanels.message}
              </p>
            ) : null}
          </fieldset>
        </div>
        <Field
          id={id("consumption")}
          label="Consommation électrique"
          hint="En kWh par an ou en € par mois, si vous la connaissez"
          error={errors.consumption?.message}
        >
          <Input placeholder="Ex. 6 500 kWh/an ou 140 €/mois" {...a11y("consumption")} {...register("consumption")} />
        </Field>
      </fieldset>

      <fieldset className="grid gap-5">
        <Legend n="03">Votre projet</Legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("projectType")} label="Type de projet" required error={errors.projectType?.message}>
            <Select {...a11y("projectType")} {...register("projectType")}>
              <option value="" disabled>
                Sélectionnez…
              </option>
              {PROJECT_TYPES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id={id("delay")} label="Délai souhaité" required error={errors.delay?.message}>
            <Select {...a11y("delay")} {...register("delay")}>
              <option value="" disabled>
                Sélectionnez…
              </option>
              {DELAYS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field id={id("budget")} label="Budget indicatif" error={errors.budget?.message}>
          <Input {...a11y("budget")} {...register("budget")} />
        </Field>
        <Field id={id("message")} label="Informations complémentaires" error={errors.message?.message}>
          <Textarea
            rows={4}
            placeholder="Orientation du toit, chauffage, véhicule électrique, référence de votre onduleur…"
            {...a11y("message")}
            {...register("message")}
          />
        </Field>
      </fieldset>

      <div className="grid gap-5">
        <ConsentFields register={register} errors={errors} idPrefix="detailed" />
        <ServerError message={serverError} />
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto sm:justify-self-start">
          {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande de devis"}
          {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
        </Button>
        <Reassurance />
      </div>
    </form>
  );
}
