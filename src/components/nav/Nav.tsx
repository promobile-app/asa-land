"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { LangSwitch } from "./LangSwitch";
import { ThemeSwitch } from "./ThemeSwitch";
import type { Content } from "@/content";
import { links } from "@/lib/links";

export function Nav({ nav }: { nav: Content["nav"] }) {
  const { scrollY } = useScroll();
  const [lifted, setLifted] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 8));

  return (
    <header
      className={
        "sticky top-0 z-50 border-b transition-colors duration-200 " +
        (lifted
          ? "border-line-soft bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-[12px] backdrop-saturate-150"
          : "border-transparent bg-transparent")
      }
    >
      <div className="wrap flex items-center gap-7 h-16 max-[520px]:gap-2.5">
        <a
          href="#top"
          className="flex items-center gap-2.5 no-underline font-semibold tracking-[-0.02em] text-tx"
        >
          <Logo className="w-[22px] h-[22px] shrink-0" />
          <span className="max-[430px]:hidden">promobile</span>
        </a>

        <nav className="flex gap-6 ml-3 max-[880px]:hidden">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-tx-3 no-underline transition-colors duration-150 hover:text-tx"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3.5 max-[520px]:gap-2">
          <LangSwitch groupLabel={nav.languageGroup} />
          <ThemeSwitch toLight={nav.themeToLight} toDark={nav.themeToDark} />
          <m.span initial={false}>
            <Button
              href={links.bookDemo}
              size="sm"
              className="max-[520px]:px-2.5 max-[520px]:text-xs"
            >
              {nav.bookDemo}
            </Button>
          </m.span>
        </div>
      </div>
    </header>
  );
}
