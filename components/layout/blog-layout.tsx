import type { ReactNode } from "react";

type BlogLayoutProps = {
  main: ReactNode;
  sidebar: ReactNode;
};

/** Main + sidebar: mobile stacked; `md:` two columns (~65% / ~35%), max width 1200px centered. */
export function BlogLayout({ main, sidebar }: BlogLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:items-start md:gap-10 md:px-6">
      <div className="min-w-0 flex-1 md:w-[65%] md:flex-none md:basis-[65%]">{main}</div>
      <div className="hidden min-w-0 md:block md:w-[35%] md:flex-none md:basis-[35%] md:sticky md:top-20 md:self-start">{sidebar}</div>
    </div>
  );
}
