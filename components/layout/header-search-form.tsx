/**
 * GET `/search?q=...` — กด Enter ในช่องค้นหาแล้วไปหน้าผลลัพธ์ (ไม่มี debounce / dropdown)
 */
export function HeaderSearchForm() {
  return (
    <form action="/search" method="get" className="site-header-nav-search header-search-form" role="search">
      <label htmlFor="nav-search-q" className="sr-only">
        ค้นหาโพสต์
      </label>
      <input
        id="nav-search-q"
        name="q"
        type="search"
        placeholder="ค้นหา…"
        className="blog-search-input"
        autoComplete="off"
      />
    </form>
  );
}
