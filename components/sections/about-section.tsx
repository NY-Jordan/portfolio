"use client";

import { ScrollPanel } from "@/components/layout/scroll-panel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { AboutImage } from "@/components/shared/about-image";
import { ProfilePhoto } from "@/components/shared/profile-photo";
import { useLanguage } from "@/components/providers/language-provider";
import { interests } from "@/lib/data/interests";

export function AboutSection() {
  const { t, lang } = useLanguage();

  return (
    <ScrollPanel id="about">
      <AnimatedSection>
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="flex justify-center md:col-span-4 md:justify-start">
            <ProfilePhoto src="/images/about/profile.jpeg" alt={t.about.title} initials="Y" />
          </div>

          <div className="flex flex-col gap-10 md:col-span-8">
            <div className="flex flex-col gap-5 text-base text-muted-foreground sm:text-lg">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
            </div>

            <div>
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px w-6 bg-foreground/50" />
                {t.about.interestsLabel}
              </span>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-6">
                {interests.map((interest) => (
                  <div key={interest.slug} className="group flex flex-col gap-3">
                    <AboutImage
                      src={interest.image}
                      alt={interest.title[lang]}
                      icon={interest.icon}
                      title={interest.title[lang]}
                    />
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {interest.description[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </ScrollPanel>
  );
}
