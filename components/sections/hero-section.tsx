import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/sections/hero-visual";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export function HeroSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-border">
      <Container className="grid items-center gap-16 py-24 lg:grid-cols-[3fr_2fr] lg:py-32">
        <div className="flex flex-col gap-10">
          <p className="label-mono text-muted-foreground">
            NY-JORDAN // {dict.hero.eyebrow.toUpperCase()}
          </p>

          <div>
            <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {dict.hero.name}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground sm:text-2xl">
              {dict.hero.statement}
            </p>
          </div>

          <p className="max-w-xl text-base text-muted-foreground">
            {dict.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={`/${locale}/work`}>
                {dict.hero.ctaWork}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/writing`}>{dict.hero.ctaWriting}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={`/${locale}/contact`}>{dict.hero.ctaContact}</Link>
            </Button>
          </div>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
