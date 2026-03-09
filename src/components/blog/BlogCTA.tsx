"use client";

import Link from "next/link";
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
          {variant === "direct"
            ? "Give your agent these instructions and it sets up its own inbox. No API keys, no human signup."
            : "Give your agent these instructions and it creates its own inbox, sends and receives email on its own. Free to start."}
        </p>

        <div className="w-full max-w-sm">
          <CopySnippetBlock
            label="lobstermail.ai/skill"
            badgeLabel="Copy"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="link-underline text-sm text-secondary transition-colors hover:text-foreground"
          >
            Docs <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/pricing"
            className="link-underline text-sm text-secondary transition-colors hover:text-foreground"
          >
            Pricing <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
