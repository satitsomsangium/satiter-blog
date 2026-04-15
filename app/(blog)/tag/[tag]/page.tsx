import { FeedSearch } from "@/components/blog/feed-search";
import { PostGrid } from "@/components/blog/post-grid";
import { PostPagination } from "@/components/blog/post-pagination";
import { Sidebar } from "@/components/blog/sidebar";
import { BlogLayout } from "@/components/layout/blog-layout";
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
          <FeedSearch />
          <header className="mb-6 px-4 md:px-0">
            <h1 className="text-xl font-bold text-[#111] md:text-2xl">แท็ก: {tag}</h1>
            <p className="mt-1 text-[13px] text-gray-400">{posts.length} โพสต์</p>
          </header>
          <PostGrid posts={pagePosts} />
          <PostPagination currentPage={page} totalPages={totalPages} pathname={pathname} />
        </>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
