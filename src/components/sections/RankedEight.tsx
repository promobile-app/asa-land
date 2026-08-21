import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * The numbers stay because the brief fixes this order — it is a priority
 * ranking, so the index carries information. They are not decoration.
 */
export function RankedEight({ copy }: { copy: Content["why"] }) {
  return (
    <Section id="why">
      <Reveal>
        <div className="grid gap-3.5 mb-[42px] max-w-[70ch]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2">{copy.title}</h2>
        </div>
      </Reveal>

      <Stagger
        stagger={0.05}
        className="grid grid-cols-2 gap-x-12 max-[840px]:grid-cols-1 max-[840px]:gap-x-0"
      >
        {copy.items.map((item, i) => (
          <StaggerItem key={item.title}>
            <div className="grid grid-cols-[38px_1fr] gap-4 py-[22px] border-t border-line-soft">
              <span className="font-mono text-xs font-medium text-tx-4 pt-[3px] tracking-[0.04em] tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[1.0625rem] leading-tight mb-1.5">{item.title}</h3>
                <p className="text-[14.5px] text-tx-3 leading-normal">{item.body}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
