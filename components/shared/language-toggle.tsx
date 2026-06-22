"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";
import type { Lang } from "@/lib/i18n/translations";

const LANGUAGES: Lang[] = ["fr", "en"];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center rounded-full border border-border/60 p-0.5 text-xs font-medium">
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2 py-1 uppercase transition-colors",
            lang === code
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
