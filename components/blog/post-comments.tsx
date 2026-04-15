"use client";

import dynamic from "next/dynamic";

const GiscusLazy = dynamic(
  () => import("./giscus-comments").then((m) => ({ default: m.GiscusComments })),
  {
    ssr: false,
    loading: () => <p className="text-sm text-gray-400">กำลังโหลดความคิดเห็น…</p>,
  },
);

/** Client-only boundary so `next/dynamic` with `ssr: false` is valid under Next.js 16. */
export function PostComments() {
  return <GiscusLazy />;
}
