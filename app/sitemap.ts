import type { MetadataRoute } from "next";
import { getAllProjects } from "@/content/projects";
import { getPostSlugs } from "@/lib/writing/get-posts";
import { locales } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["", "/work", "/writing", "/about", "/now", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({ url: `${SITE_URL}/${locale}${route}`, lastModified: new Date() });
    }
    for (const project of getAllProjects()) {
      entries.push({
        url: `${SITE_URL}/${locale}/work/${project.slug}`,
        lastModified: new Date(),
      });
    }
    for (const slug of getPostSlugs()) {
      entries.push({
        url: `${SITE_URL}/${locale}/writing/${slug}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
