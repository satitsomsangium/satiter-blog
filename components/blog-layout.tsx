import type { ReactNode } from "react";

type BlogLayoutProps = {
  main: ReactNode;
  sidebar: ReactNode;
};

/** โครงสองคอลัมน์หลัก + sidebar — ระยะห่างใน globals (.blog-layout) */
export function BlogLayout({ main, sidebar }: BlogLayoutProps) {
  return (
    <div className="blog-layout">
      <div className="blog-layout__main">{main}</div>
      {sidebar}
    </div>
  );
}
