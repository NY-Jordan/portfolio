import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { socialLinks } from "@/lib/content/social";
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
    title: dict.contact.title,
    description: dict.contact.intro,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <Container className="py-20 lg:py-28">
      <EyebrowLabel>{dict.contact.eyebrow}</EyebrowLabel>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.contact.title}
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        {dict.contact.intro}
      </p>

      <div className="mt-14 flex flex-col">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
            className="group flex items-center justify-between gap-4 border-b border-border py-6 first:border-t"
          >
            <div>
              <p className="label-mono text-muted-foreground">{link.label}</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-tight group-hover:text-accent">
                {link.handle ?? link.href}
              </p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" />
          </a>
        ))}
      </div>
    </Container>
  );
}
