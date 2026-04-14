import type { PostFrontmatter } from "@/types/post";

/** Maps gray-matter `data` to our contract, including legacy Blogger-era keys. */
export function normalizePostFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const title = String(data.title ?? "");
  const descriptionRaw = String(data.description ?? "").trim();
  const description = descriptionRaw || title;
  const date = String(data.date ?? "");
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const coverImage = String(data.coverImage ?? data.thumbnail ?? "");
  const isPopular = Boolean(data.isPopular ?? data.popular);
  const published = data.published !== false;
  const featured = Boolean(data.featured);

  const base: PostFrontmatter = {
    title,
    description,
    date,
    tags,
    coverImage,
    isPopular,
    published,
  };

  if (featured) {
    return { ...base, featured: true };
  }
  return base;
}
