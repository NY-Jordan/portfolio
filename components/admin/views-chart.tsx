import type { AdminArticleListItem } from "@/lib/admin/articles";

export function ViewsChart({ articles }: { articles: AdminArticleListItem[] }) {
  const sorted = [...articles].sort((a, b) => b.views_count - a.views_count);
  const max = Math.max(1, ...sorted.map((a) => a.views_count));

  if (sorted.length === 0) {
    return <p className="text-sm text-muted-foreground">No articles to chart yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((article) => {
        const pct = (article.views_count / max) * 100;
        return (
          <div key={article.id} className="flex items-center gap-3">
            <span
              className="w-40 shrink-0 truncate text-sm text-muted-foreground"
              title={article.title}
            >
              {article.title}
            </span>
            <div
              className="relative h-6 flex-1 overflow-hidden rounded-sm bg-card"
              title={`${article.views_count.toLocaleString()} views`}
            >
              <div
                className="h-6 rounded-r-[4px] bg-accent transition-[filter] hover:brightness-110"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-sm tabular-nums text-foreground">
              {article.views_count.toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}
