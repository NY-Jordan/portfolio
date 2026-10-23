import { ArticleTable } from "@/components/admin/article-table";
import { ViewsChart } from "@/components/admin/views-chart";
import { listArticlesForAdmin } from "@/lib/admin/articles";

export default async function AdminDashboardPage() {
  const articles = await listArticlesForAdmin();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Views by article
        </h1>
        <ViewsChart articles={articles} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight">Articles</h2>
        <ArticleTable articles={articles} />
      </section>
    </div>
  );
}
