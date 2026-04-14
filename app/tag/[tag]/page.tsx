import Link from "next/link";

import { getPostsByTag, getTagsWithCounts, getThaiDateText } from "@/lib/posts";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = await getTagsWithCounts();
  return tags.map(({ tag }) => ({ tag }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const posts = await getPostsByTag(tag);

  return (
    <section className="mx-auto w-full max-w-[860px] px-1 py-2">
      <header className="mb-6 border-b-2 border-[var(--border-soft)] pb-4">
        <h1 className="text-[18px] font-bold leading-snug text-[var(--title-color)]">แท็ก: {tag}</h1>
        <p className="post-meta mt-1">{posts.length} โพสต์</p>
      </header>

      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[10px] border border-[var(--border-widget)] bg-white p-4 transition-shadow hover:shadow-[0_0_11px_rgba(33,33,33,0.2)]"
          >
            <p className="post-meta mb-1">{getThaiDateText(post.date)}</p>
            <Link
              href={`/posts/${post.slug}`}
              className="text-[14px] font-semibold text-[var(--title-color)] hover:text-[var(--main-color)]"
            >
              {post.title}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
