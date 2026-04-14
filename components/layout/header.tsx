import Link from "next/link";

import { HeaderSearchForm } from "./header-search-form";
import { HeaderSocial } from "./header-social";

const NAV_ITEMS = [
  { href: "/", label: "หน้าหลัก" },
  { href: "/tag/กันลืม", label: "กันลืม" },
  { href: "/tag/รายงาน", label: "รายงาน" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-top">
        <div className="site-header-top-inner">
          <Link href="/" className="site-logo">
            SATITER
          </Link>
          <HeaderSocial />
        </div>
      </div>
      <nav className="site-header-nav" aria-label="หลัก">
        <div className="site-header-nav-inner">
          <div className="site-header-nav-links">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav-link">
                {item.label}
              </Link>
            ))}
          </div>
          <HeaderSearchForm />
        </div>
      </nav>
    </header>
  );
}
