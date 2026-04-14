import type { ComponentType, ImgHTMLAttributes } from "react";
import Image from "next/image";

/**
 * Maps markdown `img` to `next/image` for remote Blogger assets already allowlisted in `next.config`.
 * Default dimensions avoid layout shift when authors omit width/height in MDX.
 */
export function createPostMdxComponents(): Record<string, ComponentType<ImgHTMLAttributes<HTMLImageElement>>> {
  return {
    img: function MdxImage(props: ImgHTMLAttributes<HTMLImageElement>) {
      const { src, alt, width = 800, height = 600, className, ...rest } = props;
      if (!src || typeof src !== "string") {
        return null;
      }
      return (
        <Image
          {...rest}
          src={src}
          alt={alt ?? ""}
          width={Number(width)}
          height={Number(height)}
          sizes="(max-width: 860px) 100vw, 860px"
          className={["mx-auto my-4 block h-auto max-w-full rounded-[10px]", className].filter(Boolean).join(" ")}
        />
      );
    },
  };
}
