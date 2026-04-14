"use client";

import Giscus from "@giscus/react";

/**
 * GitHub Discussions–powered comments. Set in `.env.local`:
 * - NEXT_PUBLIC_GISCUS_REPO (e.g. `owner/repo`)
 * - NEXT_PUBLIC_GISCUS_REPO_ID
 * - NEXT_PUBLIC_GISCUS_CATEGORY_ID
 * Optional: NEXT_PUBLIC_GISCUS_CATEGORY, NEXT_PUBLIC_GISCUS_MAPPING
 */
export function GiscusComments() {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Announcements";
  const mapping = (process.env.NEXT_PUBLIC_GISCUS_MAPPING as "pathname" | "url" | "title" | "og:title" | "specific" | "number" | undefined) ?? "pathname";

  if (!repo || !repoId || !categoryId) {
    return null;
  }

  return (
    <div className="mt-10 border-t border-[var(--border-soft)] pt-6">
      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category={category}
        categoryId={categoryId}
        mapping={mapping}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="light"
        lang="th"
      />
    </div>
  );
}
