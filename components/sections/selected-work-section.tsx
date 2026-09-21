import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { getFeaturedProjects } from "@/content/projects";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export function SelectedWorkSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const projects = getFeaturedProjects();

  return (
    <section className="border-b border-border">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <EyebrowLabel>{dict.home.selectedWork.eyebrow}</EyebrowLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.home.selectedWork.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/work`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {dict.home.selectedWork.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard
                project={project}
                locale={locale}
                statusLabels={dict.work.status}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
