import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { experience } from "@/lib/content/experience";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizedAlternates } from "@/lib/seo/alternates";

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
    title: dict.about.title,
    description: dict.about.paragraphs[0],
    alternates: localizedAlternates("/about", locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <Container className="py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <EyebrowLabel>{dict.about.eyebrow}</EyebrowLabel>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {dict.about.title}
          </h1>
          <div className="mt-8 flex max-w-2xl flex-col gap-5 text-base leading-relaxed text-muted-foreground">
            {dict.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-sm border border-border bg-card lg:justify-self-end">
          <Image
            src="/images/about/profile.jpeg"
            alt="Yvan Jordan Nguetse"
            fill
            sizes="(min-width: 1024px) 320px, 60vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mt-20 border-t border-border pt-12">
        <h2 className="label-mono text-muted-foreground">
          {dict.about.experienceTitle}
        </h2>
        <div className="mt-8 flex flex-col">
          {experience.map((item) => (
            <div
              key={`${item.company}-${item.period[locale]}`}
              className="grid gap-2 border-b border-border py-6 last:border-none sm:grid-cols-[1fr_2fr] sm:gap-8"
            >
              <div>
                <p className="label-mono text-muted-foreground">
                  {item.period[locale]}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {item.role[locale]} &middot; {item.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.location[locale]}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.summary[locale]}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="label-mono border border-border px-2 py-1 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
