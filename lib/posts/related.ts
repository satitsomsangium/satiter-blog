import type { PostMeta } from "@/types/post";

/** Tag overlap score, then recency — excludes the current slug. */
export function getRelatedPosts(all: PostMeta[], currentSlug: string, tags: string[], limit = 3): PostMeta[] {
  const tagSet = new Set(tags);
  const others = all.filter((p) => p.slug !== currentSlug);

  const scored = others.map((post) => ({
    post,
    score: post.tags.reduce((n, t) => n + (tagSet.has(t) ? 1 : 0), 0),
  }));

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.post.date < b.post.date ? 1 : -1;
  });

  return scored.slice(0, limit).map((s) => s.post);
}
