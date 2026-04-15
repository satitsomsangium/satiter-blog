import Link from "next/link";

import { SITE_NAV } from "@/lib/site-nav";

import { HeaderSocial } from "./header-social";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-[20px] font-bold leading-none text-[#111] transition-colors duration-150 ease-out hover:text-blue-600"
        >
          SATITER
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="หลัก">
          {SITE_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-800 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}
          <HeaderSocial className="ml-2 border-l border-gray-100 pl-4" />
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
