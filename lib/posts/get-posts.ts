import fs from "node:fs/promises";
import path from "node:path";

import type { ReactNode } from "react";
import matter from "gray-matter";
import { unstable_cache } from "next/cache";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import type { PostMeta } from "@/types/post";

import { CONTENT_DIRECTORY } from "./constants";
import { createPostMdxComponents } from "./mdx-components";
import { normalizePostFrontmatter } from "./normalize";
import { getReadingTimeMinutesFromText } from "./reading-time";

export type SidebarData = {
  popularPosts: PostMeta[];
  featuredPost: PostMeta | null;
  tagsWithCounts: Array<{ tag: string; count: number }>;
};

export type CompiledPost = {
  meta: PostMeta;
  content: ReactNode;
};

function fileNameToSlug(name: string) {
  return name.replace(/\.mdx$/, "");
}

async function readPostSource(slug: string) {
  const filePath = path.join(CONTENT_DIRECTORY, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

async function listMdxFileNames() {
  const entries = await fs.readdir(CONTENT_DIRECTORY);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

function toPostMeta(slug: string, fm: ReturnType<typeof normalizePostFrontmatter>, body: string): PostMeta {
  return {
    ...fm,
    slug,
    readingTimeMinutes: getReadingTimeMinutesFromText(body),
  };
}

/** Plain-text excerpt from MDX body for meta descriptions (no MDX compile). */
function mdxBodyToPlainExcerpt(mdxBody: string, maxLen: number): string {
  const collapsed = mdxBody
    .replace(/^import\s+.+$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]+`/g, " ")
    .replace(/<[^>\n]+\/?>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-~|]+/g, "")
    .replace(/\{[^}\n]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!collapsed) {
    return "";
  }
  if (collapsed.length <= maxLen) {
    return collapsed;
  }
  return `${collapsed.slice(0, Math.max(0, maxLen - 1)).trimEnd()}…`;
}

export type PostSeoSnapshot = {
  meta: PostMeta;
  /** First ~160 characters of body as plain text. */
  excerpt: string;
};

/** Metadata-only post load (no MDX compile) — for `generateMetadata`. */
export async function getPostSeoSnapshot(slug: string): Promise<PostSeoSnapshot | null> {
  let source: string;
  try {
    source = await readPostSource(slug);
  } catch {
    return null;
  }

  const parsed = matter(source);
  const fm = normalizePostFrontmatter(parsed.data as Record<string, unknown>);
  if (!fm.published) {
    return null;
  }

  const body = parsed.content;
  const meta = toPostMeta(slug, fm, body);
  const excerpt = mdxBodyToPlainExcerpt(body, 160);
  return { meta, excerpt };
}

async function loadAllPostsUncached(): Promise<PostMeta[]> {
  const fileNames = await listMdxFileNames();
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileNameToSlug(fileName);
      const source = await readPostSource(slug);
      const parsed = matter(source);
      const fm = normalizePostFrontmatter(parsed.data as Record<string, unknown>);
      return toPostMeta(slug, fm, parsed.content);
    }),
  );

  const visible = posts.filter((p) => p.published);
  return visible.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Cached list of published posts — safe JSON, ideal for grids, sidebars, and sitemap. */
export const getAllPosts = unstable_cache(loadAllPostsUncached, ["blog-posts-meta"], {
  revalidate: 3600,
  tags: ["posts"],
});

/** Legacy export name used across pages before the `/content` migration. */
export const getAllPostsMeta = getAllPosts;

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

type CompileMdxInput = Parameters<typeof compileMDX>[0];

/** Plugin tuple inference from `rehype-pretty-code` is wider than MDX `Pluggable[]` — cast at the boundary. */
const mdxCompileOptions = {
  parseFrontmatter: false as const,
  mdxOptions: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          defaultLanguage: "text",
        },
      ],
    ],
  },
} as CompileMdxInput["options"];

/** Loads and compiles a single MDX post (not cached — RSC payload is not serializable). */
export async function getPostBySlug(slug: string): Promise<CompiledPost | null> {
  let source: string;
  try {
    source = await readPostSource(slug);
  } catch {
    return null;
  }

  const parsed = matter(source);
  const fm = normalizePostFrontmatter(parsed.data as Record<string, unknown>);
  if (!fm.published) {
    return null;
  }

  const body = parsed.content;
  const meta = toPostMeta(slug, fm, body);

  const { content } = await compileMDX({
    source: body,
    options: mdxCompileOptions,
    components: createPostMdxComponents(),
  });

  return { meta, content };
}

/** Up to `limit` posts: `isPopular` first (newest), then fill with newest overall. */
export async function getPopularPosts(limit = 3): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const popular = all.filter((p) => p.isPopular).sort((a, b) => (a.date < b.date ? 1 : -1));
  const out: PostMeta[] = [];
  const used = new Set<string>();

  for (const p of popular) {
    if (out.length >= limit) {
      break;
    }
    out.push(p);
    used.add(p.slug);
  }

  for (const p of all) {
    if (out.length >= limit) {
      break;
    }
    if (used.has(p.slug)) {
      continue;
    }
    out.push(p);
    used.add(p.slug);
  }

  return out.slice(0, limit);
}

export async function getFeaturedPost(): Promise<PostMeta | null> {
  const all = await getAllPosts();
  const featured = all.filter((p) => p.featured).sort((a, b) => (a.date < b.date ? 1 : -1));
  return featured[0] ?? null;
}

export async function getTagsWithCounts() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag, "th"));
}

export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getSidebarData(): Promise<SidebarData> {
  const [popularPosts, featuredPost, tagsWithCounts] = await Promise.all([
    getPopularPosts(3),
    getFeaturedPost(),
    getTagsWithCounts(),
  ]);
  return { popularPosts, featuredPost, tagsWithCounts };
}
