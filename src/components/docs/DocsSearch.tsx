"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { GuideMeta } from "@/lib/docs";

export function DocsSearch({ guides }: { guides: GuideMeta[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? guides.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.description.toLowerCase().includes(query.toLowerCase())
      )
    : guides;

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function navigate(slug: string) {
    setOpen(false);
    router.push(`/docs/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].slug);
    }
  }

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg border-2 border-edge-subtle bg-background text-sm text-secondary hover:border-edge-hover hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        <MagnifyingGlass size={16} />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-edge-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-secondary">
          <span className="text-xs">&#x2318;</span>K
        </kbd>
      </button>

      {/* Search modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm animate-modal-overlay-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-4 top-[15vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[60] animate-modal-in">
            <div className="rounded-2xl border-2 border-edge bg-background shadow-[0_20px_40px_-8px_rgba(0,80,171,0.25)] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-edge-subtle">
                <MagnifyingGlass size={20} className="text-secondary shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search documentation..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-secondary/50 outline-none text-sm"
                />
                <kbd className="rounded border border-edge-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[11px] text-secondary">
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-secondary">
                    No results found
                  </p>
                ) : (
                  <ul role="listbox">
                    {filtered.map((g, i) => (
                      <li key={g.slug} role="option" aria-selected={i === selectedIndex}>
                        <button
                          onClick={() => navigate(g.slug)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                            i === selectedIndex
                              ? "bg-accent/10 text-foreground"
                              : "text-secondary hover:text-foreground"
                          }`}
                        >
                          <p className="text-sm font-medium">{g.title}</p>
                          <p className="text-xs text-secondary mt-0.5 line-clamp-1">
                            {g.description}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
