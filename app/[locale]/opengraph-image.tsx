import { ImageResponse } from "next/og";
import { locales, isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "en");

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
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.2 }}>
          {dict.meta.siteTitle}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#9a9ca1" }}>
          {dict.meta.siteDescription}
        </div>
      </div>
    ),
    { ...size }
  );
}
