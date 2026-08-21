import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RankVsInstalls } from "@/components/chart/RankVsInstalls";

export function Proof({ copy, locale }: { copy: Content["proof"]; locale: string }) {
  return (
    <Section id="proof">
      <Reveal>
        <p className="eyebrow mb-[22px]">{copy.eyebrow}</p>
        <h2 className="h2 max-w-[24ch]">{copy.title}</h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-[26px] rounded-card border border-line bg-surface shadow-[var(--shadow)] overflow-hidden">
          <div className="flex items-center gap-2.5 flex-wrap px-[18px] py-3.5 border-b border-line">
            <Chip dot>{copy.keyword}</Chip>
            <Chip>{copy.range}</Chip>
            <Chip>{copy.placement}</Chip>
            <span className="ml-auto flex gap-4 items-center">
              <Legend swatch="bg-brand">{copy.legendPaid}</Legend>
              <Legend line>{copy.legendRank}</Legend>
            </span>
          </div>

          <RankVsInstalls copy={copy} locale={locale} />

          <div className="flex flex-wrap items-center gap-y-2 gap-x-3.5 px-[18px] py-3 border-t border-line font-mono text-[11px] tracking-[0.06em] text-tx-4">
            <span>{copy.footA}</span>
            <span className="text-line max-[720px]:hidden">|</span>
            <span>{copy.footB}</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Chip({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-[7px] h-7 px-2.5 rounded-sm bg-surface-2 border border-line text-xs text-tx-2">
      {dot && <span className="w-[7px] h-[7px] rounded-full bg-brand shrink-0" />}
      {children}
    </span>
  );
}

function Legend({
  children,
  swatch,
  line,
}: {
  children: React.ReactNode;
  swatch?: string;
  line?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-[7px] text-xs text-tx-3">
      <i
        className={
          line
            ? "w-4 h-0.5 rounded-sm bg-rank inline-block shrink-0"
            : `w-3 h-3 rounded-[3px] inline-block shrink-0 ${swatch}`
        }
      />
      {children}
    </span>
  );
}
