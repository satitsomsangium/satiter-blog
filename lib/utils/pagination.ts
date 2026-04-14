export const POSTS_PER_PAGE = 12;

export function parsePageParam(raw: string | string[] | undefined): number {
  const s = Array.isArray(raw) ? raw[0] : raw;
  const n = parseInt(s ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) {
    return 1;
  }
  return n;
}

export function getTotalPages(itemCount: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(itemCount / perPage));
}

export function clampPage(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), totalPages);
}

export function sliceForPage<T>(items: T[], page: number, perPage = POSTS_PER_PAGE): T[] {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

/** สร้าง URL สำหรับลิงก์หน้า (เก็บ query อื่น เช่น `q` สำหรับ search) */
export function buildPaginatedHref(pathname: string, page: number, preserveQuery?: Record<string, string>): string {
  const params = new URLSearchParams();
  if (preserveQuery) {
    for (const [key, value] of Object.entries(preserveQuery)) {
      if (value) {
        params.set(key, value);
      }
    }
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}
