import Link from "next/link";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteArticleDialog } from "@/components/admin/delete-article-dialog";
import type { AdminArticleListItem } from "@/lib/admin/articles";

export function ArticleTable({ articles }: { articles: AdminArticleListItem[] }) {
  if (articles.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No articles yet — create your first one.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="label-mono border-b border-border text-muted-foreground">
            <th className="py-2 pr-4 font-medium">Title</th>
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 pr-4 font-medium">Views</th>
            <th className="py-2 pr-4 font-medium">Likes</th>
            <th className="py-2 pr-0 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-border">
              <td className="py-3 pr-4 font-medium">{article.title}</td>
              <td className="py-3 pr-4 text-muted-foreground">{article.date}</td>
              <td className="py-3 pr-4">
                <Badge variant={article.status === "published" ? "accent" : "outline"}>
                  {article.status}
                </Badge>
              </td>
              <td className="py-3 pr-4 text-muted-foreground">{article.views_count}</td>
              <td className="py-3 pr-4 text-muted-foreground">{article.likes_count}</td>
              <td className="py-3 pr-0">
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="icon" aria-label="Edit article">
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                  <DeleteArticleDialog articleId={article.id} title={article.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
