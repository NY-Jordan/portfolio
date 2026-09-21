import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { getAllProjects, getProjectBySlug } from "@/content/projects";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProjects().map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline[locale],
    alternates: { canonical: `/${locale}/work/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline[locale],
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const dict = getDictionary(locale);
  const w = dict.work;

  return (
    <Container className="py-16 lg:py-24">
      <Link
        href={`/${locale}/work`}
        className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {w.backToWork}
      </Link>

      <header className="mt-8 flex flex-col gap-6 border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className={project.status === "shipped" ? "border-accent/40 text-accent" : undefined}>
            {w.status[project.status]}
          </Tag>
          <Tag>{project.year}</Tag>
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            {project.tagline[locale]}
          </p>
        </div>
        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 text-sm text-foreground hover:text-accent"
              >
                {link.label}
                <ArrowUpRight className="size-4" />
              </a>
            ))}
          </div>
        )}
        {project.isPlaceholder && (
          <p className="label-mono border border-accent/30 bg-accent/5 px-4 py-3 text-accent">
            {w.placeholderNotice}
          </p>
        )}
      </header>

      {project.media.length > 0 && (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {project.media.map((item) => (
            <div
              key={item.src}
              className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-card"
            >
              <Image
                src={item.src}
                alt={item.alt[locale]}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-12">
          <Section title={w.overview}>
            <p>{project.overview[locale]}</p>
          </Section>
          <Section title={w.problem}>
            <p>{project.problem[locale]}</p>
          </Section>
          <Section title={w.solution}>
            <p>{project.solution[locale]}</p>
          </Section>
          <Section title={w.architecture}>
            <p>{project.architecture[locale]}</p>
          </Section>
          <Section title={w.keyDecisions}>
            <div className="flex flex-col gap-6">
              {project.keyDecisions.map((decision) => (
                <div key={decision.title[locale]}>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {decision.title[locale]}
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    {decision.detail[locale]}
                  </p>
                </div>
              ))}
            </div>
          </Section>
          <Section title={w.lessons}>
            <ul className="flex flex-col gap-3">
              {project.lessonsLearned.map((lesson) => (
                <li key={lesson[locale]} className="flex gap-3 text-muted-foreground">
                  <span className="text-accent">&mdash;</span>
                  <span>{lesson[locale]}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="flex flex-col gap-10">
          <div>
            <h3 className="label-mono text-muted-foreground">{w.role}</h3>
            <p className="mt-2 text-sm">{project.role[locale]}</p>
          </div>
          <div>
            <h3 className="label-mono text-muted-foreground">{w.technologies}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>
          <div>
            <h3 className="label-mono text-muted-foreground">{w.results}</h3>
            <div className="mt-3 flex flex-col gap-4">
              {project.results.map((result) => (
                <div key={result.label[locale]}>
                  <p className="text-sm font-medium">{result.label[locale]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {result.value[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="label-mono text-muted-foreground">{title}</h2>
      <div className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">
        {children}
      </div>
    </section>
  );
}
