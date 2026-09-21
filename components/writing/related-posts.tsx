import Link from "next/link";
import type { Locale, PostSummary } from "@/types";

export function RelatedPosts({
  posts,
  locale,
  label,
}: {
  posts: PostSummary[];
  locale: Locale;
  label: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="label-mono text-muted-foreground">{label}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/writing/${post.slug}`}
            className="group flex flex-col gap-2 border border-border p-5 transition-colors hover:border-accent/60"
          >
            <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-accent">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground">{post.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
