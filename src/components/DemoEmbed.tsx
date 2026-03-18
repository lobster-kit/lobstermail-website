"use client";

import { useEffect, useRef } from "react";

interface DemoEmbedProps {
  src: string;
  title: string;
}

export function DemoEmbed({ src, title }: DemoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateScale() {
      const el = containerRef.current;
      if (!el) return;
      const scale = el.clientWidth / 480;
      el.style.setProperty("--demo-scale", String(scale));
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[396px] rounded-[23px] shadow-[0_0_40px_-8px_rgba(59,130,246,0.5)]">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-[23px]"
        style={{ aspectRatio: "480 / 780" }}
      >
        <iframe
          src={src}
          title={title}
          scrolling="no"
          className="absolute left-0 top-0 h-[780px] w-[480px] origin-top-left border-none"
          style={{ transform: "scale(var(--demo-scale, 1))" }}
        />
      </div>
    </div>
  );
}
