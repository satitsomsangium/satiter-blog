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
    <article className="border-b border-gray-100 md:border-b-0">
      <Link
        href={`/blog/${slug}`}
        className="group block md:overflow-hidden md:rounded-xl md:transition-shadow md:duration-150 md:ease-out md:hover:shadow-sm"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 md:rounded-t-xl">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />
        </div>
        <div className="px-4 pb-5 pt-3 md:px-4 md:py-3">
          {tags.length > 0 ? (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-[#111] transition-colors duration-150 ease-out group-hover:text-blue-600">
            {title}
          </h2>
          <p className="mt-1 text-sm text-gray-400">{dateText}</p>
        </div>
      </Link>
    </article>
  );
}
