import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { EyebrowLabel } from "@/components/ui/eyebrow-label";
import { PostCard } from "@/components/writing/post-card";
import { getAllPosts } from "@/lib/writing/get-posts";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localizedAlternates } from "@/lib/seo/alternates";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.writing.title,
    description: dict.writing.intro,
    alternates: localizedAlternates("/writing", locale),
  };
}

export default async function WritingIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const posts = await getAllPosts(locale);

  return (
    <Container className="py-20 lg:py-28">
      <EyebrowLabel>{dict.writing.eyebrow}</EyebrowLabel>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.writing.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">
        {dict.writing.intro}
      </p>

      {posts.length > 0 ? (
        <div className="mt-14">
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
        <p className="mt-14 text-sm text-muted-foreground">{dict.writing.empty}</p>
      )}
    </Container>
  );
}
