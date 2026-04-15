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

const pill =
  "inline-flex min-h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-150 ease-out";

export function PostPagination({ currentPage, totalPages, pathname, preserveQuery }: PostPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const items = pageItems(currentPage, totalPages);
  const prevHref = currentPage > 1 ? buildPaginatedHref(pathname, currentPage - 1, preserveQuery) : null;
  const nextHref = currentPage < totalPages ? buildPaginatedHref(pathname, currentPage + 1, preserveQuery) : null;

  return (
    <nav className="mt-8 flex w-full justify-center px-4 md:px-0" aria-label="เลือกหน้า">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {prevHref ? (
          <Link href={prevHref} className={`${pill} text-gray-700 hover:bg-gray-100`} rel="prev">
            ก่อนหน้า
          </Link>
        ) : (
          <span className={`${pill} cursor-not-allowed text-gray-300`} aria-disabled>
            ก่อนหน้า
          </span>
        )}

        <ul className="flex flex-wrap items-center justify-center gap-1.5">
          {items.map((item, idx) =>
            item === "gap" ? (
              <li key={`gap-${idx}`} className="px-1 text-gray-400" aria-hidden>
                …
              </li>
            ) : (
              <li key={item}>
                {item === currentPage ? (
                  <span className={`${pill} bg-blue-600 text-white`} aria-current="page">
                    {item}
                  </span>
                ) : (
                  <Link
                    href={buildPaginatedHref(pathname, item, preserveQuery)}
                    className={`${pill} text-gray-700 hover:bg-gray-100`}
                  >
                    {item}
                  </Link>
                )}
              </li>
            ),
          )}
        </ul>

        {nextHref ? (
          <Link href={nextHref} className={`${pill} text-gray-700 hover:bg-gray-100`} rel="next">
            ถัดไป
          </Link>
        ) : (
          <span className={`${pill} cursor-not-allowed text-gray-300`} aria-disabled>
            ถัดไป
          </span>
        )}
      </div>
    </nav>
  );
}
