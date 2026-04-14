import type { ReactNode } from "react";

import { Header } from "./header";

type LayoutWrapperProps = {
  children: ReactNode;
};

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      {/* Header เต็มความกว้าง viewport — แยกจากกล่องเนื้อหา max-width เหมือน Blogger */}
      <Header />
      <div className="site-outer">
        <div className="site-content">{children}</div>
        <footer className="site-footer">SATITER © 2026</footer>
      </div>
    </>
  );
}
