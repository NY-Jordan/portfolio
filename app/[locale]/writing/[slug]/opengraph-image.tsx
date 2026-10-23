import { ImageResponse } from "next/og";
import { getPostBySlug, getPostSlugs } from "@/lib/writing/get-posts";
import { isLocale, locales } from "@/lib/i18n/locales";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function Image({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const post = isLocale(locale) ? await getPostBySlug(locale, slug) : null;
  const title = post?.metadata.title ?? slug;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0b",
          color: "#f5f5f3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#cffa3c", letterSpacing: 4 }}>
          NY-JORDAN
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#9a9ca1" }}>
          Yvan Jordan Nguetse — Software Engineer &amp; Product Builder
        </div>
      </div>
    ),
    { ...size }
  );
}
