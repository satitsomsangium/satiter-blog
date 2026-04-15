export default function BlogPostLoading() {
  return (
    <div className="mx-auto max-w-[720px] animate-pulse px-4 py-8 md:px-0" aria-busy>
      <div className="mb-6 h-5 w-24 rounded-full bg-gray-100" />
      <div className="mb-4 h-9 w-3/4 max-w-xl rounded-lg bg-gray-100" />
      <div className="mb-6 h-4 w-40 rounded bg-gray-100" />
      <div className="space-y-3 border-t border-gray-100 pt-8">
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-5/6 rounded bg-gray-100" />
      </div>
    </div>
  );
}
