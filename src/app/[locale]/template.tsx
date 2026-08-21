"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/components/motion/variants";

/**
 * template.tsx remounts on every navigation, which is what gives us the
 * enter half of a route transition for free.
 *
 * The exit half is deliberately absent: the App Router does not keep the
 * outgoing tree around, and the FrozenRouter workarounds that fake it break
 * on every Next minor. Local exits that matter — the hero headline swapping
 * language — are done with AnimatePresence inside the component that owns
 * them, where it works properly.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <m.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.24, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
