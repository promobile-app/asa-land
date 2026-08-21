"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/variants";

export function Faq({ copy }: { copy: Content["faq"] }) {
  // first one open: the Apple question is the one everybody arrives with
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq">
      <Reveal>
        <div className="grid gap-3.5 mb-[42px] max-w-[70ch]">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2">{copy.title}</h2>
        </div>
      </Reveal>

      <div className="grid max-w-[78ch]">
        {copy.items.map((item, i) => (
          <Item
            key={item.q}
            id={`${baseId}-${i}`}
            item={item}
            open={open === i}
            last={i === copy.items.length - 1}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}

function Item({
  id,
  item,
  open,
  last,
  onToggle,
}: {
  id: string;
  item: { q: string; a: string };
  open: boolean;
  last: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`border-t border-line-soft ${last ? "border-b" : ""}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="w-full text-left relative cursor-pointer pr-11 py-[22px] text-[1.0625rem] font-medium tracking-[-0.015em] text-tx transition-colors duration-150 hover:text-brand-hi"
        >
          {item.q}
          <Indicator open={open} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            role="region"
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.24, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pr-[60px] pb-6 text-[14.5px] leading-relaxed text-tx-3 max-w-[70ch]">
              {item.a}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** A plus that loses its vertical stroke rather than rotating into a bar. */
function Indicator({ open }: { open: boolean }) {
  const reduce = useReducedMotion();
  const stroke = open ? "var(--brand-soft)" : "var(--tx-3)";

  return (
    <span
      aria-hidden="true"
      className="absolute right-2 top-1/2 -mt-[6px] w-[11px] h-[11px] block"
    >
      <span
        className="absolute left-0 right-0 top-1/2 -mt-[0.75px] h-[1.5px] transition-colors duration-150"
        style={{ background: stroke }}
      />
      <m.span
        className="absolute top-0 bottom-0 left-1/2 -ml-[0.75px] w-[1.5px]"
        style={{ background: stroke }}
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: reduce ? 0.01 : 0.18, ease: EASE }}
      />
    </span>
  );
}
