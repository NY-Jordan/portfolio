import type { Metadata } from "next";
import { locales, defaultLocale } from "@/lib/i18n/locales";
import type { Locale } from "@/types";

/**
 * Canonical + hreflang alternates for a route. `path` is locale-agnostic
 * (e.g. "" for home, "/about", "/writing/my-slug") — every public page must
 * build its `alternates` through this helper rather than setting
 * `{ canonical }` alone: Next.js metadata doesn't deep-merge `alternates`
 * between a layout and its page, so a page-level `alternates` object fully
 * replaces the root layout's `languages` map, silently dropping hreflang
 * tags on every route except "/".
 */
export function localizedAlternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
