import type { Content, Tone } from "@/content/types";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/** Each source keeps one tone from the platform's own scale, so the same
    three colours can carry into diagrams elsewhere. */
const ACCENT: Record<Tone, string> = {
  brand: "var(--brand)",
  purple: "var(--purple)",
  ok: "var(--ok)",
  sky: "var(--sky)",
  warn: "var(--warn)",
};

export function OneDataset({ copy }: { copy: Content["dataset"] }) {
  return (
    <Section id="dataset">
      <Reveal>
        <div className="grid gap-3.5 mb-[42px] max-w-[70ch]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2">{copy.title}</h2>
          <div className="flex items-center gap-2.5 flex-wrap mt-1">
            {copy.funnel.map((step, i) => (
              <span key={step} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span className="text-tx-4 font-mono text-xs" aria-hidden="true">
                    →
                  </span>
                )}
                <span className="font-mono text-xs tracking-[0.1em] px-3 py-1.5 rounded-full border border-line bg-surface text-tx-2">
                  {step}
                </span>
              </span>
            ))}
            <span className="text-[13px] text-tx-4 ml-1">{copy.per}</span>
          </div>
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-3 gap-[18px] max-[900px]:grid-cols-1">
        {copy.sources.map((src) => (
          <StaggerItem key={src.kind} className="h-full">
            <article
              className="relative h-full grid content-start gap-3 rounded-card border border-line bg-surface p-[22px]"
              style={{ ["--accent" as string]: ACCENT[src.tone] }}
            >
              <span
                className="absolute left-[22px] right-[22px] -top-px h-0.5 rounded-sm"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="font-mono text-[10px] tracking-[0.12em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                {src.kind}
              </span>
              <h3 className="text-[1.0625rem] leading-tight text-tx">{src.title}</h3>
              <p className="text-sm text-tx-3 leading-normal">{src.claim}</p>

              {src.groups.map((g, gi) => (
                <div key={gi} className="contents">
                  {g.label && (
                    <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-tx-4 mt-1.5">
                      {g.label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-[9px] py-1 rounded-sm bg-surface-2 border border-line-soft text-tx-3"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.1}>
        <svg
          viewBox="0 0 1000 88"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block w-full h-[88px] max-[900px]:h-11"
        >
          <g fill="none" stroke="var(--line)" strokeWidth="1.25">
            <path d="M167 0 C167 52, 500 34, 500 84" />
            <path d="M500 0 L500 84" />
            <path d="M833 0 C833 52, 500 34, 500 84" />
          </g>
          <circle cx="500" cy="84" r="3.5" fill="var(--brand)" />
        </svg>

        <div className="mx-auto max-w-[340px] text-center rounded-card border border-brand bg-brand-tint px-[22px] py-[18px]">
          <div className="text-xl font-semibold tracking-[-0.02em]">
            {copy.node.title}
          </div>
          <div className="font-mono text-xs tracking-[0.06em] text-brand-soft mt-0.5">
            {copy.node.sub}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
