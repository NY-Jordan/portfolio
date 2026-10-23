import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/admin/article-form";
import { getArticleForAdmin } from "@/lib/admin/articles";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleForAdmin(id);
  if (!article) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Edit article</h1>
      <ArticleForm mode="edit" articleId={article.id} initial={article} />
    </div>
  );
}
