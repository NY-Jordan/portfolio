import GithubSlugger from "github-slugger";
import type { TiptapDoc, TiptapNode } from "@/types";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

function headingText(node: TiptapNode): string {
  return (node.content ?? [])
    .map((child) => (child.type === "text" ? child.text ?? "" : headingText(child)))
    .join("");
}

function walk(node: TiptapNode, slugger: GithubSlugger, toc: TocEntry[]): TiptapNode {
  if (node.type === "heading") {
    const level = Number(node.attrs?.level ?? 1);
    if (level === 2 || level === 3) {
      const text = headingText(node);
      const id = slugger.slug(text);
      toc.push({ id, text, depth: level as 2 | 3 });
      return { ...node, attrs: { ...node.attrs, id } };
    }
  }

  if (node.content) {
    return { ...node, content: node.content.map((child) => walk(child, slugger, toc)) };
  }

  return node;
}

/**
 * Walks the doc once, slugifying ## / ### headings with the same GithubSlugger
 * sequence used both for the returned TOC and the `id` baked into each heading
 * node — so sidebar links and in-body anchors never disagree on duplicate
 * heading text.
 */
export function analyzeDoc(doc: TiptapDoc): { toc: TocEntry[]; doc: TiptapDoc } {
  const slugger = new GithubSlugger();
  const toc: TocEntry[] = [];
  const content = doc.content.map((node) => walk(node, slugger, toc));
  return { toc, doc: { ...doc, content } };
}
