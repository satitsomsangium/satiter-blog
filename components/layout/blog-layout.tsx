import type { ReactNode } from "react";

type BlogLayoutProps = {
  main: ReactNode;
  sidebar: ReactNode;
};

/** Two-column main + sidebar — spacing from `.blog-layout` in global styles. */
export function BlogLayout({ main, sidebar }: BlogLayoutProps) {
  return (
    <div className="blog-layout">
      <div className="blog-layout__main">{main}</div>
      {sidebar}
    </div>
  );
}
