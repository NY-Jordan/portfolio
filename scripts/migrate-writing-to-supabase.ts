/**
 * One-off migration: reads the existing content/writing/<slug>/{en,fr}.mdx
 * files and inserts them into Supabase (articles + article_translations).
 * Run once via: npx tsx scripts/migrate-writing-to-supabase.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { generateJSON } from "@tiptap/html/server";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const match = /^([^#=]+)=(.*)$/.exec(line.trim());
    if (match) process.env[match[1]] ??= match[2];
  }
}
loadEnvLocal();

const CONTENT_DIR = path.join(process.cwd(), "content", "writing");
const LOCALES = ["en", "fr"] as const;

const lowlight = createLowlight(common);
const extensions = [
  StarterKit.configure({ codeBlock: false, link: { openOnClick: false } }),
  TiptapImage,
  CodeBlockLowlight.configure({ lowlight }),
];

const markdownToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify);

interface ParsedMdx {
  metadata: { title: string; description: string; date: string; tags: string[] };
  body: string;
}

function parseMdx(source: string): ParsedMdx {
  const match = /export const metadata = (\{[\s\S]*?\n\});?/.exec(source);
  if (!match) throw new Error("No metadata export found");

  // Trusted local file content only (this repo's own content/writing/*.mdx).
  const metadata = eval(`(${match[1]})`);
  const body = source.slice(match.index! + match[0].length).trim();

  return { metadata, body };
}

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (.env.local)"
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const slugs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const slug of slugs) {
    console.log(`Migrating ${slug}...`);

    const parsedByLocale: Record<(typeof LOCALES)[number], ParsedMdx> = {} as never;
    for (const locale of LOCALES) {
      const filePath = path.join(CONTENT_DIR, slug, `${locale}.mdx`);
      const source = fs.readFileSync(filePath, "utf8");
      parsedByLocale[locale] = parseMdx(source);
    }

    const { metadata } = parsedByLocale.en;

    // Re-runnable: drop any previous partial/full row for this slug first
    // (cascades to its translations) so the script can be safely retried.
    await supabase.from("articles").delete().eq("slug", slug);

    const { data: article, error: articleError } = await supabase
      .from("articles")
      .insert({
        slug,
        date: metadata.date,
        tags: metadata.tags,
        cover: null,
        status: "published",
      })
      .select("id")
      .single();

    if (articleError || !article) {
      throw new Error(`Failed to insert article ${slug}: ${articleError?.message}`);
    }

    const translationRows = await Promise.all(
      LOCALES.map(async (locale) => {
        const parsed = parsedByLocale[locale];
        const html = String(await markdownToHtml.process(parsed.body));
        const content = await generateJSON(html, extensions);

        return {
          article_id: article.id,
          locale,
          title: parsed.metadata.title,
          description: parsed.metadata.description,
          content,
        };
      })
    );

    const { error: translationsError } = await supabase
      .from("article_translations")
      .insert(translationRows);

    if (translationsError) {
      throw new Error(`Failed to insert translations for ${slug}: ${translationsError.message}`);
    }

    console.log(`  done.`);
  }

  console.log(`Migrated ${slugs.length} articles.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
