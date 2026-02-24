"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import type { GuideMeta } from "@/lib/docs";

export function DocsSidebar({ guides }: { guides: GuideMeta[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
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
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg border-2 border-edge bg-background/90 backdrop-blur-sm transition-colors hover:bg-surface-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
        aria-label={open ? "Close documentation menu" : "Open documentation menu"}
      >
        {open ? <X size={20} /> : <List size={20} />}
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        aria-label="Documentation sidebar"
        className={`
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:sticky top-0 lg:top-20 left-0
          z-40 lg:z-auto
          h-screen lg:h-[calc(100vh-5rem)]
          w-64 lg:w-auto
          overflow-y-auto
          border-r-2 border-edge-subtle lg:border-r-0
          bg-background lg:bg-transparent
          p-6 lg:p-0
          transition-transform duration-200 ease-out
          lg:transition-none
        `}
      >
        {nav}
      </nav>
    </>
  );
}
