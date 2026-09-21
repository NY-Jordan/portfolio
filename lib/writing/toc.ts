import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/**
 * Extracts ## / ### headings from raw MDX source, skipping fenced code
 * blocks, and slugifies with github-slugger — the same slugger rehype-slug
 * uses internally, so these ids match the anchors rendered in the article.
 */
export function extractToc(source: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].trim();
    entries.push({ id: slugger.slug(text), text, depth });
  }

  return entries;
}
