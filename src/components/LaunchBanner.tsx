"use client";

import { useCallback, useState } from "react";
import { GetStartedPopup } from "./GetStartedPopup";

export function LaunchBanner() {
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setBannerHeight(node.offsetHeight);
    });
    ro.observe(node);
  }, []);

  return (
    <>
    <div
      ref={bannerRef}
      className="fixed top-[70px] left-0 right-0 z-40 w-full overflow-hidden py-2 px-4 text-center text-sm font-medium text-black bg-accent"
      style={{
        animation: "banner-bg-pulse 4s ease-in-out infinite",
      }}
    >
      {/* Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
          animation: "banner-shimmer 7s ease-in-out 2s infinite",
        }}
      />

      <span className="relative">
        Launch
        <span className="opacity-50 mx-2">-</span>
        Free 3 months Builder plan
        <span className="opacity-50 mx-2">-</span>
        <GetStartedPopup
          triggerClassName="underline underline-offset-2 hover:opacity-60 transition-opacity font-medium text-black cursor-pointer"
          triggerContent="Claim yours →"
        />
      </span>
    </div>
    {bannerHeight > 0 && <div style={{ height: bannerHeight }} aria-hidden />}
    </>
  );
}
