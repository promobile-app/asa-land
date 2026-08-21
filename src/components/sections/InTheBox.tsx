import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/** Tiles, deliberately: two hairline lists back to back would read the same. */
export function InTheBox({ copy }: { copy: Content["box"] }) {
  return (
    <Section id="product">
      <Reveal>
        <div className="grid gap-3.5 mb-[42px] max-w-[70ch]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2">{copy.title}</h2>
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-2 gap-3.5 max-[840px]:grid-cols-1">
        {copy.items.map((item) => (
          <StaggerItem
            key={item.title}
            className={`h-full ${item.wide ? "col-span-2 max-[840px]:col-span-1" : ""}`}
          >
            <div className="h-full rounded-lg border border-line bg-surface px-[22px] py-5 transition-colors duration-150 hover:border-brand">
              <b className="block font-semibold text-[15px] text-tx mb-[5px] tracking-[-0.01em]">
                {item.title}
              </b>
              <p className="text-sm text-tx-3 leading-normal">{item.body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
