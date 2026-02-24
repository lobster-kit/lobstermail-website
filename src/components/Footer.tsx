import Link from "next/link";
import { FadeIn } from "./FadeIn";

export function Footer() {
  return (
    <footer className="px-6 py-12">
      <FadeIn distance={8}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-sm text-secondary">
          <p>
            Built by the team behind{" "}
            <a
              href="https://palisade.email"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-foreground transition-colors hover:text-accent"
            >
              Palisade
            </a>
            .
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="link-underline transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <Link
              href="/blog"
              className="link-underline transition-colors hover:text-foreground"
            >
              Blog
            </Link>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <a
              href="https://discord.gg/clawd"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors hover:text-foreground"
            >
              Discord
            </a>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms"
              className="link-underline transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
