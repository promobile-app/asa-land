import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";

/** Drawn but parked: the brief holds this back until there are client logos. */
export function TrustedBy({ copy }: { copy: Content["trusted"] }) {
  return (
    <Section tight>
      <div className="flex items-center gap-[26px] flex-wrap">
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-tx-4">
          {copy.label}
        </span>
        <span className="flex gap-3 flex-wrap flex-1 min-w-[240px]">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="h-[38px] flex-1 min-w-[92px] rounded-sm border border-dashed border-line bg-brand-tint-2"
            />
          ))}
        </span>
        <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-warn bg-warn-bg rounded-full px-2.5 py-1">
          {copy.parked}
        </span>
      </div>
    </Section>
  );
}
