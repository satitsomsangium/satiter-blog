import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
  slug: string;
  title: string;
  dateText: string;
  coverImage: string;
  tags: string[];
  /** รูปเหนือพับ — ใช้ `priority` เพื่อลดคำเตือน LCP ของ Next/Image */
  priority?: boolean;
};

export function PostCard({ slug, title, dateText, coverImage, tags, priority = false }: PostCardProps) {
  return (
    <article className="index-post-card">
      <Link href={`/blog/${slug}`} className="block">
        <div className="post-image-wrap relative aspect-[16/10] w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
        <p className="post-date">{dateText}</p>
        <h2 className="post-title line-clamp-3">{title}</h2>
        {tags.length > 0 ? (
          <div className="post-tags">
            {tags.map((tag) => (
              <span key={tag} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    </article>
  );
}
