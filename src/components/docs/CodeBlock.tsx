"use client";

import { useState } from "react";
import { Copy, Check } from "@phosphor-icons/react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const langMatch = className?.match(/language-(\w+)/);
  const language = props["data-language"] || langMatch?.[1] || "";

  function handleCopy() {
    // Extract text content from the code block
    const el = document.createElement("div");
    if (typeof children === "string") {
      el.textContent = children;
    } else {
      // For React elements, we need to find the text content from the pre element
      const pre = document.querySelector("[data-copying]");
      if (pre) {
        el.textContent = pre.textContent;
      }
    }

    const text = el.textContent ?? "";
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="group relative my-6" data-theme="dark">
      {/* Language label */}
      {language && (
        <div className="absolute top-0 left-4 -translate-y-1/2 px-2.5 py-0.5 rounded-md bg-surface-4 border border-edge-subtle text-[11px] font-mono text-secondary uppercase tracking-wider z-10">
          {language}
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md text-secondary/60 hover:text-foreground hover:bg-surface-4 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 z-10"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? (
          <Check size={16} className="text-green-400 animate-icon-pop" />
        ) : (
          <Copy size={16} />
        )}
      </button>

      {/* Code content */}
      <pre
        className={`overflow-x-auto rounded-xl border-2 border-edge bg-terminal p-5 pt-6 font-mono text-[14px] leading-relaxed text-white shadow-[0_0_24px_-4px_rgba(187,221,247,0.15)] ${className ?? ""}`}
        data-copying
      >
        {children}
      </pre>
    </div>
  );
}
