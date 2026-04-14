import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogLayout } from "@/components/layout/blog-layout";
import { PostComments } from "@/components/blog/post-comments";
import { PostShare } from "@/components/blog/post-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Sidebar } from "@/components/blog/sidebar";
import { getAllPosts, getPostBySlug, getRelatedPosts, getSidebarData } from "@/lib/posts";
import { getBaseUrl, getCanonicalPostUrl } from "@/lib/site-url";
import { formatDateThai } from "@/lib/utils/date";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const base = getBaseUrl();
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "ไม่พบโพสต์ | SATITER" };
  }

  const { title, description, date, coverImage, tags } = post.meta;
  const canonical = `${base}/blog/${slug}`;

  return {
    title: `${title} | SATITER`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      publishedTime: date,
      tags,
      images: coverImage ? [{ url: coverImage }] : undefined,
    },
    twitter: {
      card: coverImage ? "summary_large_image" : "summary",
      title,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [compiled, sidebar, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getSidebarData(),
    getAllPosts(),
  ]);

  if (!compiled) {
    notFound();
  }

  const { meta, content } = compiled;
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;
  const shareUrl = getCanonicalPostUrl(slug);
  const related = getRelatedPosts(allPosts, slug, meta.tags, 3);

  return (
    <BlogLayout
      main={
        <article className="item-post item-post-with-sidebar">
          <h1>{meta.title}</h1>
          <p className="post-meta">
            {formatDateThai(meta.date)}
            <span className="reading-time" aria-hidden>
              ·
            </span>
            <span className="reading-time">{meta.readingTimeMinutes} นาทีในการอ่าน</span>
          </p>
          {meta.tags.length > 0 ? (
            <div className="post-labels">
              {meta.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
          <PostShare title={meta.title} url={shareUrl} />
          <div className="post-content">{content}</div>
          <RelatedPosts posts={related} />
          <PostComments />
        </article>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
