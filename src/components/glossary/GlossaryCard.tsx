import Link from "next/link";
import { GLOSSARY_CATEGORIES } from "@/lib/glossary-categories";
import type { GlossaryTerm } from "@/lib/glossary";

export function GlossaryCard({ term }: { term: GlossaryTerm }) {
  const categoryLabel =
    GLOSSARY_CATEGORIES.find((c) => c.id === term.category)?.label ??
    term.category;

  return (
    <Link
      href={`/glossary/${term.slug}`}
      className="group flex flex-col rounded-xl border-2 border-edge bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_4px_12px_-4px_rgba(251,87,5,0.08)]"
    >
      <div className="mb-2">
        <span className="inline-flex rounded-full bg-accent/[0.06] px-2 py-0.5 text-[11px] font-medium text-accent/70">
          {categoryLabel}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
        {term.title}
      </h3>
      <p className="mt-1.5 text-xs text-secondary line-clamp-2">
        {term.shortDefinition}
      </p>
    </Link>
  );
}
