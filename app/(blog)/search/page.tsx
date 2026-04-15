import type { Metadata } from "next";

import { FeedSearch } from "@/components/blog/feed-search";
import { PostGrid } from "@/components/blog/post-grid";
import { PostPagination } from "@/components/blog/post-pagination";
import { Sidebar } from "@/components/blog/sidebar";
import { BlogLayout } from "@/components/layout/blog-layout";
import { filterPostMetasByQuery, getAllPosts, getSidebarData } from "@/lib/posts";
import { clampPage, getTotalPages, parsePageParam, sliceForPage } from "@/lib/utils/pagination";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const raw = q?.trim() ?? "";
  if (!raw) {
    return { title: "ค้นหา" };
  }
  return { title: `ค้นหา: ${raw}` };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const query = sp.q?.trim() ?? "";
  const [allPosts, sidebar] = await Promise.all([getAllPosts(), getSidebarData()]);
  const { popularPosts, featuredPost, tagsWithCounts } = sidebar;
  const results = filterPostMetasByQuery(allPosts, query);

  const totalPages = getTotalPages(results.length);
  const page = clampPage(parsePageParam(sp.page), totalPages);
  const pagePosts = sliceForPage(results, page);
  const preserveQuery = query ? { q: query } : undefined;

  return (
    <BlogLayout
      main={
        <>
          <FeedSearch />
          <header className="mb-6 px-4 md:px-0">
            <h1 className="text-xl font-bold text-[#111] md:text-2xl">ค้นหา</h1>
            {query ? (
              <p className="mt-1 text-[13px] text-gray-400">
                คำค้น: <span className="font-medium text-gray-700">{query}</span> — พบ {results.length} โพสต์
              </p>
            ) : (
              <p className="mt-1 text-[13px] text-gray-400">พิมพ์คำค้นในช่องด้านบน</p>
            )}
          </header>
          {query && results.length > 0 ? (
            <>
              <PostGrid posts={pagePosts} />
              <PostPagination currentPage={page} totalPages={totalPages} pathname="/search" preserveQuery={preserveQuery} />
            </>
          ) : null}
          {query && results.length === 0 ? (
            <p className="px-4 text-sm text-gray-500 md:px-0">ไม่พบโพสต์ที่ตรงกับคำค้นนี้</p>
          ) : null}
        </>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
