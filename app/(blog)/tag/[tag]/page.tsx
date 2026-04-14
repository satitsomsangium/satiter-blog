import { PostGrid } from "@/components/blog/post-grid";
import { PostPagination } from "@/components/blog/post-pagination";
import { BlogLayout } from "@/components/layout/blog-layout";
import { Sidebar } from "@/components/blog/sidebar";
import { getPostsByTag, getSidebarData, getTagsWithCounts } from "@/lib/posts";
import { clampPage, getTotalPages, parsePageParam, sliceForPage } from "@/lib/utils/pagination";

type TagPageProps = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateStaticParams() {
  const tags = await getTagsWithCounts();
  return tags.map(({ tag }) => ({ tag }));
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const [{ tag: encodedTag }, sp] = await Promise.all([params, searchParams]);
  const tag = decodeURIComponent(encodedTag);
  const [posts, sidebar] = await Promise.all([getPostsByTag(tag), getSidebarData()]);
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;

  const totalPages = getTotalPages(posts.length);
  const page = clampPage(parsePageParam(sp.page), totalPages);
  const pagePosts = sliceForPage(posts, page);
  const pathname = `/tag/${encodeURIComponent(tag)}`;

  return (
    <BlogLayout
      main={
        <>
          <header className="mb-5 border-b-2 border-[var(--border-soft)] pb-4">
            <h1 className="text-[18px] font-bold leading-snug text-[var(--title-color)]">แท็ก: {tag}</h1>
            <p className="post-meta mt-1">{posts.length} โพสต์</p>
          </header>
          <PostGrid posts={pagePosts} />
          <PostPagination currentPage={page} totalPages={totalPages} pathname={pathname} />
        </>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
