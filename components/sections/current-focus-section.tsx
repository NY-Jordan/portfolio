import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { nowItems } from "@/lib/content/now";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export function CurrentFocusSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="border-b border-border">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <EyebrowLabel>{dict.home.currentFocus.eyebrow}</EyebrowLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.home.currentFocus.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/now`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {dict.home.currentFocus.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <ul className="mt-10 flex flex-col gap-6">
          {nowItems.slice(0, 3).map((item) => (
            <li
              key={item.detail[locale]}
              className="flex flex-col gap-1 border-b border-border pb-6 last:border-none sm:flex-row sm:gap-6"
            >
              <span className="label-mono w-32 shrink-0 text-accent">
                {item.area[locale]}
              </span>
              <p className="text-sm text-muted-foreground">
                {item.detail[locale]}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
