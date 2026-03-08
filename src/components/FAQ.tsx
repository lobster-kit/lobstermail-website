"use client";

import { CaretDown } from "@phosphor-icons/react";
import {
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  Button,
} from "react-aria-components";
import { FadeIn } from "./FadeIn";
import { faqItems } from "@/lib/faq-data";

function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQ() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <DisclosureGroup
            allowsMultipleExpanded
            className="mt-14 flex flex-col rounded-2xl border-3 border-edge-strong bg-background px-6 py-5 sm:px-8"
          >
            {faqItems.map((item) => (
              <Disclosure
                key={item.id}
                id={item.id}
                className="group border-b border-edge last:border-b-0"
              >
                <Heading level={3} className="m-0">
                  <Button
                    slot="trigger"
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold leading-none transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-lg"
                  >
                    <span className="leading-snug">{item.question}</span>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className="shrink-0 text-secondary transition-transform duration-200 group-data-[expanded]:rotate-180"
                    />
                  </Button>
                </Heading>
                <DisclosurePanel className="overflow-hidden text-sm leading-relaxed text-secondary sm:text-base">
                  <div className="pb-5">{item.answer}</div>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </DisclosureGroup>
        </FadeIn>
      </div>
    </section>
  );
}

