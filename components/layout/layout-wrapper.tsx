import type { ReactNode } from "react";

import { BackToTop } from "@/components/ui/back-to-top";

import { Header } from "./header";

type LayoutWrapperProps = {
  children: ReactNode;
};

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <>
      <Header />
      <div className="site-outer">
        <div className="site-content">{children}</div>
        <footer className="site-footer">SATITER © 2026</footer>
      </div>
      <BackToTop />
    </>
  );
}
