import { supabasePublic } from "@/lib/supabase/public";
import type { Locale, PostMetadata, PostSummary, TiptapDoc } from "@/types";
import { estimateReadingMinutes } from "./reading-time";
import { analyzeDoc, type TocEntry } from "./doc-analysis";

interface TranslationRow {
  locale: Locale;
  title: string;
  description: string;
  content: TiptapDoc;
}

interface ArticleRow {
  slug: string;
  date: string;
  tags: string[];
  cover: string | null;
  views_count: number;
  likes_count: number;
  article_translations: TranslationRow[];
}

function toMetadata(row: ArticleRow, translation: TranslationRow): PostMetadata {
  return {
    title: translation.title,
    description: translation.description,
    date: row.date,
    tags: row.tags,
    cover: row.cover ?? undefined,
    views: row.views_count,
    likes: row.likes_count,
  };
}

export async function getPostSlugs(): Promise<string[]> {
  const { data } = await supabasePublic
    .from("articles")
    .select("slug")
    .eq("status", "published");

  return (data ?? []).map((row) => row.slug as string);
}

export async function getAllPosts(locale: Locale): Promise<PostSummary[]> {
  const { data } = await supabasePublic
    .from("articles")
    .select(
      "slug, date, tags, cover, views_count, likes_count, article_translations!inner(locale, title, description, content)"
    )
    .eq("status", "published")
    .eq("article_translations.locale", locale)
    .order("date", { ascending: false });

  return ((data ?? []) as ArticleRow[]).map((row) => {
    const translation = row.article_translations[0];
    return {
      ...toMetadata(row, translation),
      slug: row.slug,
      locale,
      readingTime: `${estimateReadingMinutes(translation.content)}`,
    };
  });
}

interface PostContent {
  content: TiptapDoc;
  metadata: PostMetadata;
  readingMinutes: number;
  toc: TocEntry[];
}

export async function getPostBySlug(
  locale: Locale,
  slug: string
): Promise<PostContent | null> {
  const { data } = await supabasePublic
    .from("articles")
    .select(
      "slug, date, tags, cover, views_count, likes_count, article_translations!inner(locale, title, description, content)"
    )
    .eq("status", "published")
    .eq("slug", slug)
    .eq("article_translations.locale", locale)
    .maybeSingle();

  if (!data) return null;

  const row = data as ArticleRow;
  const translation = row.article_translations[0];
  if (!translation) return null;

  const { toc, doc } = analyzeDoc(translation.content);

  return {
    content: doc,
    metadata: toMetadata(row, translation),
    readingMinutes: estimateReadingMinutes(translation.content),
    toc,
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
