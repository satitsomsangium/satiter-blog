import type { PostMeta } from "@/types/post";

import { PostGrid } from "./post-grid";

type RelatedPostsProps = {
  posts: PostMeta[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 w-full min-w-0 border-t border-gray-100 pt-8" aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="mb-4 px-4 text-xs font-bold uppercase tracking-widest text-gray-400 md:px-0"
      >
        โพสต์ที่เกี่ยวข้อง
      </h2>
      <PostGrid posts={posts} as="div" />
    </section>
  );
}
