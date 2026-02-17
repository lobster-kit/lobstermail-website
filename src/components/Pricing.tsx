import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./FadeIn";

const freePlanFeatures = [
  "Unlimited inboxes",
  "Send & receive emails",
  "Agent provisioning",
  "No credit card required",
];

const proPlanFeatures = [
  "Everything in Free",
  "No sending limits",
  "Custom domains",
  "Dedicated IP",
  "Priority support",
];

export function Pricing() {
  return (
    <section className="border-t border-edge px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <div className="mb-3 flex justify-center">
            <Image
              src="/lobster-in-cage.png"
              alt=""
              width={96}
              height={96}
              className="size-24 object-contain"
              aria-hidden
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Simple pricing. No traps.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-secondary sm:text-lg">
            Don&#39;t get trapped in the lobster cage of emails.
          </p>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Free card */}
          <FadeIn delay={0.08}>
            <div className="glass flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:items-stretch sm:p-8 sm:text-left">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-secondary">
                  Free
                </p>
                <div className="mt-3 flex items-baseline justify-center gap-1 sm:justify-start">
                  <span className="text-4xl font-bold tracking-tight">$0</span>
                  <span className="text-secondary">/mo</span>
                </div>
                <p className="mt-2 text-sm text-secondary">
                  Free forever. No credit card.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col items-center gap-3 sm:items-stretch">
                {freePlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-2.5 text-sm text-secondary sm:justify-start">
                    <Check size={16} weight="bold" className="shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="#"
                  className="block w-full rounded-full border border-edge-strong px-6 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface-4"
                >
                  Get started
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Pro card */}
          <FadeIn delay={0.16}>
            <div className="glass-strong relative flex h-full flex-col items-center rounded-2xl p-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:items-stretch sm:p-8 sm:text-left">
              <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                Coming soon
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Pro
                </p>
                <div className="mt-3 flex items-baseline justify-center gap-1 sm:justify-start">
                  <span className="text-4xl font-bold tracking-tight">TBD</span>
                </div>
                <p className="mt-2 text-sm text-secondary">
                  Sending, custom domains, and more.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col items-center gap-3 sm:items-stretch">
                {proPlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-2.5 text-sm text-secondary sm:justify-start">
                    <Check size={16} weight="bold" className="shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <span className="block w-full cursor-not-allowed rounded-full bg-surface-4 px-6 py-2.5 text-center text-sm font-medium text-secondary">
                  Coming soon
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
