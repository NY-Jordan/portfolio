"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { locales } from "@/lib/i18n/locales";
import type { ArticleStatus, TiptapDoc } from "@/types";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * The public writing pages (list + detail) and the homepage's writing
 * preview are statically generated from Supabase at build time — without
 * this, a newly published/edited/deleted article never shows up until the
 * next full deploy.
 */
function revalidatePublicWritingPages(slug: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/writing`);
    revalidatePath(`/${locale}/writing/${slug}`);
  }
}

export interface ArticleInput {
  slug: string;
  date: string;
  tags: string[];
  cover: string | null;
  status: ArticleStatus;
  translations: {
    en: { title: string; description: string; content: TiptapDoc };
    fr: { title: string; description: string; content: TiptapDoc };
  };
}

export async function createArticle(input: ArticleInput) {
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from("articles")
    .insert({
      slug: input.slug,
      date: input.date,
      tags: input.tags,
      cover: input.cover,
      status: input.status,
    })
    .select("id")
    .single();

  if (error || !article) {
    throw new Error(error?.message ?? "Failed to create article");
  }

  const { error: translationsError } = await supabase.from("article_translations").insert([
    { article_id: article.id, locale: "en", ...input.translations.en },
    { article_id: article.id, locale: "fr", ...input.translations.fr },
  ]);

  if (translationsError) {
    throw new Error(translationsError.message);
  }

  revalidatePath("/admin");
  revalidatePublicWritingPages(input.slug);
  redirect("/admin");
}

export async function updateArticle(id: string, input: ArticleInput) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from("articles")
    .update({
      slug: input.slug,
      date: input.date,
      tags: input.tags,
      cover: input.cover,
      status: input.status,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  const { error: translationsError } = await supabase.from("article_translations").upsert(
    [
      { article_id: id, locale: "en", ...input.translations.en },
      { article_id: id, locale: "fr", ...input.translations.fr },
    ],
    { onConflict: "article_id,locale" }
  );

  if (translationsError) {
    throw new Error(translationsError.message);
  }

  revalidatePath("/admin");
  revalidatePublicWritingPages(input.slug);
  if (existing && existing.slug !== input.slug) {
    revalidatePublicWritingPages(existing.slug);
  }
  redirect("/admin");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("articles")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  if (existing) {
    revalidatePublicWritingPages(existing.slug);
  }
}
