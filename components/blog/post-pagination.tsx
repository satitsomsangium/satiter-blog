import Link from "next/link";

import { buildPaginatedHref } from "@/lib/utils/pagination";

type PostPaginationProps = {
  currentPage: number;
  totalPages: number;
  /** เช่น `/` หรือ `/tag/${encodeURIComponent(tag)}` */
  pathname: string;
  /** query ที่ต้องคงไว้ (ไม่รวม `page`) */
  preserveQuery?: Record<string, string>;
};

function pageItems(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const set = new Set<number>([1, total, current, current - 1, current + 1]);
  for (const n of [...set]) {
    if (n < 1 || n > total) {
      set.delete(n);
    }
  }
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev > 0 && n - prev > 1) {
      out.push("gap");
    }
    out.push(n);
    prev = n;
  }
  return out;
}

export function PostPagination({ currentPage, totalPages, pathname, preserveQuery }: PostPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = pageItems(currentPage, totalPages);
  const prevHref = currentPage > 1 ? buildPaginatedHref(pathname, currentPage - 1, preserveQuery) : null;
  const nextHref = currentPage < totalPages ? buildPaginatedHref(pathname, currentPage + 1, preserveQuery) : null;

  return (
    <nav className="post-pagination" aria-label="เลือกหน้า">
      <div className="post-pagination__inner">
        {prevHref ? (
          <Link href={prevHref} className="post-pagination__btn post-pagination__btn--prev" rel="prev">
            ก่อนหน้า
          </Link>
        ) : (
          <span className="post-pagination__btn post-pagination__btn--prev post-pagination__btn--disabled" aria-disabled>
            ก่อนหน้า
          </span>
        )}

        <ul className="post-pagination__pages">
          {items.map((item, idx) =>
            item === "gap" ? (
              <li key={`gap-${idx}`} className="post-pagination__gap" aria-hidden>
                …
              </li>
            ) : (
              <li key={item}>
                {item === currentPage ? (
                  <span className="post-pagination__page post-pagination__page--current" aria-current="page">
                    {item}
                  </span>
                ) : (
                  <Link href={buildPaginatedHref(pathname, item, preserveQuery)} className="post-pagination__page">
                    {item}
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>

        {nextHref ? (
          <Link href={nextHref} className="post-pagination__btn post-pagination__btn--next" rel="next">
            ถัดไป
          </Link>
        ) : (
          <span className="post-pagination__btn post-pagination__btn--next post-pagination__btn--disabled" aria-disabled>
            ถัดไป
          </span>
        )}
      </div>
    </nav>
  );
}
