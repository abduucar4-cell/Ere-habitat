"use client";

import dynamic from "next/dynamic";
import { LazyMount } from "@/components/ui/LazyMount";

const SimulatorImpl = dynamic(() => import("@/components/simulator/Simulator").then((m) => m.Simulator));
const QuickImpl = dynamic(() => import("@/components/forms/QuickLeadForm").then((m) => m.QuickLeadForm));
const DetailedImpl = dynamic(() => import("@/components/forms/DetailedLeadForm").then((m) => m.DetailedLeadForm));

export function LazySimulator(props: { compact?: boolean }) {
  return (
    <LazyMount minHeight={560} label="Chargement du simulateur">
      <SimulatorImpl {...props} />
    </LazyMount>
  );
}

export function LazyQuickLeadForm(props: { idPrefix?: string; defaultProject?: string }) {
  return (
    <LazyMount minHeight={640} label="Chargement du formulaire">
      <QuickImpl {...props} />
    </LazyMount>
  );
}

export function LazyDetailedLeadForm(props: { defaultProject?: string }) {
  return (
    <LazyMount minHeight={1200} label="Chargement du formulaire">
      <DetailedImpl {...props} />
    </LazyMount>
  );
}
