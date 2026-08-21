"use client";

import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { links } from "@/lib/links";

export function Pricing({
  copy,
  locale,
}: {
  copy: Content["pricing"];
  locale: string;
}) {
  return (
    <Section id="pricing">
      <Reveal>
        <div className="grid gap-3.5 mb-[42px] max-w-[70ch]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2">{copy.title}</h2>
        </div>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="rounded-2xl border border-line bg-surface overflow-hidden shadow-[var(--shadow)]">
          <div className="grid grid-cols-[1.1fr_1fr] gap-8 p-9 items-center border-b border-line max-[840px]:grid-cols-1 max-[840px]:p-[26px] max-[840px]:gap-6">
            <div>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <CountUp
                  to={copy.amount}
                  prefix="$"
                  locale={locale}
                  className="font-mono tnum text-[clamp(3rem,7vw,4.4rem)] font-semibold tracking-[-0.04em] leading-none"
                />
                <span className="text-base text-tx-3">{copy.per}</span>
              </div>
              <p className="mt-2.5 text-[1.0625rem] text-tx-2">
                {copy.plusPre} <b className="font-semibold text-tx">{copy.plusStrong}</b>{" "}
                {copy.plusPost}
              </p>
              <span className="mt-[18px] inline-flex items-center gap-2.5 font-mono text-xs tracking-[0.06em] text-ok bg-ok-bg rounded-full px-3 py-1.5">
                {copy.annual}
              </span>
            </div>

            <div className="grid">
              {copy.facts.map((f, i) => (
                <div
                  key={f.title}
                  className={
                    "py-3.5 " +
                    (i < copy.facts.length - 1 ? "border-b border-line-soft" : "")
                  }
                >
                  <b className="block text-[14.5px] font-semibold mb-[3px]">
                    {f.title}
                  </b>
                  <span className="text-[13.5px] text-tx-3">{f.body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-[18px] px-9 py-5 flex-wrap bg-surface-2 max-[840px]:px-[26px]">
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-tx-4">
              {copy.meta.map((m, i) => (
                <span key={m.label}>
                  {i > 0 && " · "}
                  {m.label}: <b className="text-tx-2 font-medium">{m.value}</b>
                </span>
              ))}
            </span>
            <Button href={links.bookDemo}>{copy.cta}</Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
