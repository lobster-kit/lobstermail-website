import { FadeIn } from "./FadeIn";

export function Footer() {
  return (
    <footer className="border-t border-edge px-6 py-12">
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
            <a
              href="#"
              className="link-underline transition-colors hover:text-foreground"
            >
              Docs
            </a>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <a
              href="#"
              className="link-underline transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <span className="text-muted" aria-hidden="true">
              |
            </span>
            <a
              href="#"
              className="link-underline transition-colors hover:text-foreground"
            >
              Discord
            </a>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}
