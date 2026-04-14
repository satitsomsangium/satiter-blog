import type { Metadata } from "next";

import { PostGrid } from "@/components/blog/post-grid";
import { PostPagination } from "@/components/blog/post-pagination";
import { BlogLayout } from "@/components/layout/blog-layout";
import { Sidebar } from "@/components/blog/sidebar";
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
          <header className="mb-5 border-b-2 border-[var(--border-soft)] pb-4">
            <h1 className="text-[18px] font-bold leading-snug text-[var(--title-color)]">ค้นหา</h1>
            {query ? (
              <p className="post-meta mt-1">
                คำค้น: <span className="font-medium text-[var(--title-color)]">{query}</span> — พบ {results.length} โพสต์
              </p>
            ) : (
              <p className="post-meta mt-1">พิมพ์คำค้นในช่องด้านบน</p>
            )}
          </header>
          {query && results.length > 0 ? (
            <>
              <PostGrid posts={pagePosts} />
              <PostPagination currentPage={page} totalPages={totalPages} pathname="/search" preserveQuery={preserveQuery} />
            </>
          ) : null}
          {query && results.length === 0 ? (
            <p className="text-[14px] text-[var(--post-meta)]">ไม่พบโพสต์ที่ตรงกับคำค้นนี้</p>
          ) : null}
        </>
      }
      sidebar={<Sidebar popularPosts={popularPosts} featuredPost={featuredPost} tagsWithCounts={tagsWithCounts} />}
    />
  );
}
