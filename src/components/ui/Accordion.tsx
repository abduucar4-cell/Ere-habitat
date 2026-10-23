"use client";

import * as A from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/content/types";

export function FaqAccordion({ items, headingLevel = 3 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <A.Root type="single" collapsible className="border-t border-line">
      {items.map((it, i) => (
        <A.Item key={it.q} value={`q${i}`} className="border-b border-line">
          <A.Header asChild>
            <H className="m-0">
              <A.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left font-display text-[1.15rem] font-medium text-ink md:text-[1.25rem]">
                {it.q}
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-ink group-data-[state=open]:rotate-45 group-data-[state=open]:border-ink group-data-[state=open]:bg-ink group-data-[state=open]:text-white">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </A.Trigger>
            </H>
          </A.Header>
          <A.Content className="overflow-hidden text-slate data-[state=closed]:animate-[collapse_300ms_ease-out] data-[state=open]:animate-[expand_400ms_var(--ease-out-soft)]">
            <p className="max-w-3xl pb-7 text-[1.02rem] leading-relaxed">{it.a}</p>
          </A.Content>
        </A.Item>
      ))}
    </A.Root>
  );
}
