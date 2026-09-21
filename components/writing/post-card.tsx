import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import type { Locale, PostSummary } from "@/types";

export function PostCard({
  post,
  locale,
  readingTimeLabel,
}: {
  post: PostSummary;
  locale: Locale;
  readingTimeLabel: string;
}) {
  const date = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/${locale}/writing/${post.slug}`}
      className="group flex flex-col gap-3 border-b border-border py-8 first:pt-0"
    >
      <div className="label-mono flex flex-wrap items-center gap-3 text-muted-foreground">
        <time dateTime={post.date}>{date}</time>
        <span aria-hidden="true">&middot;</span>
        <span>
          {post.readingTime} {readingTimeLabel}
        </span>
      </div>
      <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="max-w-2xl text-sm text-muted-foreground">
        {post.description}
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Link>
  );
}
