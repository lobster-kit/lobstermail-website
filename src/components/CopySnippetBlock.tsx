"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LOBSTERMAIL_INSTRUCTIONS } from "@/lib/constants";

interface CopySnippetBlockProps {
  onCopy?: () => void;
  label?: string;
  badgeLabel?: string;
}

export function CopySnippetBlock({
  onCopy,
  label = "lobstermail.ai/skill",
  badgeLabel = "Copy",
}: CopySnippetBlockProps) {
  const { copied, handleCopy } = useCopyToClipboard({
    text: LOBSTERMAIL_INSTRUCTIONS,
    onCopy,
  });

  return (
    <div
      data-theme="dark"
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCopy();
      }}
      className="group w-full cursor-pointer overflow-hidden rounded-xl border-2 bg-terminal transition-all hover:bg-[#141414]"
      style={{
        borderColor: "var(--snippet-border)",
        boxShadow: "var(--snippet-shadow)",
      }}
    >
      <div className="flex w-full items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex min-w-0 flex-1">
          <span className="truncate font-mono text-[14px] text-snippet-link">
            {label}
          </span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md border-2 border-accent bg-accent/10 px-2.5 py-1 text-xs text-accent transition-colors group-hover:border-accent group-hover:bg-accent/20">
          {copied ? (
            <>
              <Check size={13} weight="bold" className="animate-icon-pop" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={13} />
              {badgeLabel}
            </>
          )}
        </span>
      </div>
    </div>
  );
}
