"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { PROJECT_TYPES, quickLeadSchema } from "@/lib/lead-schema";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ConsentFields, Honeypot, Reassurance, ServerError } from "./FormBits";
import { useLeadSubmit } from "./useLeadSubmit";

const clientSchema = quickLeadSchema.omit({ formType: true, startedAt: true });
type Values = z.input<typeof clientSchema>;

export function QuickLeadForm({ idPrefix = "quick", defaultProject }: { idPrefix?: string; defaultProject?: string }) {
  const { submit, serverError } = useLeadSubmit("quick");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(clientSchema),
    defaultValues: { projectType: defaultProject ?? "", marketing: false },
    mode: "onTouched",
  });

  const id = (n: string) => `${idPrefix}-${n}`;
  const a11y = (n: keyof Values) => ({
    id: id(n),
    "aria-invalid": errors[n] ? ("true" as const) : ("false" as const),
    "aria-describedby": errors[n] ? `${id(n)}-error` : undefined,
  });

  return (
    <form onSubmit={handleSubmit((v) => submit(v))} noValidate className="relative grid gap-5" aria-label="Demande de rappel rapide">
      <Honeypot register={register} />
      <Field id={id("fullName")} label="Prénom et nom" required error={errors.fullName?.message}>
        <Input autoComplete="name" {...a11y("fullName")} {...register("fullName")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("phone")} label="Téléphone" required error={errors.phone?.message}>
          <Input type="tel" inputMode="tel" autoComplete="tel" {...a11y("phone")} {...register("phone")} />
        </Field>
        <Field id={id("postalCode")} label="Code postal" required error={errors.postalCode?.message}>
          <Input inputMode="numeric" autoComplete="postal-code" maxLength={5} {...a11y("postalCode")} {...register("postalCode")} />
        </Field>
      </div>
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
      <Field id={id("message")} label="Message" error={errors.message?.message}>
        <Textarea rows={3} {...a11y("message")} {...register("message")} />
      </Field>
      <ConsentFields register={register} errors={errors} idPrefix={idPrefix} />
      <ServerError message={serverError} />
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Envoi en cours…" : "Être rappelé"}
        {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
      </Button>
      <Reassurance />
    </form>
  );
}
