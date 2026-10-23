import type { MetadataRoute } from "next";
import { getAllProjects } from "@/content/projects";
import { getAllPosts } from "@/lib/writing/get-posts";
import { locales } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/site";

const staticRoutes = ["", "/work", "/writing", "/about", "/now", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const buildDate = new Date();

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({ url: `${SITE_URL}/${locale}${route}`, lastModified: buildDate });
    }
    for (const project of getAllProjects()) {
      entries.push({
        url: `${SITE_URL}/${locale}/work/${project.slug}`,
        lastModified: new Date(project.year),
      });
    }
    for (const post of await getAllPosts(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/writing/${post.slug}`,
        lastModified: new Date(post.date),
      });
    }
  }

  return entries;
}
