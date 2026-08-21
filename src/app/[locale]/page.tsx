import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { getContent } from "@/content";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { Proof } from "@/components/sections/Proof";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { OneDataset } from "@/components/sections/OneDataset";
import { RankedEight } from "@/components/sections/RankedEight";
import { InTheBox } from "@/components/sections/InTheBox";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Footer } from "@/components/sections/Footer";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const c = getContent(locale);

  // The FAQ is written to be quoted, so let search engines quote it.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <WaitlistProvider copy={c.waitlist} locale={locale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Nav nav={c.nav} />

      <main>
        <Hero copy={c.hero} mock={c.mock} />
        <Proof copy={c.proof} locale={locale} />
        <TrustedBy copy={c.trusted} />
        <OneDataset copy={c.dataset} />
        <RankedEight copy={c.why} />
        <InTheBox copy={c.box} />
        <Pricing copy={c.pricing} locale={locale} />
        <Faq copy={c.faq} />
        <ClosingCta copy={c.cta} />
      </main>

      <Footer copy={c.footer} />
    </WaitlistProvider>
  );
}
