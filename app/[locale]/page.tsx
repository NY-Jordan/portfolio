import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/hero-section";
import { SelectedWorkSection } from "@/components/sections/selected-work-section";
import { WhatIBuildSection } from "@/components/sections/what-i-build-section";
import { CurrentFocusSection } from "@/components/sections/current-focus-section";
import { WritingPreviewSection } from "@/components/sections/writing-preview-section";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizedAlternates } from "@/lib/seo/alternates";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: localizedAlternates("", locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <SelectedWorkSection locale={locale} dict={dict} />
      <WhatIBuildSection dict={dict} />
      <CurrentFocusSection locale={locale} dict={dict} />
      <WritingPreviewSection locale={locale} dict={dict} />
      <AboutPreviewSection locale={locale} dict={dict} />
      <ContactCtaSection locale={locale} dict={dict} />
    </>
  );
}
