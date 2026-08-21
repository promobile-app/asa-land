import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promobile.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${SITE}/${locale}`,
    changeFrequency: "weekly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE}/${l}`]),
      ),
    },
  }));
}
