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
            ? "Install the skill, and your agent creates its own inbox. No API keys, no human signup."
            : "LobsterMail lets your agent create inboxes, send and receive email on its own. Free to start."}
        </p>

        <div className="w-full max-w-sm">
          <CopySnippetBlock
            label="lobstermail.ai/skill"
            badgeLabel="Copy"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/getting-started"
            className="rounded-lg border-2 border-accent bg-accent/10 px-5 py-2 text-sm font-medium text-accent shadow-[0_4px_8px_3px_rgba(251,87,5,0.15),0_1px_3px_0_rgba(0,0,0,0.30)] transition-all hover:bg-accent/20 hover:shadow-[0_6px_12px_3px_rgba(251,87,5,0.20),0_2px_4px_0_rgba(0,0,0,0.30)]"
          >
            Get started free
          </Link>
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
