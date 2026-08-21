import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { JetBrains_Mono, Rubik } from "next/font/google";
import type { ReactNode } from "react";

import { routing, type Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { themeBootScript } from "@/lib/theme";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promobile.app";

/** BCP-47 tags for <html lang> and hreflang. Our route segment is "uk". */
const HTML_LANG: Record<Locale, string> = { en: "en", ru: "ru", uk: "uk" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const c = getContent(locale);

  return {
    metadataBase: new URL(SITE),
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries([
        ...routing.locales.map((l) => [HTML_LANG[l], `/${l}`]),
        ["x-default", `/${routing.defaultLocale}`],
      ]),
    },
    openGraph: {
      type: "website",
      url: `${SITE}/${locale}`,
      siteName: "Promobile",
      title: c.meta.title,
      description: c.meta.description,
      locale: HTML_LANG[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: c.meta.title,
      description: c.meta.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // opts this subtree into static rendering
  setRequestLocale(locale);

  return (
    <html lang={HTML_LANG[locale]} className={`${rubik.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {/* client components read the active locale from here */}
        <NextIntlClientProvider>
          <MotionProvider>{children}</MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
