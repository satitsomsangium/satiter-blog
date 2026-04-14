import Image from "next/image";
import Link from "next/link";

import type { PostMeta } from "@/types/post";
import { formatDateThai } from "@/lib/utils/date";

import { AdBanner } from "./ad-banner";

type SidebarProps = {
  popularPosts: PostMeta[];
  featuredPost: PostMeta | null;
  tagsWithCounts: Array<{ tag: string; count: number }>;
  showAds?: boolean;
};

export function Sidebar({ popularPosts, featuredPost, tagsWithCounts, showAds = true }: SidebarProps) {
  return (
    <aside className="blog-layout__sidebar">
      {showAds ? (
        <section className="sidebar-widget sidebar-widget-ads">
          <h2 className="sidebar-widget-title">ADS</h2>
          <AdBanner variant="sidebar" />
        </section>
      ) : null}

      <section className="sidebar-widget">
        <h2 className="sidebar-widget-title">POPULAR</h2>
        {popularPosts.length === 0 ? (
          <p className="text-[13px] text-[var(--post-meta)]">ยังไม่มีโพสต์ยอดนิยม</p>
        ) : (
          <div>
            {popularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="popular-row block">
                <div className="popular-thumb">
                  <Image src={post.coverImage} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="popular-info">
                  <div className="popular-title">{post.title}</div>
                  <div className="popular-date">{formatDateThai(post.date)}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="sidebar-widget featured-block">
        <h2 className="sidebar-widget-title">Featured Post</h2>
        {featuredPost ? (
          <Link href={`/blog/${featuredPost.slug}`} className="featured-block">
            <span className="featured-thumb relative block aspect-video w-full overflow-hidden rounded-[3px]">
              <Image
                src={featuredPost.coverImage}
                alt=""
                fill
                sizes="340px"
                className="object-cover"
                priority
              />
            </span>
            <p className="featured-date">{formatDateThai(featuredPost.date)}</p>
            <h3 className="featured-title">{featuredPost.title}</h3>
          </Link>
        ) : (
          <p className="text-[13px] text-[var(--post-meta)]">ยังไม่มีโพสต์แนะนำ</p>
        )}
      </section>

      <section className="sidebar-widget">
        <h2 className="sidebar-widget-title">TAGS</h2>
        <div className="tag-cloud">
          {tagsWithCounts.map(({ tag, count }) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}>
              {tag} ({count})
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
