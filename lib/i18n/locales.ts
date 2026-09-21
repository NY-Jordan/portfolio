import type { Locale } from "@/types";

export const locales: Locale[] = ["en", "fr"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Swaps the leading `/en` or `/fr` segment of a path, preserving the rest. */
export function withLocale(path: string, locale: Locale): string {
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}
