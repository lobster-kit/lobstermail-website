import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { FadeIn } from "./FadeIn";
import { GetStartedPopup } from "./GetStartedPopup";

const freePlanFeatures = [
  "No human required",
  "Receive emails instantly",
  "Verify to unlock sending",
  "No credit card required",
];

const proPlanFeatures = [
  "Everything in Free",
  "Up to 10 inboxes",
  "Send up to 500 emails/day",
  "5,000 emails/month",
];

export function Pricing() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <FadeIn>
          <div className="mb-5 flex justify-center">
            <Image
              src="/lobster-out-of-cage.png"
              alt=""
              width={192}
              height={192}
              className="size-48 object-contain"
              aria-hidden
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-accent sm:text-3xl md:text-4xl">
            Simple pricing. No traps.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-secondary sm:text-lg">
            Don&#39;t get trapped in the lobster cage of emails.
          </p>
        </FadeIn>

        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {/* Free card */}
          <FadeIn delay={0.08}>
            <div className="glass flex h-full flex-col items-center p-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:items-stretch sm:p-8 sm:text-left">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-secondary">
                  Free
                </p>
                <div className="mt-3 flex items-baseline justify-center gap-1 sm:justify-start">
                  <span className="text-4xl font-bold tracking-tight">$0</span>
                  <span className="text-secondary">/mo</span>
                </div>
                <p className="mt-2 text-base text-secondary">
                  Free forever. No credit card.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col items-center gap-3 sm:items-stretch">
                {freePlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-2.5 text-lg text-secondary sm:justify-start">
                    <Check size={18} weight="bold" className="shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <GetStartedPopup
                  triggerClassName="block w-full rounded-full border-2 border-edge-strong px-6 py-2.5 text-center text-base font-medium text-foreground shadow-[0_4px_12px_-2px_rgba(0,80,171,0.12)] transition-colors hover:bg-surface-4 cursor-pointer"
                />
              </div>
            </div>
          </FadeIn>

          {/* Pro card */}
          <FadeIn delay={0.16}>
            <div className="glass-strong relative flex h-full flex-col items-center p-6 text-center transition-transform duration-300 hover:-translate-y-1 sm:items-stretch sm:p-8 sm:text-left">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">
                  Builder
                </p>
                <div className="mt-3 flex items-baseline justify-center gap-1 sm:justify-start">
                  <span className="text-4xl font-bold tracking-tight">$9</span>
                  <span className="text-secondary">/mo</span>
                </div>
                <p className="mt-2 text-base text-secondary">
                  Sending, custom domains, and more.
                </p>
              </div>

              <div className="mb-8 h-px bg-edge" />

              <ul className="flex flex-col items-center gap-3 sm:items-stretch">
                {proPlanFeatures.map((feature) => (
                  <li key={feature} className="flex items-center justify-center gap-2.5 text-lg text-secondary sm:justify-start">
                    <Check size={18} weight="bold" className="shrink-0 text-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <GetStartedPopup
                  triggerClassName="block w-full rounded-full bg-accent px-6 py-2.5 text-center text-base font-medium text-white shadow-[0_4px_12px_-2px_rgba(0,80,171,0.25)] transition-colors hover:bg-accent/90 cursor-pointer"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.24}>
          <p className="mx-auto mt-8 max-w-2xl text-base text-secondary">
            Need more? Add custom domains, dedicated IPs, and priority support.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
