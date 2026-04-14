import Image from "next/image";

const CONTENT_MAX_WIDTH = 860;

export type MdxImageProps = {
  src: string;
  /**
   * Describe the image for screen readers. Use an empty string only when the image is purely decorative.
   */
  alt?: string;
  /** Intrinsic width in pixels for `next/image` (layout / srcset). Omit to infer from `src` when possible. */
  width?: number | `${number}`;
  /** Intrinsic height in pixels for `next/image`. Omit to infer from `src` when possible. */
  height?: number | `${number}`;
  /** Tailwind/CSS on the wrapping `<figure>` — use for display width, e.g. `w-1/2` or `max-w-md`. */
  className?: string;
  /** Set for above-the-fold / LCP images; skips lazy loading. */
  priority?: boolean;
};

function parseDimensionsFromSrc(src: string): { width: number; height: number } | null {
  const wh = src.match(/\/w(\d+)-h(\d+)\//i);
  if (wh) {
    return { width: Number(wh[1]), height: Number(wh[2]) };
  }
  const s = src.match(/\/s(\d+)\//);
  if (s) {
    const w = Number(s[1]);
    return { width: w, height: Math.round((w * 10) / 16) };
  }
  return null;
}

function toPositiveNumber(value: number | `${number}` | undefined, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }
  const n = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function MdxImage({
  src,
  alt,
  width: widthProp,
  height: heightProp,
  className,
  priority = false,
}: MdxImageProps) {
  if (!src?.trim()) {
    return null;
  }

  const inferred = parseDimensionsFromSrc(src);
  const width = toPositiveNumber(widthProp, inferred?.width ?? 800);
  const height = toPositiveNumber(heightProp, inferred?.height ?? 600);
  const resolvedAlt = alt ?? "";
  const sizes = `(max-width: ${CONTENT_MAX_WIDTH}px) 100vw, ${CONTENT_MAX_WIDTH}px`;

  return (
    <figure className={["my-4 mx-auto block max-w-full", className].filter(Boolean).join(" ")}>
      <Image
        src={src}
        alt={resolvedAlt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="mx-auto block h-auto w-full max-w-full rounded-xl"
      />
    </figure>
  );
}
