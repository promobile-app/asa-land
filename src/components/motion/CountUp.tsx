"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Locale for grouping separators — pass the page locale, not the browser's. */
  locale?: string;
};

export function CountUp({ to, prefix = "", suffix = "", className, locale = "en" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();

  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 90, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (inView) raw.set(to);
  }, [inView, raw, to]);

  useEffect(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.textContent = prefix + to.toLocaleString(locale) + suffix;
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(v).toLocaleString(locale) + suffix;
      }
    });
  }, [spring, prefix, suffix, reduce, to, locale]);

  // `tnum` keeps the width steady while the digits run
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
