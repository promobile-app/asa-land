import type { Locale } from "@/i18n/routing";
import type { Content } from "./types";
import { en } from "./en";
import { ru } from "./ru";
import { uk } from "./uk";

const byLocale: Record<Locale, Content> = { en, ru, uk };

export function getContent(locale: Locale): Content {
  return byLocale[locale];
}

export type { Content } from "./types";
