"use client";

import { ScrollPanel } from "@/components/layout/scroll-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { useLanguage } from "@/components/providers/language-provider";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <ScrollPanel id="projects">
      <AnimatedSection>
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />
      </AnimatedSection>

      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {projects.map((project, index) => (
          <AnimatedSection key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} index={index} />
          </AnimatedSection>
        ))}
      </div>
    </ScrollPanel>
  );
}
