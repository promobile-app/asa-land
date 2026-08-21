"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABEL: Record<Locale, string> = { en: "EN", ru: "RU", uk: "UA" };

export function LangSwitch({ groupLabel }: { groupLabel: string }) {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function pick(next: Locale) {
    if (next === active) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  return (
    <div
      role="group"
      aria-label={groupLabel}
      aria-busy={pending}
      className="flex rounded-sm border border-line overflow-hidden"
    >
      {routing.locales.map((l) => {
        const on = l === active;
        return (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            aria-pressed={on}
            lang={l}
            className={
              "font-mono text-[11px] font-medium tracking-[0.08em] px-[9px] py-1.5 " +
              "cursor-pointer transition-colors duration-150 max-[520px]:px-[7px] " +
              (on
                ? "bg-brand-tint text-brand-soft"
                : "text-tx-4 hover:text-tx-2")
            }
          >
            {LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
