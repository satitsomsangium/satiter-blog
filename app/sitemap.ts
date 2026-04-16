import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

const base = PRODUCTION_SITE_ORIGIN;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const lastModified = new Date(post.date);
    return {
      url: `${base}/blog/${post.slug}`,
      lastModified: Number.isNaN(lastModified.getTime()) ? new Date() : lastModified,
    };
  });

  return [...staticRoutes, ...postRoutes];
}
