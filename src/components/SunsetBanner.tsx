"use client";

import { useRef, useState, useEffect } from "react";

export function SunsetBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = useState(36); // sensible default to avoid layout shift

  useEffect(() => {
    const node = bannerRef.current;
    if (!node) return;

    // Measure immediately
    setBannerHeight(node.offsetHeight);

    // Keep in sync on resize
    const ro = new ResizeObserver(() => {
      setBannerHeight(node.offsetHeight);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div
        ref={bannerRef}
        className="fixed top-[70px] left-0 right-0 z-40 w-full overflow-hidden py-2 px-4 text-center text-sm font-medium text-black bg-accent"
      >
        <span className="relative">
          LobsterMail is shutting down on August 17, 2026
          <span className="opacity-50 mx-2">-</span>
          existing accounts work until then; new signups are closed
          <span className="opacity-50 mx-2">-</span>
          <a
            href="https://api.lobstermail.ai/sunset"
            className="underline underline-offset-2 hover:opacity-60 transition-opacity font-medium text-black"
          >
            What this means for you →
          </a>
        </span>
      </div>
      <div style={{ height: bannerHeight }} aria-hidden />
    </>
  );
}
