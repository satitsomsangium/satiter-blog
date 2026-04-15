/**
 * Site search (GET `/search?q=`) — lives at top of listing feeds; not in the header.
 */
export function FeedSearch() {
  return (
    <form action="/search" method="get" className="mb-4 px-4 pt-3 md:mb-6 md:px-0 md:pt-0" role="search">
      <label htmlFor="feed-search-q" className="sr-only">
        ค้นหาโพสต์
      </label>
      <input
        id="feed-search-q"
        name="q"
        type="search"
        placeholder="ค้นหา…"
        className="w-full rounded-full border-none bg-gray-100 px-4 py-2 text-[15px] text-gray-800 transition-shadow duration-150 ease-out placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
    </form>
  );
}
