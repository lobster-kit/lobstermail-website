"use client";

import { useState, useEffect } from "react";
import type { CodeLanguage } from "@/lib/use-cases";

interface CodeSwitcherProps {
  languages: CodeLanguage[];
}

const STORAGE_KEY = "lobstermail-code-lang";

export function CodeSwitcher({ languages }: CodeSwitcherProps) {
  const [activeKey, setActiveKey] = useState(languages[0]?.key ?? "typescript");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && languages.some((l) => l.key === stored)) {
        setActiveKey(stored);
      }
    } catch {}
  }, [languages]);

  function selectLanguage(key: string) {
    setActiveKey(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  }

  const current = languages.find((l) => l.key === activeKey) ?? languages[0];

  return (
    <div className="mx-auto max-w-[650px]">
      {/* Language tabs */}
      <div className="mb-3 flex justify-center gap-1">
        {languages.map((lang) => (
          <button
            key={lang.key}
            onClick={() => selectLanguage(lang.key)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
              lang.key === activeKey
                ? "bg-accent-muted text-accent"
                : "bg-background text-secondary hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Terminal window */}
      <div
        data-theme="dark"
        className="overflow-hidden rounded-xl border-2 border-edge bg-terminal"
      >
        <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-xs text-secondary">
            {current.filename}
          </span>
        </div>
        <pre className="overflow-x-auto px-6 py-5 font-mono text-[13px] leading-relaxed text-foreground">
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  );
}
