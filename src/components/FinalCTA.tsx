import { CopyCommand } from "./CopyCommand";
import { FadeIn } from "./FadeIn";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-edge px-6 py-28 sm:py-36">
      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(234,67,53,0.04), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Tell your agent to get its own email. It will.
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="flex flex-col items-center gap-4">
            <CopyCommand />
            <a
              href="#"
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              View docs <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
