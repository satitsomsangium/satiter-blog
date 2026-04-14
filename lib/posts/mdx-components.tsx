import type { ImgHTMLAttributes } from "react";

import { MdxImage } from "@/components/mdx/mdx-image";

/**
 * `MdxImage` is the supported way to embed figures in posts (`next/image`, responsive, lazy by default).
 * `img` is still mapped for rare markdown, but authors should prefer `<MdxImage />` in MDX.
 */
export function createPostMdxComponents() {
  return {
    MdxImage,
    img: function MarkdownImg(props: ImgHTMLAttributes<HTMLImageElement>) {
      const { src, alt, width, height, className } = props;
      if (!src || typeof src !== "string") {
        return null;
      }
      const w = width === undefined ? undefined : Number(width);
      const h = height === undefined ? undefined : Number(height);
      return (
        <MdxImage
          src={src}
          alt={alt}
          width={w !== undefined && Number.isFinite(w) && w > 0 ? w : undefined}
          height={h !== undefined && Number.isFinite(h) && h > 0 ? h : undefined}
          className={className}
        />
      );
    },
  };
}
