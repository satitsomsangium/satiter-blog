"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { SITE_NAV } from "@/lib/site-nav";

import { HeaderSocial } from "./header-social";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-10 w-10 flex-col items-center justify-center gap-1.5" aria-hidden>
      <span
        className={`block h-0.5 w-5 rounded-full bg-gray-900 transition-transform duration-150 ease-out ${open ? "translate-y-2 rotate-45" : ""}`}
      />
      <span className={`block h-0.5 w-5 rounded-full bg-gray-900 transition-opacity duration-150 ease-out ${open ? "opacity-0" : ""}`} />
      <span
        className={`block h-0.5 w-5 rounded-full bg-gray-900 transition-transform duration-150 ease-out ${open ? "-translate-y-2 -rotate-45" : ""}`}
      />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex items-center justify-center rounded-lg p-1 text-gray-900 transition-colors duration-150 ease-out hover:bg-gray-100"
        aria-expanded={open}
        aria-controls="mobile-nav-sheet"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 transition-opacity duration-150 ease-out"
            aria-label="ปิดเมนู"
            onClick={close}
          />
          <nav
            id="mobile-nav-sheet"
            className="relative max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white px-5 pb-8 pt-6 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
            aria-label="เมนูหลัก"
          >
            <ul className="flex flex-col gap-1">
              {SITE_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-gray-900 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-blue-600"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-gray-100 pt-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">ติดตาม</p>
              <HeaderSocial />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
