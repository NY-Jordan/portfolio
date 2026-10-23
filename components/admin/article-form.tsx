"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { CoverUploader } from "@/components/admin/cover-uploader";
import { cn } from "@/lib/utils";
import { createArticle, updateArticle, type ArticleInput } from "@/app/admin/(protected)/actions";
import type { ArticleStatus, TiptapDoc } from "@/types";
import type { AdminArticle } from "@/lib/admin/articles";

const EMPTY_DOC: TiptapDoc = { type: "doc", content: [] };

type Locale = "en" | "fr";

export function ArticleForm({
  mode,
  articleId,
  initial,
}: {
  mode: "create" | "edit";
  articleId?: string;
  initial?: AdminArticle;
}) {
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [tagsText, setTagsText] = useState(initial?.tags.join(", ") ?? "");
  const [cover, setCover] = useState<string | null>(initial?.cover ?? null);
  const [status, setStatus] = useState<ArticleStatus>(initial?.status ?? "draft");
  const [activeLocale, setActiveLocale] = useState<Locale>("en");
  const [translations, setTranslations] = useState({
    en: {
      title: initial?.translations.en.title ?? "",
      description: initial?.translations.en.description ?? "",
      content: initial?.translations.en.content ?? EMPTY_DOC,
    },
    fr: {
      title: initial?.translations.fr.title ?? "",
      description: initial?.translations.fr.description ?? "",
      content: initial?.translations.fr.content ?? EMPTY_DOC,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function updateTranslation(locale: Locale, field: "title" | "description", value: string) {
    setTranslations((current) => ({
      ...current,
      [locale]: { ...current[locale], [field]: value },
    }));
  }

  function updateContent(locale: Locale, doc: TiptapDoc) {
    setTranslations((current) => ({
      ...current,
      [locale]: { ...current[locale], content: doc },
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const input: ArticleInput = {
      slug: slug.trim(),
      date,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      cover,
      status,
      translations,
    };

    startTransition(async () => {
      try {
        if (mode === "create") {
          await createArticle(input);
        } else if (articleId) {
          await updateArticle(articleId, input);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  const active = translations[activeLocale];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Slug</label>
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Tags (comma separated)</label>
          <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ArticleStatus)}
            className="h-11 rounded-sm border border-border bg-transparent px-4 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label-mono text-muted-foreground">Cover image</label>
        <CoverUploader value={cover} onChange={setCover} />
      </div>

      <div className="flex gap-2 border-b border-border">
        {(["en", "fr"] as const).map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => setActiveLocale(locale)}
            className={cn(
              "px-4 py-2 text-sm font-medium text-muted-foreground",
              activeLocale === locale && "border-b-2 border-accent text-foreground"
            )}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Title ({activeLocale})</label>
          <Input
            value={active.title}
            onChange={(e) => updateTranslation(activeLocale, "title", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">
            Description ({activeLocale})
          </label>
          <Textarea
            value={active.description}
            onChange={(e) => updateTranslation(activeLocale, "description", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="label-mono text-muted-foreground">Content ({activeLocale})</label>
          <TiptapEditor
            key={activeLocale}
            content={active.content}
            onChange={(doc) => updateContent(activeLocale, doc)}
          />
        </div>
      </div>

      {error ? <Alert variant="error">{error}</Alert> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : mode === "create" ? "Create article" : "Save changes"}
      </Button>
    </form>
  );
}
