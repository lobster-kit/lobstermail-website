"use client";

import { useState, useCallback } from "react";

export function CodeSnippet() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("npm install lobstermail");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, []);

  return (
    <div className="glass-strong w-full rounded-2xl p-6 sm:p-8">
      {/* Single chat conversation */}
      <div className="flex flex-col gap-[35px] rounded-xl bg-surface-2 p-5 sm:p-6">
        {/* Message 1: Agent says it needs an email */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">
            A
          </span>
          <div className="rounded-2xl rounded-tl-md bg-accent/[0.08] px-4 py-2.5 font-mono text-sm text-foreground">
            I need an email address to continue, but I don&apos;t have one.
          </div>
        </div>

        {/* Message 2: Human gives the SDK */}
        <div className="flex items-start justify-end gap-3">
          <div className="flex flex-col items-end gap-2.5">
            <div className="rounded-2xl rounded-tr-md bg-surface-4 px-4 py-2.5 font-mono text-sm text-foreground">
              Here, use 🦞 LobsterMail:
            </div>
            {/* Nested terminal block */}
            <div
              data-theme="dark"
              className="w-full overflow-hidden rounded-xl border border-accent/20 bg-terminal shadow-[0_0_24px_-4px_rgba(234,67,53,0.15)]"
            >
              <button
                onClick={handleCopy}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-2.5 font-mono text-[14px]">
                  <span className="text-accent">$</span>
                  <span className="text-foreground">
                    npm install lobstermail
                  </span>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-edge-input bg-surface-3 px-2.5 py-1 text-xs text-secondary transition-colors group-hover:border-accent/30 group-hover:text-foreground">
                  {copied ? (
                    <>
                      <svg
                        className="animate-icon-pop"
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-5 text-xs font-medium text-secondary">
            H
          </span>
        </div>

        {/* Message 3: Agent confirms */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">
            A
          </span>
          <div className="rounded-2xl rounded-tl-md bg-accent/[0.08] px-4 py-2.5 font-mono text-sm text-foreground">
            Done. I&apos;m now at{" "}
            <span className="text-accent">crustacean@lobstermail.ai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
