"use client";

import type { Content } from "@/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { links } from "@/lib/links";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";

export function ClosingCta({ copy }: { copy: Content["cta"] }) {
  const waitlist = useWaitlist();

  return (
    <Section id="demo">
      <Reveal>
        <div
          className="rounded-2xl border border-line p-11 grid gap-5 justify-items-start max-[720px]:p-7"
          style={{
            background:
              "radial-gradient(120% 140% at 12% 0%, var(--brand-tint) 0%, transparent 62%), var(--surface)",
          }}
        >
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="h2 max-w-[20ch]">{copy.title}</h2>
          <p className="lede">{copy.lede}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <Button href={links.bookDemo}>{copy.primary}</Button>
            <Button variant="ghost" onClick={waitlist.open}>
              {copy.secondary}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
