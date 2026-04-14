export default function BlogPostLoading() {
  return (
    <div className="item-post item-post-with-sidebar animate-pulse" aria-busy>
      <div className="mb-4 h-7 w-3/4 max-w-xl rounded bg-[var(--border-soft)]" />
      <div className="mb-6 h-4 w-40 rounded bg-[var(--border-soft)]" />
      <div className="space-y-3 border-t border-[var(--border-soft)] pt-6">
        <div className="h-4 w-full rounded bg-[var(--border-soft)]" />
        <div className="h-4 w-full rounded bg-[var(--border-soft)]" />
        <div className="h-4 w-5/6 rounded bg-[var(--border-soft)]" />
      </div>
    </div>
  );
}
