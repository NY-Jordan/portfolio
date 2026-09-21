const WORDS_PER_MINUTE = 200;

/** Hand-rolled estimator (word count / wpm) — no dependency needed for this. */
export function estimateReadingMinutes(source: string): number {
  const words = source
    .replace(/```[\s\S]*?```/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
