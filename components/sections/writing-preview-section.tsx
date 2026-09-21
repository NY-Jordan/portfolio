import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { PostCard } from "@/components/writing/post-card";
import { getAllPosts } from "@/lib/writing/get-posts";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/types";

export async function WritingPreviewSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const posts = (await getAllPosts(locale)).slice(0, 3);

  return (
    <section className="border-b border-border">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <EyebrowLabel>{dict.home.writingPreview.eyebrow}</EyebrowLabel>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {dict.home.writingPreview.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/writing`}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            {dict.home.writingPreview.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="mt-8">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                readingTimeLabel={dict.writing.readingTime}
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-muted-foreground">
            {dict.home.writingPreview.empty}
          </p>
        )}
      </Container>
    </section>
  );
}
