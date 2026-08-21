import type { Variants } from "motion/react";

export const EASE = [0.22, 0.75, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

export const staggerParent = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Reduced motion keeps the meaning (things appear) and drops the movement. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};
