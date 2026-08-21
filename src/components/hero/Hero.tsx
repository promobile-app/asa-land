"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useLocale } from "next-intl";
import type { Content } from "@/content";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/motion/variants";
import { links } from "@/lib/links";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";
import { DashboardLoop } from "./DashboardLoop";
import s from "./Hero.module.css";

type Props = {
  copy: Content["hero"];
  mock: Content["mock"];
};

export function Hero({ copy, mock }: Props) {
  const locale = useLocale();
  const waitlist = useWaitlist();
  const reduce = useReducedMotion();

  /**
   * One orchestrated entrance rather than seven separate delays: the parent
   * owns the timing, every child just says "I'm an item".
   */
  const parent = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduce ? 0 : 0.12,
        staggerChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const item = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.01 } } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <section className={s.hero} id="top">
      <DashboardLoop copy={mock} />
      <div className={s.scrim} aria-hidden="true" />
      <span className={s.caption}>{copy.loopCaption}</span>

      <m.div
        className={`wrap ${s.content}`}
        variants={parent}
        initial="hidden"
        animate="show"
      >
        <m.p variants={item} className="eyebrow">
          {copy.eyebrow}
        </m.p>

        {/* the headline is the one thing that changes with the language
            switch, so it gets a real exit animation of its own */}
        <AnimatePresence mode="wait" initial={false}>
          <m.h1
            key={locale}
            className={`h1 ${s.title}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.32, ease: EASE }}
          >
            {copy.title}
          </m.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={locale}
            className="lede"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.01 : 0.32, delay: 0.04, ease: EASE }}
          >
            {copy.subtitle}
          </m.p>
        </AnimatePresence>

        <m.div variants={item} className="flex flex-wrap gap-3 items-center">
          <Button href={links.bookDemo}>{copy.primary}</Button>
          <Button variant="ghost" onClick={waitlist.open}>
            {copy.secondary}
          </Button>
        </m.div>

        <m.div
          variants={item}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-[0.04em] text-tx-4"
        >
          {copy.facts.map((f, i) => (
            <span key={f.strong} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              <span>
                <b className="text-tx-2 font-medium">{f.strong}</b> {f.rest}
              </span>
            </span>
          ))}
        </m.div>
      </m.div>
    </section>
  );
}
