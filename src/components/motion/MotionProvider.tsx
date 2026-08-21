"use client";

import { LazyMotion, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * `domAnimation` is the ~15kb feature set: animation, variants, exit and
 * gestures. `strict` makes `motion.div` throw, so every component has to use
 * `m.div` and the full bundle can never sneak back in.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
