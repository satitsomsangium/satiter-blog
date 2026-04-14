import { NextResponse } from "next/server";

import { filterPostsByQuery, getAllPosts } from "@/lib/posts";

/**
 * JSON search endpoint — mirrors client-side filtering today; later can swap in
 * full-text, external index, or AI retrieval without changing the response shape.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const posts = await getAllPosts();
  const results = filterPostsByQuery(posts, q);
  return NextResponse.json({ results });
}
