"use client";

import { ScrollPanel } from "@/components/layout/scroll-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AboutImage } from "@/components/shared/about-image";
import { useLanguage } from "@/components/providers/language-provider";
import { interests } from "@/lib/data/interests";

export function AboutSection() {
  const { t, lang } = useLanguage();

  return (
    <ScrollPanel id="about">
      <AnimatedSection>
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10">
        <div className="grid gap-8 text-base text-muted-foreground sm:text-lg md:grid-cols-2 md:gap-12">
          <p>{t.about.paragraph1}</p>
          <p>{t.about.paragraph2}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.18} className="mt-14">
        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-foreground/50" />
          {t.about.interestsLabel}
        </span>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {interests.map((interest) => (
            <div key={interest.slug} className="group flex flex-col gap-4">
              <AboutImage
                src={interest.image}
                alt={interest.title[lang]}
                icon={interest.icon}
              />
              <div>
                <h3 className="font-display text-lg font-medium">
                  {interest.title[lang]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {interest.description[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </ScrollPanel>
  );
}
