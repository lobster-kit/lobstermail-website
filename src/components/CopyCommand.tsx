"use client";

import { useState, useCallback } from "react";
import { Button } from "react-aria-components";

export function CopyCommand({ command = "npm install lobstermail" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, [command]);

  return (
    <Button
      onPress={handleCopy}
      className="group relative flex items-center gap-3 whitespace-nowrap rounded-xl border border-edge-strong bg-surface-3 px-5 py-3 font-mono text-sm backdrop-blur-sm transition-all hover:border-edge-hover hover:bg-surface-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 cursor-pointer"
      aria-label={`Copy "${command}" to clipboard`}
    >
      <span className="text-secondary select-none">$</span>
      <span className="text-foreground">{command}</span>
      <span
        className="ml-2 flex items-center text-secondary transition-colors group-hover:text-foreground"
        aria-hidden="true"
      >
        {copied ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </Button>
  );
}
