"use client";

import { CopySnippetBlock } from "../CopySnippetBlock";

interface BlogCTAProps {
  variant?: "soft" | "direct";
}

export function BlogCTA({ variant = "soft" }: BlogCTAProps) {
  return (
    <aside className="mt-12 overflow-hidden rounded-2xl border-2 border-edge bg-background">
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(251,87,5,0.06), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-5 px-8 py-10 text-center sm:px-12">
        <h3 className="text-lg font-bold tracking-tight sm:text-xl">
          {variant === "direct"
            ? "Give your agent email in 60 seconds"
            : "Your agent can have its own email"}
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-secondary">
          Copy this and give it to your agent. It will set up its own inbox automatically.
        </p>

        <div className="w-full max-w-sm">
          <CopySnippetBlock
            label="lobstermail.ai/skill"
            badgeLabel="Copy"
          />
        </div>
      </div>
    </aside>
  );
}
