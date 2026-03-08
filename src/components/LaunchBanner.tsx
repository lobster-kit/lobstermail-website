"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GetStartedPopup } from "./GetStartedPopup";

export function LaunchBanner() {
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState<number | null>(null);
  const [bannerHeight, setBannerHeight] = useState(0);
  const hasAnimated = useRef(false);
  const bannerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setBannerHeight(node.offsetHeight);
    });
    ro.observe(node);
  }, []);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const res = await fetch("/api/stats");
        if (!res.ok) return;
        const data = await res.json();
        setSpotsRemaining(Math.max(0, 1000 - (data.accounts?.total ?? 0)));
      } catch {
        // silently fail — banner still shows without the count
      }
    }

    fetchSpots();
    const interval = setInterval(fetchSpots, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Count-down animation when spots first load
  useEffect(() => {
    if (spotsRemaining === null || hasAnimated.current) return;
    hasAnimated.current = true;

    const start = Math.min(spotsRemaining + 47, 1000);
    const duration = 900;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start - (start - spotsRemaining!) * eased);
      setDisplayCount(current);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [spotsRemaining]);

  const isClosed = spotsRemaining === 0;
  const shownCount = displayCount ?? spotsRemaining;

  return (
    <>
    <div
      ref={bannerRef}
      className="fixed top-[70px] left-0 right-0 z-40 w-full overflow-hidden py-2 px-4 text-center text-sm font-medium text-black bg-accent"
      style={{
        animation: "banner-bg-pulse 4s ease-in-out infinite",
      }}
    >
      {/* 1. Shimmer sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
          animation: "banner-shimmer 7s ease-in-out 2s infinite",
        }}
      />

      {isClosed ? (
        <span className="relative">
          Free trial closed —{" "}
          <a
            href="#pricing"
            className="underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Builder starts at $9/mo →
          </a>
        </span>
      ) : (
        <span className="relative">
          Launch
          <span className="opacity-50 mx-2">-</span>
          {shownCount !== null ? (
            <>
              <strong>{shownCount.toLocaleString()}</strong>
              <span className="opacity-75">/1,000</span>
            </>
          ) : (
            <span>limited</span>
          )}
          {" free spots left for free 3 months Builder plan"}
          <span className="opacity-50 mx-2">-</span>
          <GetStartedPopup
            triggerClassName="underline underline-offset-2 hover:opacity-60 transition-opacity font-medium text-black cursor-pointer"
            triggerContent="Claim yours"
          />
        </span>
      )}
    </div>
    {bannerHeight > 0 && <div style={{ height: bannerHeight }} aria-hidden />}
    </>
  );
}
