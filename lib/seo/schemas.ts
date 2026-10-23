import { SITE_URL } from "@/lib/site";
import { socialLinks } from "@/lib/content/social";
import type { Locale, PostMetadata } from "@/types";

const AUTHOR_NAME = "Yvan Jordan Nguetse";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR_NAME,
    alternateName: "NY-Jordan",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    sameAs: socialLinks
      .filter((link) => link.href.startsWith("http"))
      .map((link) => link.href),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NY-Jordan",
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
  };
}

export function articleSchema({
  metadata,
  locale,
  slug,
}: {
  metadata: PostMetadata;
  locale: Locale;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.date,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/writing/${slug}`,
    ...(metadata.cover ? { image: [metadata.cover] } : {}),
    keywords: metadata.tags.join(", "),
    author: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR_NAME, url: SITE_URL },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
