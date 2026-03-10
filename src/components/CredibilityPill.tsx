"use client";

import { Newspaper, ArrowUpRight } from "@phosphor-icons/react";

export function CredibilityPill() {
  return (
    <a
      href="https://betakit.com/palisade-closes-1-5-million-cad-launches-email-deliverability-score-tool/"
      target="_blank"
      rel="noopener noreferrer"
      className="credibility-pill group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium text-secondary transition-all duration-300 hover:text-foreground hover:-translate-y-0.5"
    >
      {/* Spinning gradient border */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          padding: "1px",
          background:
            "conic-gradient(from var(--border-angle), transparent 40%, var(--color-accent) 50%, transparent 60%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "pill-border-spin 4s linear infinite",
        }}
      />

      {/* Glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-accent/[0.06]" />

      {/* Shimmer sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          style={{ animation: "pill-shimmer 6s ease-in-out infinite" }}
        />
      </span>

      {/* Content */}
      <Newspaper weight="duotone" className="relative size-4 shrink-0 text-accent" />
      <span className="relative">
        Built by the team behind{" "}
        <span className="text-foreground font-semibold">Palisade</span>
      </span>
      <ArrowUpRight
        weight="bold"
        className="relative size-3 shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-70 group-hover:translate-x-0"
      />
    </a>
  );
}
