"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./variants";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Fire every time it scrolls into view instead of only the first time. */
  repeat?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 16, repeat = false }: Props) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: !repeat, margin: "-15% 0px" }}
      transition={{ duration: reduce ? 0.01 : 0.42, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
