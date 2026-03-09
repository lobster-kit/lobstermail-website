"use client";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function AlphabetNav({ activeLetters }: { activeLetters: Set<string> }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {LETTERS.map((letter) => {
        const isActive = activeLetters.has(letter);
        return (
          <a
            key={letter}
            href={isActive ? `#letter-${letter}` : undefined}
            className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
              isActive
                ? "border-2 border-edge bg-background text-foreground hover:border-accent/30 hover:text-accent"
                : "text-muted cursor-default"
            }`}
            aria-disabled={!isActive}
          >
            {letter}
          </a>
        );
      })}
    </div>
  );
}
