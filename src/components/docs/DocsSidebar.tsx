"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, BookOpen, CaretRight } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import type { GuideMeta } from "@/lib/docs";

export function DocsSidebar({ guides }: { guides: GuideMeta[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const mounted = useRef(false);

  // Derive current page title for breadcrumbs
  const currentGuide = guides.find((g) => pathname === `/docs/${g.slug}`);
  const isApiRef = pathname === "/docs/api-reference";
  const pageTitle = currentGuide?.title ?? (isApiRef ? "API Reference" : null);

  // Track mount to prevent animation flash on initial render
  useEffect(() => {
    mounted.current = true;
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on escape + lock body scroll
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  const nav = (
    <>
      <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-4 px-3">
        Guides
      </p>
      <ul className="space-y-0.5">
        {guides.map((g) => {
          const href = `/docs/${g.slug}`;
          const active = pathname === href;
          return (
            <li key={g.slug}>
              <Link
                href={href}
                className={`
                  block px-3 py-2 rounded-lg text-sm transition-colors duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50
                  ${
                    active
                      ? "bg-accent/10 text-accent font-medium border-l-2 border-accent -ml-px"
                      : "text-secondary hover:text-foreground hover:bg-surface-3"
                  }
                `}
              >
                {g.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-edge-subtle my-4" />

      <Link
        href="/docs/api-reference"
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50
          ${
            isApiRef
              ? "bg-accent/10 text-accent font-medium border-l-2 border-accent -ml-px"
              : "text-secondary hover:text-foreground hover:bg-surface-3"
          }
        `}
      >
        <BookOpen size={16} />
        API Reference
      </Link>
    </>
  );

  return (
    <>
      {/* Mobile sub-nav bar: hamburger + breadcrumbs */}
      <div className="lg:hidden sticky top-20 z-30 -mx-6 px-4 py-2.5 flex items-center gap-3 border-b border-edge-subtle">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 -ml-1 rounded-lg text-foreground hover:bg-surface-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          aria-label={open ? "Close documentation menu" : "Open documentation menu"}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm min-w-0">
          <Link
            href="/docs"
            className="text-secondary hover:text-foreground transition-colors shrink-0"
          >
            Docs
          </Link>
          {pageTitle && (
            <>
              <CaretRight size={12} className="text-secondary/50 shrink-0" />
              <span className="text-foreground font-medium truncate">{pageTitle}</span>
            </>
          )}
        </nav>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar drawer (mobile) / inline nav (desktop) */}
      <nav
        aria-label="Documentation sidebar"
        className={`
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:sticky top-0 lg:top-20 left-0
          z-50 lg:z-auto
          h-screen lg:h-[calc(100vh-5rem)]
          w-72 max-w-[85vw] lg:w-auto lg:max-w-none
          overflow-y-auto
          border-r border-edge-subtle lg:border-r-0
          bg-background lg:bg-transparent
          lg:p-0
          ${mounted.current ? "transition-transform duration-200 ease-out" : ""}
          lg:transition-none
        `}
      >
        {/* Mobile drawer header */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-edge-subtle">
          <span className="text-sm font-medium text-foreground">Documentation</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2.5 -mr-1 rounded-lg text-secondary hover:text-foreground hover:bg-surface-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
            aria-label="Close documentation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <div className="p-5 lg:p-0">
          {nav}
        </div>
      </nav>
    </>
  );
}
