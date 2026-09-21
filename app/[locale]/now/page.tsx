import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { nowItems, nowLastUpdated } from "@/lib/content/now";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.now.title,
    description: dict.now.intro,
    alternates: { canonical: `/${locale}/now` },
  };
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const lastUpdated = new Date(nowLastUpdated).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container className="py-20 lg:py-28">
      <EyebrowLabel>{dict.now.eyebrow}</EyebrowLabel>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.now.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {dict.now.intro}
      </p>
      <p className="label-mono mt-6 text-muted-foreground">
        {dict.now.lastUpdated}: <time dateTime={nowLastUpdated}>{lastUpdated}</time>
      </p>

      <ul className="mt-12 flex flex-col">
        {nowItems.map((item) => (
          <li
            key={item.detail[locale]}
            className="flex flex-col gap-1 border-b border-border py-6 last:border-none sm:flex-row sm:gap-6"
          >
            <span className="label-mono w-32 shrink-0 text-accent">
              {item.area[locale]}
            </span>
            <p className="text-base text-muted-foreground">{item.detail[locale]}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
