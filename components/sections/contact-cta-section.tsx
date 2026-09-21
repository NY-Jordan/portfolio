import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export function ContactCtaSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section>
      <Container className="flex flex-col items-start gap-6 py-24 lg:py-32">
        <EyebrowLabel>{dict.home.contactCta.eyebrow}</EyebrowLabel>
        <h2 className="max-w-xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {dict.home.contactCta.title}
        </h2>
        <p className="max-w-lg text-base text-muted-foreground">
          {dict.home.contactCta.body}
        </p>
        <Button asChild size="lg">
          <Link href={`/${locale}/contact`}>{dict.home.contactCta.cta}</Link>
        </Button>
      </Container>
    </section>
  );
}
