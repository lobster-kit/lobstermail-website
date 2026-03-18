import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

interface DocsHeaderProps {
  title: string;
  description: string;
  lastUpdated: string;
}

export function DocsHeader({ title, description, lastUpdated }: DocsHeaderProps) {
  return (
    <header className="mb-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4 hidden lg:block">
        <ol className="flex items-center gap-1.5 text-sm text-secondary">
          <li>
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
            >
              Docs
            </Link>
          </li>
          <li aria-hidden="true">
            <CaretRight size={12} className="text-secondary/50" />
          </li>
          <li>
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded"
            >
              Guides
            </Link>
          </li>
          <li aria-hidden="true">
            <CaretRight size={12} className="text-secondary/50" />
          </li>
          <li>
            <span className="text-foreground font-medium">{title}</span>
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="h2 mb-3">{title}</h1>

      {/* Description */}
      <p className="text-secondary text-lg leading-relaxed">{description}</p>

      {/* Last updated */}
      <p className="font-mono text-xs text-secondary mt-3">
        Last updated {lastUpdated}
      </p>
    </header>
  );
}
