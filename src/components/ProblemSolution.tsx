import { X, Check } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./FadeIn";

const features = [
  "Zero-config agent signup",
  "Personal email stays private",
  "No API keys needed",
  "Custom domains",
  "Dedicated IP",
  "Built-in agent security",
];

function GmailIcon() {
  return (
    <svg
      width="24"
      height="18"
      viewBox="52 42 88 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6" />
      <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15" />
      <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2" />
      <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92" />
      <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2" />
    </svg>
  );
}

export function ProblemSolution() {
  return (
    <section className="border-t border-edge px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            An inbox made for your lobster.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="glass overflow-hidden rounded-2xl">
              {/* Header */}
              <div className="grid grid-cols-[1fr_80px_80px] items-end justify-items-center border-b border-edge px-6 py-4 sm:grid-cols-[1fr_100px_100px] sm:justify-items-stretch">
                <span className="text-center text-xs font-medium uppercase tracking-wider text-secondary sm:text-left">
                  Feature
                </span>
                <span className="flex flex-col items-center gap-1.5 text-center text-xs font-medium uppercase tracking-wider text-secondary">
                  <GmailIcon />
                  Gmail
                </span>
                <span className="flex flex-col items-center gap-1.5 text-center text-xs font-medium uppercase tracking-wider text-foreground">
                  <span className="text-lg" aria-hidden="true">🦞</span>
                  LobsterMail
                </span>
              </div>

              {/* Rows */}
              {features.map((feature, i) => (
                <FadeIn key={feature} delay={0.08 + i * 0.06} distance={8}>
                  <div
                    className={`grid grid-cols-[1fr_80px_80px] items-center justify-items-center px-6 py-3.5 sm:grid-cols-[1fr_100px_100px] sm:justify-items-stretch ${
                      i < features.length - 1 ? "border-b border-edge-subtle" : ""
                    }`}
                  >
                    <span className="text-center text-sm text-secondary sm:text-left sm:text-base">
                      {feature}
                    </span>
                    <span className="flex justify-center">
                      <X size={20} weight="bold" className="text-foreground" />
                    </span>
                    <span className="flex justify-center">
                      <Check size={20} weight="bold" className="text-foreground" />
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
