import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

export type PostFrontmatter = {
  title: string;
  date: string;
  tags: string[];
  thumbnail: string;
  featured: boolean;
  popular: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");

function formatDateThai(dateInput: string) {
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateInput));
}

async function getPostFileNames() {
  const entries = await fs.readdir(POSTS_DIRECTORY);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

function parsePostFile(fileName: string, source: string): PostMeta {
  const { data } = matter(source);

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    thumbnail: String(data.thumbnail ?? ""),
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
  };
}

export async function getAllPostsMeta() {
  const fileNames = await getPostFileNames();

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(POSTS_DIRECTORY, fileName);
      const source = await fs.readFile(filePath, "utf8");
      return parsePostFile(fileName, source);
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const { frontmatter, content } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    meta: {
      ...frontmatter,
      slug,
    },
    content,
  };
}

export async function getPopularPosts() {
  const posts = await getAllPostsMeta();
  return posts.filter((post) => post.popular);
}

export async function getFeaturedPost() {
  const posts = await getAllPostsMeta();
  return posts.find((post) => post.featured) ?? null;
}

export async function getTagsWithCounts() {
  const posts = await getAllPostsMeta();
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
  const posts = await getAllPostsMeta();
  return posts.filter((post) => post.tags.includes(tag));
}

export function getThaiDateText(dateInput: string) {
  return formatDateThai(dateInput);
}

export type SidebarData = {
  popularPosts: PostMeta[];
  featuredPost: PostMeta | null;
  tagsWithCounts: Array<{ tag: string; count: number }>;
};

export async function getSidebarData(): Promise<SidebarData> {
  const [popularPosts, featuredPost, tagsWithCounts] = await Promise.all([
    getPopularPosts(),
    getFeaturedPost(),
    getTagsWithCounts(),
  ]);
  return { popularPosts, featuredPost, tagsWithCounts };
}
