import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-edge bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-base font-semibold text-foreground">
          <span aria-hidden="true">🦞</span>
          LobsterMail
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#top"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            Top
          </a>
          <a
            href="#"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            Docs
          </a>
          <a
            href="#"
            className="text-sm text-secondary transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <ThemeToggle />
          <a
            href="#"
            className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
