import { FeedSearch } from "@/components/blog/feed-search";
import { PostGrid } from "@/components/blog/post-grid";
import { PostPagination } from "@/components/blog/post-pagination";
import { Sidebar } from "@/components/blog/sidebar";
import { BlogLayout } from "@/components/layout/blog-layout";
import { getAllPosts, getSidebarData } from "@/lib/posts";
import { clampPage, getTotalPages, parsePageParam, sliceForPage } from "@/lib/utils/pagination";

type HomePageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const [posts, sidebar, sp] = await Promise.all([getAllPosts(), getSidebarData(), searchParams]);
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;

  const totalPages = getTotalPages(posts.length);
  const page = clampPage(parsePageParam(sp.page), totalPages);
  const pagePosts = sliceForPage(posts, page);

  return (
    <BlogLayout
      main={
        <>
          <FeedSearch />
          <PostGrid posts={pagePosts} />
          <PostPagination currentPage={page} totalPages={totalPages} pathname="/" />
        </>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
