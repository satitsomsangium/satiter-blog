/**
 * Frontmatter contract for MDX files under `/content`.
 * Legacy keys (`thumbnail`, `popular`) are normalized in `lib/posts/normalize.ts`.
 */
export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage: string;
  isPopular: boolean;
  published: boolean;
  /** When true, this post is eligible for the “Featured” sidebar slot. */
  featured?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  /** Whole minutes, word-count / 200, minimum 1. */
  readingTimeMinutes: number;
};

/** Lightweight shape for search API and client filters. */
export type PostSearchHit = Pick<PostMeta, "slug" | "title" | "description" | "date" | "tags">;
