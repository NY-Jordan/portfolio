import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">New article</h1>
      <ArticleForm mode="create" />
    </div>
  );
}
