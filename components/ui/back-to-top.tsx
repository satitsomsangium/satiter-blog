"use client";

import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 420;

/** Floating control — smooth-scrolls to top after the reader moves down the page. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      className={[
        "fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg leading-none text-gray-700 shadow-sm transition-all duration-150 ease-out hover:bg-gray-50 hover:text-blue-600",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
      onClick={goTop}
      aria-label="กลับขึ้นด้านบน"
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
