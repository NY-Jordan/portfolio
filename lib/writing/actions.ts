"use server";

import { supabasePublic } from "@/lib/supabase/public";

export async function incrementArticleView(
  slug: string,
  visitorId: string
): Promise<number> {
  const { data, error } = await supabasePublic.rpc("increment_article_view", {
    p_slug: slug,
    p_visitor_id: visitorId,
  });

  if (error) return 0;
  return data ?? 0;
}

export async function toggleArticleLike(
  slug: string,
  visitorId: string
): Promise<{ liked: boolean; likesCount: number } | null> {
  const { data, error } = await supabasePublic
    .rpc("toggle_article_like", { p_slug: slug, p_visitor_id: visitorId })
    .single<{ liked: boolean; likes_count: number }>();

  if (error || !data) return null;
  return { liked: data.liked, likesCount: data.likes_count };
}
