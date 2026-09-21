"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/types";
import { locales, withLocale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";

  return (
    <div className="label-mono flex items-center gap-1 text-muted-foreground">
      {locales.map((candidate, index) => (
        <span key={candidate} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">/</span>}
          <Link
            href={withLocale(pathname, candidate)}
            aria-current={candidate === locale ? "true" : undefined}
            className={cn(
              "transition-colors hover:text-foreground",
              candidate === locale && "text-foreground"
            )}
          >
            {candidate.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
