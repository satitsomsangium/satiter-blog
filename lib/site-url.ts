/** Production origin for sitemaps, robots, and fixed absolute SEO assets. */
export const PRODUCTION_SITE_ORIGIN = "https://satiter.com";

/**
 * Canonical site origin without trailing slash.
 * Prefer `NEXT_PUBLIC_SITE_URL`; on Vercel previews fall back to `VERCEL_URL`.
 */
export function getBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) {
    return explicit;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function getSiteOrigin(): string {
  return getBaseUrl();
}

/** Absolute URL for a post — used by share buttons and metadata. */
export function getCanonicalPostUrl(slug: string): string {
  const origin = getSiteOrigin();
  if (!origin) {
    return "";
  }
  return `${origin}/blog/${slug}`;
}
