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
    <section className="related-posts" aria-labelledby="related-heading">
      <h2 id="related-heading">โพสต์ที่เกี่ยวข้อง</h2>
      <PostGrid posts={posts} as="div" />
    </section>
  );
}
