"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  // Extract headings from the article on mount
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const els = article.querySelectorAll("h2, h3");
    const items: Heading[] = Array.from(els).map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: parseInt(el.tagName[1]),
    }));
    setHeadings(items);
  }, []);

  // Scroll-spy with IntersectionObserver
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const h of headings) {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:block sticky top-20">
      <p className="text-xs font-mono text-secondary uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l-2 border-edge-subtle">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`
                block text-[13px] leading-snug transition-colors duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded
                ${h.level === 3 ? "pl-5" : "pl-3"}
                ${
                  activeId === h.id
                    ? "text-accent font-medium border-l-2 border-accent -ml-[2px]"
                    : "text-secondary hover:text-foreground"
                }
              `}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
