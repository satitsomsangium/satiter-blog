import { PostCard } from "./post-card";
import type { PostMeta } from "@/lib/posts";
import { getThaiDateText } from "@/lib/posts";

type PostGridProps = {
  posts: PostMeta[];
};

export function PostGrid({ posts }: PostGridProps) {
  return (
    <section
      aria-label="Latest posts"
      className="post-grid grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          title={post.title}
          dateText={getThaiDateText(post.date)}
          thumbnail={post.thumbnail}
          tags={post.tags}
        />
      ))}
    </section>
  );
}
