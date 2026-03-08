import Image from "next/image";
import { CodeSnippet } from "./CodeSnippet";
import { FadeIn } from "./FadeIn";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pb-28 sm:pt-48 lg:pt-52">

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
        {/* Left: headline */}
        <div className="flex flex-1 flex-col items-center gap-5 lg:items-start lg:gap-6 lg:text-left">
          <FadeIn>
            <Image
              src="/lobster-logo-800.png"
              alt="LobsterMail"
              width={192}
              height={192}
              className="w-[115px] sm:w-[192px] h-auto animate-float object-contain pt-[10px]"
            />
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
                "radial-gradient(ellipse at center, rgba(251,87,5,0.12), transparent 70%)",
            }}
          />
          <CodeSnippet />
        </FadeIn>
      </div>
    </section>
  );
}
