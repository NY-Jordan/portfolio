import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { ProjectCard } from "@/components/work/project-card";
import { getAllProjects } from "@/content/projects";
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
    title: dict.work.title,
    description: dict.work.intro,
    alternates: localizedAlternates("/work", locale),
  };
}

export default async function WorkIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const projects = getAllProjects();

  return (
    <Container className="py-20 lg:py-28">
      <EyebrowLabel>{dict.work.eyebrow}</EyebrowLabel>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.work.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {dict.work.intro}
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            statusLabels={dict.work.status}
          />
        ))}
      </div>
    </Container>
  );
}
