import { Check } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./FadeIn";

const freePlanFeatures = [
  "Unlimited inboxes",
  "Receive emails",
  "Agent provisioning",
  "No credit card required",
];

const proPlanFeatures = [
  "Everything in Free",
  "Send emails",
  "Custom domains",
  "Dedicated IP",
  "Priority support",
];

export function Pricing() {
  return (
    <section className="border-t border-edge px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Simple pricing. No traps.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-secondary sm:text-lg">
            We charge when your agent talks back.
          </p>
        </FadeIn>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Free card */}
          <FadeIn delay={0.08}>
            <div className="glass flex h-full flex-col rounded-2xl p-6 text-left sm:p-8">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-secondary">
                  Free
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">$0</span>
                  <span className="text-secondary">/mo</span>
                </div>
                <p className="mt-2 text-sm text-secondary">
                  Free forever. No credit card.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col gap-3">
                {freePlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-secondary">
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
            <div className="glass-strong relative flex h-full flex-col rounded-2xl p-6 text-left sm:p-8">
              <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
                Coming soon
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Pro
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">TBD</span>
                </div>
                <p className="mt-2 text-sm text-secondary">
                  Sending, custom domains, and more.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col gap-3">
                {proPlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-secondary">
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
