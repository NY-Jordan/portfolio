import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/locales";

export default function LocaleNotFound() {
  // Not-found boundaries render without resolved route params, so fall back
  // to the default locale rather than leaving the page untranslated.
  const dict = getDictionary(defaultLocale);

  return (
    <Container className="flex flex-col items-start gap-6 py-32">
      <p className="label-mono text-accent">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {dict.common.notFoundTitle}
      </h1>
      <p className="max-w-md text-muted-foreground">{dict.common.notFoundBody}</p>
      <Button asChild>
        <Link href={`/${defaultLocale}`}>{dict.common.backHome}</Link>
      </Button>
    </Container>
  );
}
