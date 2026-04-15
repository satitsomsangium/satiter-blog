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
      <div className="flex min-h-0 w-full flex-1 flex-col bg-white">
        <div className="site-content mx-auto w-full max-w-[1200px] flex-1 px-0 pb-10 pt-2 md:px-6 md:pt-4">{children}</div>
        <footer className="border-t border-gray-100 bg-white py-5 text-center text-[13px] text-gray-400">
          SATITER © 2026
        </footer>
      </div>
      <BackToTop />
    </>
  );
}
