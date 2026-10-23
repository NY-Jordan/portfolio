import type { TiptapDoc, TiptapNode } from "@/types";

const WORDS_PER_MINUTE = 200;

function extractText(node: TiptapNode): string {
  if (node.type === "codeBlock") return "";
  if (node.type === "text") return node.text ?? "";
  return (node.content ?? []).map(extractText).join(" ");
}

/** Word count / wpm, mirroring the previous markdown-based estimate. */
export function estimateReadingMinutes(doc: TiptapDoc): number {
  const words = doc.content
    .map(extractText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
