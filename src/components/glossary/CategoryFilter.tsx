"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GLOSSARY_CATEGORIES } from "@/lib/glossary-categories";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "";

  function setCategory(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("category", id);
    } else {
      params.delete("category");
    }
    router.push(`/glossary?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        onClick={() => setCategory("")}
        className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
          !active
            ? "border-accent/30 bg-accent/[0.08] text-accent"
            : "border-edge bg-background text-foreground hover:border-accent/30"
        }`}
      >
        All
      </button>
      {GLOSSARY_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.id)}
          className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
            active === cat.id
              ? "border-accent/30 bg-accent/[0.08] text-accent"
              : "border-edge bg-background text-foreground hover:border-accent/30"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
