import type { PostMeta, PostSearchHit } from "@/types/post";

function normalizeQuery(q: string) {
  return q.trim().toLowerCase();
}

function matchesQuery(post: PostMeta, q: string): boolean {
  const haystack = [post.title, post.description, post.slug, ...post.tags].join(" ").toLowerCase();
  return haystack.includes(q);
}

/** Full `PostMeta` rows for grids — empty query returns no rows (ต้องส่งคำค้นจริง). */
export function filterPostMetasByQuery(posts: PostMeta[], query: string): PostMeta[] {
  const q = normalizeQuery(query);
  if (!q) {
    return [];
  }
  return posts.filter((post) => matchesQuery(post, q));
}

/** Case-insensitive match on title, description, slug, and tags (สำหรับ API). */
export function filterPostsByQuery(posts: PostMeta[], query: string): PostSearchHit[] {
  return filterPostMetasByQuery(posts, query).map(toHit);
}

function toHit(post: PostMeta): PostSearchHit {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
  };
}
