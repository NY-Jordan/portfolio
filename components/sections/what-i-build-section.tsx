import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { Reveal } from "@/components/ui/reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function WhatIBuildSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-b border-border">
      <Container className="py-20 lg:py-28">
        <EyebrowLabel>{dict.home.whatIBuild.eyebrow}</EyebrowLabel>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.home.whatIBuild.title}
        </h2>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {dict.home.whatIBuild.pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05}>
              <div className="border-t border-border pt-5">
                <span className="label-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
