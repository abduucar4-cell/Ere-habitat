import type { Block } from "@/content/types";
import { CtaBand } from "./CtaBand";
import { LazyDetailedLeadForm, LazyQuickLeadForm, LazySimulator } from "@/components/lazy";

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function blockHeading(b: Block): string | null {
  if (b.type === "cta") return null;
  if (b.type === "simulator") return b.h2 ?? null;
  return b.h2;
}

function H2({ children }: { children: string }) {
  return (
    <h2 id={slugify(children)} className="scroll-mt-28 text-[clamp(1.6rem,1.3rem+1vw,2.15rem)] leading-tight tracking-[-0.025em] text-ink">
      {children}
    </h2>
  );
}

export function RenderBlock({ block, defaultProject }: { block: Block; defaultProject?: string }) {
  switch (block.type) {
    case "prose":
      return (
        <section className="py-10 first:pt-0">
          <H2>{block.h2}</H2>
          <div className="prose-ere mt-6">
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {block.list ? (
              <ul>
                {block.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="py-10 first:pt-0">
          <H2>{block.h2}</H2>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.5fr_1fr]">
            <div className="prose-ere">
              {block.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="self-start rounded-[var(--radius-card)] bg-mist p-6">
              <p className="eyebrow text-ink">{block.aside.title}</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink-700">
                {block.aside.items.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-leaf-500" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
    case "specs":
      return (
        <section className="py-10 first:pt-0">
          <H2>{block.h2}</H2>
          {block.intro ? <p className="mt-4 max-w-2xl text-slate">{block.intro}</p> : null}
          <dl className="mt-6 border-t border-line">
            {block.rows.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="font-mono text-[0.75rem] tracking-[0.06em] text-ink uppercase sm:pt-1">{k}</dt>
                <dd className="text-ink-700">{v}</dd>
              </div>
            ))}
          </dl>
          {block.note ? <p className="mt-4 text-sm text-slate">{block.note}</p> : null}
        </section>
      );
    case "steps":
      return (
        <section className="py-10 first:pt-0">
          <H2>{block.h2}</H2>
          {block.intro ? <p className="mt-4 max-w-2xl text-slate">{block.intro}</p> : null}
          <ol className="relative mt-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-line-strong">
            {block.steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[32px_1fr] gap-5">
                <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-ink bg-white font-mono text-xs text-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-[1.15rem] text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-ink-700">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      );
    case "compare":
      return (
        <section className="py-10 first:pt-0">
          <H2>{block.h2}</H2>
          {block.intro ? <p className="mt-4 max-w-2xl text-slate">{block.intro}</p> : null}
          <div className="mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left text-[0.96rem]">
              <thead className="bg-mist">
                <tr>
                  <th scope="col" className="w-[24%] p-4 font-mono text-[0.72rem] font-normal tracking-[0.06em] text-slate uppercase">
                    <span className="sr-only">Critère</span>
                  </th>
                  <th scope="col" className="p-4 font-display text-[1.02rem] font-semibold text-ink">{block.columns[0]}</th>
                  <th scope="col" className="border-l border-line p-4 font-display text-[1.02rem] font-semibold text-ink">{block.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.label} className="border-t border-line align-top">
                    <th scope="row" className="p-4 font-mono text-[0.72rem] font-normal tracking-[0.06em] text-ink uppercase">
                      {r.label}
                    </th>
                    <td className="p-4 text-ink-700">{r.a}</td>
                    <td className="border-l border-line p-4 text-ink-700">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case "cta":
      return <CtaBand variant={block.variant} />;
    case "simulator":
      return (
        <section id="simulateur" className="py-10 first:pt-0">
          {block.h2 ? <H2>{block.h2}</H2> : null}
          <div className="mt-6">
            <LazySimulator compact />
          </div>
        </section>
      );
    case "leadForm":
      return (
        <section id="formulaire" className="scroll-mt-24 py-10 first:pt-0">
          <div className="rounded-[20px] border border-line bg-white p-6 shadow-[0_32px_64px_-48px_rgba(12,23,38,0.4)] md:p-10">
            <H2>{block.h2}</H2>
            {block.intro ? <p className="mt-3 mb-8 max-w-2xl text-slate">{block.intro}</p> : <div className="mb-8" />}
            {block.variant === "detailed" ? <LazyDetailedLeadForm defaultProject={defaultProject} /> : <LazyQuickLeadForm idPrefix="page" defaultProject={defaultProject} />}
          </div>
        </section>
      );
  }
}
