import type { Locale } from "@/types";
import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

const dictionaries = { en, fr };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
