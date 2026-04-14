import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogLayout } from "@/components/blog-layout";
import { PostShare } from "@/components/post-share";
import { Sidebar } from "@/components/sidebar";
import { getCanonicalPostUrl } from "@/lib/site-url";
import { getAllPostsMeta, getPostBySlug, getSidebarData, getThaiDateText } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.meta.title} | SATITER`,
      description: post.meta.title,
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const [post, sidebar] = await Promise.all([getPostBySlug(slug).catch(() => null), getSidebarData()]);
  if (!post) {
    notFound();
  }
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;
  const shareUrl = getCanonicalPostUrl(slug);

  return (
    <BlogLayout
      main={
        <article className="item-post item-post-with-sidebar">
          <h1>{post.meta.title}</h1>
          <p className="post-meta">{getThaiDateText(post.meta.date)}</p>
          {post.meta.tags.length > 0 ? (
            <div className="post-labels">
              {post.meta.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
          <PostShare title={post.meta.title} url={shareUrl} />
          <div className="post-content">{post.content}</div>
        </article>
      }
      sidebar={
        <Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />
      }
    />
  );
}
