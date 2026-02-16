import { CodeSnippet } from "./CodeSnippet";
import { FadeIn } from "./FadeIn";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 sm:pb-28 sm:pt-48 lg:pt-52">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 20%, rgba(234,67,53,0.08), transparent 60%)",
              "radial-gradient(ellipse 50% 40% at 80% 30%, rgba(234,67,53,0.05), transparent 50%)",
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(180,60,40,0.06), transparent)",
            ].join(", "),
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left: headline */}
        <div className="flex flex-1 flex-col gap-5 lg:gap-6">
          <FadeIn>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-3.5 py-1.5 text-xs font-medium text-accent">
              <span aria-hidden="true">🦞</span>
              Built for the Moltiverse
            </span>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Instant email for your agent.
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="max-w-md text-base leading-relaxed text-secondary sm:text-lg">
              No API keys. No human signup. Your agent pinches its own email.
            </p>
          </FadeIn>
        </div>

        {/* Right: code card with glow */}
        <FadeIn delay={0.2} className="relative w-full max-w-md lg:max-w-none lg:flex-1">
          <div
            className="pointer-events-none absolute -inset-8 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(234,67,53,0.12), transparent 70%)",
            }}
          />
          <CodeSnippet />
        </FadeIn>
      </div>
    </section>
  );
}
