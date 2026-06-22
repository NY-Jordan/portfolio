"use client";

import { ScrollPanel } from "@/components/layout/scroll-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/components/providers/language-provider";
import { experience } from "@/lib/data/experience";

export function ExperienceSection() {
  const { t, lang } = useLanguage();

  return (
    <ScrollPanel id="experience">
      <AnimatedSection>
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />
      </AnimatedSection>

      <div className="mt-12 flex flex-col divide-y divide-border">
        {experience.map((item, index) => (
          <AnimatedSection key={item.company} delay={index * 0.06}>
            <div className="flex flex-col gap-4 py-7 sm:flex-row sm:gap-10">
              <div className="shrink-0 sm:w-44">
                <p className="font-mono text-sm text-muted-foreground">
                  {item.period[lang]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.location[lang]}
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-medium sm:text-xl">
                    {item.role[lang]}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {item.company}
                  </span>
                </div>

                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <li key={highlight[lang]} className="flex gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60" />
                      <span>{highlight[lang]}</span>
                    </li>
                  ))}
                </ul>

                <p className="pt-1 font-mono text-xs text-muted-foreground/70">
                  {item.technologies.join(" · ")}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </ScrollPanel>
  );
}
