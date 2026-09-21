import fs from "node:fs";
import path from "node:path";
import type { Locale, PostMetadata, PostSummary } from "@/types";
import { estimateReadingMinutes } from "./reading-time";
import { extractToc, type TocEntry } from "./toc";

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function readSource(locale: Locale, slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, slug, `${locale}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

export async function getAllPosts(locale: Locale): Promise<PostSummary[]> {
  const summaries: PostSummary[] = [];

  for (const slug of getPostSlugs()) {
    const source = readSource(locale, slug);
    if (!source) continue;

    const mod = (await import(`@/content/writing/${slug}/${locale}.mdx`)) as {
      metadata: PostMetadata;
    };

    summaries.push({
      ...mod.metadata,
      slug,
      locale,
      readingTime: `${estimateReadingMinutes(source)}`,
    });
  }

  return summaries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

interface PostContent {
  Component: React.ComponentType;
  metadata: PostMetadata;
  readingMinutes: number;
  toc: TocEntry[];
}

export async function getPostBySlug(
  locale: Locale,
  slug: string
): Promise<PostContent | null> {
  const source = readSource(locale, slug);
  if (!source) return null;

  const mod = (await import(`@/content/writing/${slug}/${locale}.mdx`)) as {
    default: React.ComponentType;
    metadata: PostMetadata;
  };

  return {
    Component: mod.default,
    metadata: mod.metadata,
    readingMinutes: estimateReadingMinutes(source),
    toc: extractToc(source),
  };
}

export async function getRelatedPosts(
  locale: Locale,
  slug: string,
  tags: string[],
  limit = 3
): Promise<PostSummary[]> {
  const posts = await getAllPosts(locale);
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      overlap: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.post);
}
