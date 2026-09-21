import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export function AboutPreviewSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-border">
      <Container className="grid gap-8 py-20 lg:grid-cols-3 lg:gap-16 lg:py-28">
        <div>
          <EyebrowLabel>{dict.home.aboutPreview.eyebrow}</EyebrowLabel>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {dict.home.aboutPreview.title}
          </h2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <p className="max-w-2xl text-base text-muted-foreground">
            {dict.home.aboutPreview.body}
          </p>
          <Link
            href={`/${locale}/about`}
            className="flex w-fit items-center gap-1 text-sm text-foreground hover:text-accent"
          >
            {dict.home.aboutPreview.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
