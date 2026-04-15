import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import type { PostMeta } from "@/types/post";
import { formatDateThai } from "@/lib/utils/date";

type SidebarProps = {
  popularPosts: PostMeta[];
  featuredPost: PostMeta | null;
  tagsWithCounts: Array<{ tag: string; count: number }>;
};

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">{children}</h2>;
}

export function Sidebar({ popularPosts, featuredPost, tagsWithCounts }: SidebarProps) {
  return (
    <aside className="w-full space-y-8">
      <section>
        <SectionTitle>POPULAR</SectionTitle>
        {popularPosts.length === 0 ? (
          <p className="text-[13px] text-gray-400">ยังไม่มีโพสต์ยอดนิยม</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {popularPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                  <div className="relative h-[65px] w-20 shrink-0 overflow-hidden bg-gray-100">
                    <Image src={post.coverImage} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#111] transition-colors duration-150 ease-out group-hover:text-blue-600">
                      {post.title}
                    </p>
                    <p className="mt-1 text-[13px] text-gray-400">{formatDateThai(post.date)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <SectionTitle>FEATURED</SectionTitle>
        {featuredPost ? (
          <Link href={`/blog/${featuredPost.slug}`} className="group flex gap-3">
            <div className="relative h-[65px] w-20 shrink-0 overflow-hidden bg-gray-100">
              <Image
                src={featuredPost.coverImage}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                priority
                loading="eager"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-semibold leading-snug text-[#111] transition-colors duration-150 ease-out group-hover:text-blue-600">
                {featuredPost.title}
              </p>
              <p className="mt-1 text-[13px] text-gray-400">{formatDateThai(featuredPost.date)}</p>
            </div>
          </Link>
        ) : (
          <p className="text-[13px] text-gray-400">ยังไม่มีโพสต์แนะนำ</p>
        )}
      </section>

      <section>
        <SectionTitle>TAGS</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {tagsWithCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 transition-colors duration-150 ease-out hover:bg-blue-100"
            >
              {tag}
              <span className="ml-1 text-[10px] font-normal text-blue-500/80">({count})</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
