import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { GuideMeta } from "@/lib/docs";

interface DocsPrevNextProps {
  guides: GuideMeta[];
  currentSlug: string;
}

export function DocsPrevNext({ guides, currentSlug }: DocsPrevNextProps) {
  const currentIndex = guides.findIndex((g) => g.slug === currentSlug);
  const prev = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const next = currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav aria-label="Previous and next guides" className="mt-16 pt-8 border-t-2 border-edge-subtle">
      <div className="grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className="group flex items-center gap-3 rounded-xl border-2 border-edge-subtle bg-black px-5 py-4 transition-all duration-200 hover:border-edge-hover hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(0,80,171,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <ArrowLeft
              size={18}
              className="text-secondary transition-transform group-hover:-translate-x-0.5"
            />
            <div className="min-w-0">
              <p className="text-xs text-secondary font-mono uppercase tracking-wider">
                Previous
              </p>
              <p className="text-sm font-medium text-foreground truncate">
                {prev.title}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-xl border-2 border-edge-subtle bg-black px-5 py-4 transition-all duration-200 hover:border-edge-hover hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-4px_rgba(0,80,171,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 text-right"
          >
            <div className="min-w-0">
              <p className="text-xs text-secondary font-mono uppercase tracking-wider">
                Next
              </p>
              <p className="text-sm font-medium text-foreground truncate">
                {next.title}
              </p>
            </div>
            <ArrowRight
              size={18}
              className="text-secondary transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
