import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { TableOfContents } from "@/components/writing/table-of-contents";
import { RelatedPosts } from "@/components/writing/related-posts";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/writing/get-posts";
import { isLocale, locales } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: `/${locale}/writing/${slug}` },
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
      tags: post.metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const related = await getRelatedPosts(locale, slug, post.metadata.tags);
  const date = new Date(post.metadata.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const Content = post.Component;

  return (
    <Container className="py-16 lg:py-24">
      <Link
        href={`/${locale}/writing`}
        className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {dict.writing.backToWriting}
      </Link>

      <header className="mt-8 flex flex-col gap-4 border-b border-border pb-10">
        <div className="label-mono flex flex-wrap items-center gap-3 text-muted-foreground">
          <span>
            {dict.writing.publishedOn} <time dateTime={post.metadata.date}>{date}</time>
          </span>
          <span aria-hidden="true">&middot;</span>
          <span>
            {post.readingMinutes} {dict.writing.readingTime}
          </span>
        </div>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {post.metadata.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {post.metadata.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {post.metadata.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <article className="prose prose-invert">
          <Content />
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents toc={post.toc} label={dict.writing.tableOfContents} />
          </div>
        </aside>
      </div>

      <RelatedPosts posts={related} locale={locale} label={dict.writing.relatedArticles} />
    </Container>
  );
}

