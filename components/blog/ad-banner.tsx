type AdBannerProps = {
  /** `sidebar` matches previous widget slot; `inline` for future in-article placements. */
  variant: "sidebar" | "inline";
  className?: string;
};

/**
 * Placeholder ad surface — swap children or replace this component when wiring AdSense
 * or another network; avoids hard-coupling the layout to a vendor script.
 */
export function AdBanner({ variant, className }: AdBannerProps) {
  const minHeight = variant === "sidebar" ? "min-h-[250px]" : "min-h-[120px]";
  return (
    <div
      className={[
        "flex items-center justify-center rounded-md border border-dashed border-[var(--border-widget)] bg-[#f9f9f9] p-4 text-center",
        minHeight,
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="พื้นที่โฆษณา"
    >
      <span className="text-[12px] uppercase tracking-wide text-[var(--post-meta)]">Ad placeholder ({variant})</span>
    </div>
  );
}
