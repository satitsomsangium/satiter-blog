import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostShare } from "@/components/blog/post-share";
import { RelatedPosts } from "@/components/blog/related-posts";
import { Sidebar } from "@/components/blog/sidebar";
import { BlogLayout } from "@/components/layout/blog-layout";
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
        <div className="w-full min-w-0">
          <div className="mx-auto w-full min-w-0 max-w-[720px] px-4 md:px-0">
            <Link
              href="/"
              className="mb-6 inline-flex text-sm font-medium text-gray-500 transition-colors duration-150 ease-out hover:text-blue-600"
            >
              ← กลับ
            </Link>
            <article className="min-w-0">
              <h1 className="min-w-0 max-w-full text-balance text-2xl font-bold leading-snug break-words text-[#111] md:text-3xl">
                {meta.title}
              </h1>
              <p className="mt-2 text-[13px] text-gray-400">
                {formatDateThai(meta.date)}
                <span className="mx-1" aria-hidden>
                  ·
                </span>
                <span>{meta.readingTimeMinutes} นาทีในการอ่าน</span>
              </p>
              {meta.tags.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 transition-colors duration-150 ease-out hover:bg-blue-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <PostShare title={meta.title} url={shareUrl} />
              </div>
              <div className="article-prose mt-10">{content}</div>
            </article>
          </div>
          <RelatedPosts posts={related} />
        </div>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
