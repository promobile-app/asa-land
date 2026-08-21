"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeOnly, fadeUp, staggerParent } from "./variants";

type ListProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

/** Parent: holds the timing. Children must be <StaggerItem>. */
export function Stagger({ children, className, stagger = 0.06 }: ListProps) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      variants={staggerParent(reduce ? 0 : stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div className={className} variants={reduce ? fadeOnly : fadeUp}>
      {children}
    </m.div>
  );
}
