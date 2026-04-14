import type { PostMeta } from "@/types/post";
import { formatDateThai } from "@/lib/utils/date";

import { PostCard } from "./post-card";

type PostGridProps = {
  posts: PostMeta[];
  /** ค่าเริ่มต้น `section` + `aria-label` — ใช้ `div` เมื่ออยู่ใน `<section>` ที่มีหัวข้อแล้ว (เช่น โพสต์ที่เกี่ยวข้อง) */
  as?: "section" | "div";
  ariaLabel?: string;
};

const gridClass =
  "post-grid grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3";

/** การ์ดแถวแรกบน grid (สูงสุด 3 คอลัมน์) — `priority` ช่วย LCP โดยไม่ preload มากเกินไป */
const PRIORITY_CARD_COUNT = 3;

export function PostGrid({ posts, as = "section", ariaLabel = "Latest posts" }: PostGridProps) {
  const cards = posts.map((post, index) => (
    <PostCard
      key={post.slug}
      slug={post.slug}
      title={post.title}
      dateText={formatDateThai(post.date)}
      coverImage={post.coverImage}
      tags={post.tags}
      priority={index < PRIORITY_CARD_COUNT}
    />
  ));

  if (as === "div") {
    return <div className={gridClass}>{cards}</div>;
  }

  return (
    <section aria-label={ariaLabel} className={gridClass}>
      {cards}
    </section>
  );
}
