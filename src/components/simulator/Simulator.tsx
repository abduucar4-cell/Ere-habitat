"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Building2, Check, Home, Store, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { simulatorLeadSchema } from "@/lib/lead-schema";
import {
  DEFAULT_ASSUMPTIONS,
  ORIENTATION_LABEL,
  formatKwh,
  formatNumber,
  isNormandy,
  simulate,
  type Assumptions,
  type Housing,
  type Orientation,
  type ProjectType,
} from "@/lib/simulator";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { ConsentFields, Honeypot, Reassurance, ServerError } from "@/components/forms/FormBits";
import { useLeadSubmit } from "@/components/forms/useLeadSubmit";

const STEPS = ["Localisation", "Logement", "Consommation", "Équipement", "Projet", "Précisions", "Estimation"] as const;

type State = {
  postalCode: string;
  housing: Housing | "";
  consumptionMode: "bill" | "kwh";
  monthlyBill: string;
  annualKwh: string;
  hasPanels: "oui" | "non" | "";
  project: ProjectType | "";
  orientation: Orientation;
  existingPowerKwc: string;
};

const INITIAL: State = {
  postalCode: "",
  housing: "",
  consumptionMode: "bill",
  monthlyBill: "",
  annualKwh: "",
  hasPanels: "",
  project: "",
  orientation: "sud",
  existingPowerKwc: "",
};

const num = (s: string) => {
  const n = Number(s.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
};
const fmt = (n: number, d = 1) => formatNumber(n, d);

/* ------------------------------ Choix visuels ------------------------------ */
function Choice({
  name,
  value,
  checked,
  onChange,
  title,
  desc,
  icon,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-300",
        "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ink/15",
        checked ? "border-ink bg-white shadow-[0_12px_32px_-20px_rgba(12,23,38,0.5)]" : "border-line-strong bg-white hover:border-ink-600",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {icon ? <span className={cn("mt-0.5 transition-colors", checked ? "text-ink" : "text-slate")}>{icon}</span> : null}
      <span className="flex-1">
        <span className="block font-display text-[1.08rem] font-medium text-ink">{title}</span>
        {desc ? <span className="mt-1 block text-[0.9rem] text-slate">{desc}</span> : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          checked ? "border-ink bg-ink text-white" : "border-line-strong",
        )}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
    </label>
  );
}

/* ------------------------------ Simulateur ------------------------------ */
export function Simulator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [assumptions, setAssumptions] = useState<Assumptions>(DEFAULT_ASSUMPTIONS);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const uid = useId();

  const set = <K extends keyof State>(k: K, v: State[K]) => {
    setS((prev) => ({ ...prev, [k]: v }));
    setError(null);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeading.current?.focus();
    track("simulator_step", { step: step + 1, name: STEPS[step] ?? "" });
    if (step === STEPS.length - 1) track("simulator_complete", { project: s.project });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- suivi uniquement au changement d'étape
  }, [step]);

  function validate(): string | null {
    switch (step) {
      case 0:
        return /^\d{5}$/.test(s.postalCode.trim()) ? null : "Indiquez un code postal à 5 chiffres.";
      case 1:
        return s.housing ? null : "Choisissez votre type de logement.";
      case 2: {
        const v = s.consumptionMode === "bill" ? num(s.monthlyBill) : num(s.annualKwh);
        if (s.consumptionMode === "bill" && (v < 10 || v > 2000)) return "Indiquez une facture mensuelle entre 10 et 2 000 €.";
        if (s.consumptionMode === "kwh" && (v < 500 || v > 100000)) return "Indiquez une consommation annuelle entre 500 et 100 000 kWh.";
        return null;
      }
      case 3:
        return s.hasPanels ? null : "Indiquez si vous avez déjà des panneaux.";
      case 4:
        return s.project ? null : "Choisissez le projet recherché.";
      default:
        return null;
    }
  }

  const next = () => {
    const e = validate();
    if (e) return setError(e);
    setStep((x) => Math.min(x + 1, STEPS.length - 1));
  };
  const prev = () => {
    setError(null);
    setStep((x) => Math.max(x - 1, 0));
  };

  const result = useMemo(() => {
    if (step < STEPS.length - 1 || !s.housing || !s.project) return null;
    return simulate(
      {
        postalCode: s.postalCode,
        housing: s.housing,
        consumptionMode: s.consumptionMode,
        monthlyBill: num(s.monthlyBill),
        annualKwh: num(s.annualKwh),
        hasPanels: s.hasPanels === "oui",
        existingPowerKwc: num(s.existingPowerKwc) || undefined,
        project: s.project,
        orientation: s.orientation,
      },
      assumptions,
    );
  }, [step, s, assumptions]);

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className={cn("grid overflow-hidden rounded-[20px] border border-line bg-white", !compact && "lg:grid-cols-[260px_1fr]")}>
      {/* Progression */}
      <aside className={cn("border-b border-line bg-paper p-6", !compact && "lg:border-r lg:border-b-0 lg:p-8")}>
        <p className="eyebrow">
          Étape {step + 1} / {STEPS.length}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-line lg:hidden" aria-hidden="true">
          <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <ol className={cn("mt-6 hidden space-y-1", !compact && "lg:block")}>
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg py-2 text-[0.95rem] transition-colors",
                i === step ? "font-medium text-ink" : i < step ? "text-ink-700" : "text-slate",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full border font-mono text-[0.7rem]",
                  i < step ? "border-leaf bg-leaf text-white" : i === step ? "border-ink text-ink" : "border-line-strong",
                )}
              >
                {i < step ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : i + 1}
              </span>
              {label}
            </li>
          ))}
        </ol>
      </aside>

      {/* Contenu de l'étape */}
      <div className="p-6 md:p-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          noValidate
          aria-labelledby={`${uid}-h`}
          hidden={step === STEPS.length - 1}
        >
          <h3 id={`${uid}-h`} ref={stepHeading} tabIndex={-1} className="text-[1.6rem] leading-tight text-ink outline-none md:text-[1.9rem]">
            {
              [
                "Où se situe votre logement ?",
                "Quel type de logement ?",
                "Quelle est votre consommation ?",
                "Avez-vous déjà des panneaux solaires ?",
                "Quel projet recherchez-vous ?",
                "Quelques précisions utiles",
                "",
              ][step]
            }
          </h3>

          <div className="mt-8 min-h-[220px]">
            {step === 0 && (
              <div className="max-w-sm">
                <Field id={`${uid}-cp`} label="Code postal" required hint="Le Calvados est notre zone d'intervention prioritaire.">
                  <Input
                    id={`${uid}-cp`}
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    placeholder="14000"
                    value={s.postalCode}
                    onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, ""))}
                    aria-invalid={error ? "true" : "false"}
                  />
                </Field>
                {s.postalCode.length === 5 && !isNormandy(s.postalCode) ? (
                  <p className="mt-4 flex gap-2 text-[0.92rem] text-slate">
                    <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> Hors Normandie : vous pouvez poursuivre, nous vérifierons si nous
                    pouvons intervenir.
                  </p>
                ) : null}
              </div>
            )}

            {step === 1 && (
              <fieldset className="grid gap-3 sm:grid-cols-3">
                <legend className="sr-only">Type de logement</legend>
                <Choice name="housing" value="maison" checked={s.housing === "maison"} onChange={(v) => set("housing", v as Housing)} title="Maison" desc="Individuelle ou mitoyenne" icon={<Home className="size-6" />} />
                <Choice name="housing" value="appartement" checked={s.housing === "appartement"} onChange={(v) => set("housing", v as Housing)} title="Appartement" desc="En copropriété" icon={<Building2 className="size-6" />} />
                <Choice name="housing" value="local-pro" checked={s.housing === "local-pro"} onChange={(v) => set("housing", v as Housing)} title="Local pro" desc="Commerce, atelier, exploitation" icon={<Store className="size-6" />} />
              </fieldset>
            )}

            {step === 2 && (
              <div className="max-w-md">
                <div role="radiogroup" aria-label="Unité de saisie" className="inline-flex rounded-full border border-line-strong p-1">
                  {(
                    [
                      ["bill", "Facture €/mois"],
                      ["kwh", "Consommation kWh/an"],
                    ] as const
                  ).map(([v, l]) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={s.consumptionMode === v}
                      onClick={() => set("consumptionMode", v)}
                      className={cn(
                        "rounded-full px-4 py-2 text-[0.9rem] transition-colors",
                        s.consumptionMode === v ? "bg-ink text-white" : "text-ink-700 hover:text-ink",
                      )}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  {s.consumptionMode === "bill" ? (
                    <Field id={`${uid}-bill`} label="Facture d'électricité mensuelle moyenne (€)" required hint="Moyenne sur l'année, abonnement compris.">
                      <Input
                        id={`${uid}-bill`}
                        inputMode="decimal"
                        placeholder="120"
                        value={s.monthlyBill}
                        onChange={(e) => set("monthlyBill", e.target.value)}
                        aria-invalid={error ? "true" : "false"}
                      />
                    </Field>
                  ) : (
                    <Field id={`${uid}-kwh`} label="Consommation annuelle (kWh)" required hint="Indiquée sur votre facture ou votre espace Linky.">
                      <Input
                        id={`${uid}-kwh`}
                        inputMode="numeric"
                        placeholder="6500"
                        value={s.annualKwh}
                        onChange={(e) => set("annualKwh", e.target.value)}
                        aria-invalid={error ? "true" : "false"}
                      />
                    </Field>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <fieldset className="grid max-w-xl gap-3 sm:grid-cols-2">
                <legend className="sr-only">Panneaux déjà installés</legend>
                <Choice name="hasPanels" value="oui" checked={s.hasPanels === "oui"} onChange={() => set("hasPanels", "oui")} title="Oui" desc="J'ai déjà une installation" />
                <Choice name="hasPanels" value="non" checked={s.hasPanels === "non"} onChange={() => set("hasPanels", "non")} title="Non" desc="Pas encore équipé" />
              </fieldset>
            )}

            {step === 4 && (
              <fieldset className="grid gap-3 sm:grid-cols-2">
                <legend className="sr-only">Projet recherché</legend>
                {(
                  [
                    ["panneaux", "Panneaux uniquement", "Produire en journée"],
                    ["batterie", "Batterie uniquement", s.hasPanels === "oui" ? "Sur mon installation existante" : "Stocker de l'énergie"],
                    ["panneaux-batterie", "Panneaux + batterie", "Produire et stocker"],
                    ["conseil", "Je souhaite être conseillé", "Vous m'orientez"],
                  ] as const
                ).map(([v, t, d]) => (
                  <Choice key={v} name="project" value={v} checked={s.project === v} onChange={() => set("project", v)} title={t} desc={d} />
                ))}
              </fieldset>
            )}

            {step === 5 && (
              <div className="grid max-w-xl gap-6">
                {s.hasPanels === "oui" ? (
                  <Field id={`${uid}-kwc`} label="Puissance de votre installation (kWc)" hint="Indiquée sur votre contrat ou votre application de suivi.">
                    <Input id={`${uid}-kwc`} inputMode="decimal" placeholder="3" value={s.existingPowerKwc} onChange={(e) => set("existingPowerKwc", e.target.value)} />
                  </Field>
                ) : (
                  <fieldset>
                    <legend className="text-sm font-medium text-ink">Orientation principale de la toiture</legend>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {(Object.keys(ORIENTATION_LABEL) as Orientation[]).map((o) => (
                        <Choice key={o} name="orientation" value={o} checked={s.orientation === o} onChange={() => set("orientation", o)} title={ORIENTATION_LABEL[o]} />
                      ))}
                    </div>
                  </fieldset>
                )}
                <p className="flex gap-2 text-[0.92rem] text-slate">
                  <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Ces précisions sont facultatives : elles affinent l&apos;ordre de grandeur.
                </p>
              </div>
            )}
          </div>

          {error ? (
            <p role="alert" className="mt-2 text-[0.95rem] text-[#b42318]">
              {error}
            </p>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
            <Button type="button" variant="ghost" onClick={prev} disabled={step === 0} className={cn(step === 0 && "invisible")}>
              <ArrowLeft className="size-4" aria-hidden="true" /> Retour
            </Button>
            <Button type="submit">
              {step === 5 ? "Voir mon estimation" : "Continuer"} <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </form>

        {step === STEPS.length - 1 && result ? (
          <SimulatorResult
            headingRef={stepHeading}
            result={result}
            state={s}
            assumptions={assumptions}
            setAssumptions={setAssumptions}
            onBack={prev}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------ Résultat ------------------------------ */
function Metric({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2">
        <span className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-ink">{value}</span>
        {sub ? <span className="mt-1.5 block text-[0.85rem] text-slate">{sub}</span> : null}
      </dd>
    </div>
  );
}

const leadClient = simulatorLeadSchema.pick({ fullName: true, phone: true, email: true, postalCode: true, consent: true, marketing: true, website: true });
type LeadValues = z.input<typeof leadClient>;

function SimulatorResult({
  headingRef,
  result,
  state,
  assumptions,
  setAssumptions,
  onBack,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  result: ReturnType<typeof simulate>;
  state: State;
  assumptions: Assumptions;
  setAssumptions: (a: Assumptions) => void;
  onBack: () => void;
}) {
  const { submit, serverError } = useLeadSubmit("simulator");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadClient),
    defaultValues: { postalCode: state.postalCode, marketing: false },
    mode: "onTouched",
  });

  const summary = {
    "Code postal": state.postalCode,
    Logement: state.housing,
    "Consommation annuelle (kWh)": result.annualConsumptionKwh,
    "Source consommation": result.consumptionSource === "declaree" ? "déclarée" : "estimée depuis la facture",
    "Déjà équipé": state.hasPanels,
    "Puissance existante (kWc)": state.existingPowerKwc || null,
    Projet: state.project,
    Orientation: state.hasPanels === "oui" ? null : ORIENTATION_LABEL[state.orientation],
    "Puissance indicative (kWc)": result.recommendedPowerKwc,
    "Production estimée (kWh/an)": result.estimatedProductionKwh,
    "Batterie indicative (kWh)": result.recommendedBatteryKwh,
    "Hypothèse productible (kWh/kWc/an)": assumptions.specificYield,
    "Hypothèse prix kWh (€)": assumptions.pricePerKwh,
  };

  return (
    <div>
      <p className="eyebrow">Estimation indicative</p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-3 text-[1.6rem] leading-tight text-ink outline-none md:text-[1.9rem]">
        Voici l&apos;ordre de grandeur de votre projet
      </h3>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <Metric
          label="Consommation annuelle"
          value={formatKwh(result.annualConsumptionKwh)}
          sub={result.consumptionSource === "declaree" ? "Valeur déclarée" : `Estimée à partir de votre facture (${fmt(assumptions.pricePerKwh, 2)} €/kWh)`}
        />
        {result.recommendedPowerKwc ? (
          <Metric label="Puissance indicative" value={`${fmt(result.recommendedPowerKwc)} kWc`} sub="À confirmer par l'étude de toiture" />
        ) : null}
        {result.estimatedProductionKwh ? (
          <Metric
            label={state.hasPanels === "oui" ? "Production estimée de votre installation" : "Production annuelle estimée"}
            value={`≈ ${formatKwh(result.estimatedProductionKwh)}`}
            sub="Toiture sans ombrage majeur"
          />
        ) : null}
        {result.recommendedBatteryKwh ? (
          <Metric
            label="Capacité de batterie indicative"
            value={`${fmt(result.recommendedBatteryKwh)} kWh`}
            sub={`Consommation estimée du soir : ${fmt(result.dailyEveningKwh)} kWh/jour`}
          />
        ) : null}
      </dl>

      {result.notes.length ? (
        <ul className="mt-8 space-y-2 rounded-2xl bg-mist p-5 text-[0.93rem] text-ink-700">
          {result.notes.map((n) => (
            <li key={n} className="flex gap-2.5">
              <Info className="mt-0.5 size-4 shrink-0 text-slate" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      ) : null}

      <details className="group mt-6 rounded-2xl border border-line p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
          Hypothèses de calcul (modifiables)
          <span className="font-mono text-xs text-slate group-open:hidden">Afficher</span>
          <span className="hidden font-mono text-xs text-slate group-open:inline">Masquer</span>
        </summary>
        <div className="mt-5 grid gap-5 text-[0.92rem] text-slate sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-ink">
              Productible : <strong>{assumptions.specificYield} kWh/kWc/an</strong>
            </span>
            <input
              type="range"
              min={900}
              max={1200}
              step={10}
              value={assumptions.specificYield}
              onChange={(e) => setAssumptions({ ...assumptions, specificYield: Number(e.target.value) })}
              className="accent-[var(--color-ink)]"
            />
            <span>
              Ordre de grandeur pour le Calvados, toiture sud, selon l&apos;outil européen{" "}
              <a href="https://re.jrc.ec.europa.eu/pvg_tools/fr/" target="_blank" rel="noopener noreferrer" className="text-leaf underline">
                PVGIS
              </a>
              . Corrigé selon l&apos;orientation choisie.
            </span>
          </label>
          <label className="grid gap-2">
            <span className="text-ink">
              Prix moyen du kWh : <strong>{fmt(assumptions.pricePerKwh, 2)} €</strong>
            </span>
            <input
              type="range"
              min={0.15}
              max={0.4}
              step={0.01}
              value={assumptions.pricePerKwh}
              onChange={(e) => setAssumptions({ ...assumptions, pricePerKwh: Number(e.target.value) })}
              className="accent-[var(--color-ink)]"
            />
            <span>Abonnement compris. Sert uniquement à convertir une facture en kWh. Ajustez-le d&apos;après votre contrat.</span>
          </label>
          <p className="sm:col-span-2">
            Puissance : production visée égale à {Math.round(assumptions.productionShareNoBattery * 100)} % de la consommation sans batterie,{" "}
            {Math.round(assumptions.productionShareWithBattery * 100)} % avec batterie, arrondie à une puissance courante (3 à 9 kWc).
            Batterie : {Math.round(assumptions.eveningShare * 100)} % de la consommation quotidienne supposée le soir et la nuit, plafonnée par
            le surplus solaire, arrondie à une capacité courante (5 à 15 kWh).
          </p>
        </div>
      </details>

      <p className="mt-6 text-[0.85rem] leading-relaxed text-slate">
        Cette estimation est un ordre de grandeur destiné à préparer l&apos;étude. Elle ne constitue ni un devis, ni un engagement de
        production, d&apos;économie ou de rentabilité. Aucune aide financière n&apos;est prise en compte.
      </p>

      <div className="mt-10 rounded-2xl bg-ink p-6 text-white md:p-8">
        <h4 className="font-display text-[1.4rem] text-white">Recevoir une étude détaillée gratuite</h4>
        <p className="mt-2 text-white/75">Nous affinons cette estimation à partir de votre toiture et de vos relevés réels.</p>
        <form
          onSubmit={handleSubmit((v) => submit({ ...v, summary }))}
          noValidate
          className="relative mt-6 grid gap-4 [&_label]:text-white [&_.text-slate]:text-white/70 [&_a]:text-[#9fd8ae] [&_p[role=alert]]:text-[#ffb4ab]"
          aria-label="Demande d'étude détaillée"
        >
          <Honeypot register={register} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="sim-name" label="Prénom et nom" required error={errors.fullName?.message}>
              <Input autoComplete="name" id="sim-name" aria-invalid={errors.fullName ? "true" : "false"} {...register("fullName")} />
            </Field>
            <Field id="sim-phone" label="Téléphone" required error={errors.phone?.message}>
              <Input type="tel" autoComplete="tel" id="sim-phone" aria-invalid={errors.phone ? "true" : "false"} {...register("phone")} />
            </Field>
          </div>
          <Field id="sim-email" label="E-mail" error={errors.email?.message}>
            <Input type="email" autoComplete="email" id="sim-email" {...register("email")} />
          </Field>
          <input type="hidden" {...register("postalCode")} />
          <ConsentFields register={register} errors={errors} idPrefix="sim" />
          <ServerError message={serverError} />
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
              <ArrowLeft className="size-4" aria-hidden="true" /> Modifier mes réponses
            </Button>
            <Button type="submit" variant="sun" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Envoi…" : "Demander mon étude"} {!isSubmitting && <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </div>
          <div className="[&_p]:text-white/70">
            <Reassurance />
          </div>
        </form>
      </div>
    </div>
  );
}
