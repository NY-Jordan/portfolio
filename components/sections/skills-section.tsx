"use client";

import { ScrollPanel } from "@/components/layout/scroll-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { skillCategories, skills } from "@/lib/data/skills";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <ScrollPanel id="skills">
      <AnimatedSection>
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
        />
      </AnimatedSection>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {skillCategories.map((category, index) => (
          <AnimatedSection key={category} delay={index * 0.08}>
            <div className="flex flex-col gap-3 border-t border-border pt-4">
              <h3 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {t.skills.categories[category]}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <li key={skill.name} className="text-sm text-foreground">
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </ScrollPanel>
  );
}
