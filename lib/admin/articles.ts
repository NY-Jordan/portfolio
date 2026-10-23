import { createClient } from "@/lib/supabase/server";
import type { ArticleStatus, TiptapDoc } from "@/types";

export interface AdminArticleListItem {
  id: string;
  slug: string;
  date: string;
  status: ArticleStatus;
  views_count: number;
  likes_count: number;
  title: string;
}

export async function listArticlesForAdmin(): Promise<AdminArticleListItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, date, status, views_count, likes_count, article_translations(locale, title)"
    )
    .order("date", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    date: row.date,
    status: row.status as ArticleStatus,
    views_count: row.views_count,
    likes_count: row.likes_count,
    title:
      row.article_translations.find((t) => t.locale === "en")?.title ??
      row.article_translations[0]?.title ??
      row.slug,
  }));
}

export interface AdminArticleTranslation {
  title: string;
  description: string;
  content: TiptapDoc;
}

export interface AdminArticle {
  id: string;
  slug: string;
  date: string;
  tags: string[];
  cover: string | null;
  status: ArticleStatus;
  translations: Record<"en" | "fr", AdminArticleTranslation>;
}

const EMPTY_DOC: TiptapDoc = { type: "doc", content: [] };
const EMPTY_TRANSLATION: AdminArticleTranslation = {
  title: "",
  description: "",
  content: EMPTY_DOC,
};

export async function getArticleForAdmin(id: string): Promise<AdminArticle | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select(
      "id, slug, date, tags, cover, status, article_translations(locale, title, description, content)"
    )
    .eq("id", id)
    .maybeSingle();

  if (!data) return null;

  const en = data.article_translations.find((t) => t.locale === "en");
  const fr = data.article_translations.find((t) => t.locale === "fr");

  return {
    id: data.id,
    slug: data.slug,
    date: data.date,
    tags: data.tags,
    cover: data.cover,
    status: data.status as ArticleStatus,
    translations: {
      en: en ?? EMPTY_TRANSLATION,
      fr: fr ?? EMPTY_TRANSLATION,
    },
  };
}
