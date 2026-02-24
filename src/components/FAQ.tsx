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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "what-is-lobstermail",
    question: "What is LobsterMail?",
    answer:
      "LobsterMail is email infrastructure built for AI agents. It lets your agent provision its own email inbox — no human signup, API keys, or configuration required. Install the SDK, and your agent can send and receive email in seconds.",
  },
  {
    id: "how-agent-gets-email",
    question: "How does an AI agent get its own email address?",
    answer:
      "With LobsterMail, the agent creates its own inbox. You install the lobstermail npm package, and your agent calls a single function to provision an address. There's no human account creation step — the agent handles it autonomously.",
  },
  {
    id: "why-not-gmail",
    question: "Why can't my agent just use my Gmail?",
    answer:
      "Sharing your personal inbox means your agent sees every private message, and one bad prompt injection could send emails as you. LobsterMail gives your agent a dedicated address so your personal inbox stays untouched. Your agent gets its own identity — separate credentials, separate reputation, separate risk.",
  },
  {
    id: "prompt-injection",
    question: "Does LobsterMail protect against prompt injection?",
    answer:
      "Yes. Every incoming email is scanned for prompt injection attempts before your agent processes it. LobsterMail flags suspicious content — including injection patterns, untrusted senders, embedded scripts, and oversized payloads — so your agent can handle them safely instead of blindly executing instructions from strangers.",
  },
  {
    id: "frameworks",
    question: "What AI agent frameworks does LobsterMail work with?",
    answer:
      "LobsterMail works with OpenClaw, LangChain, CrewAI, AutoGen, and any agent that can call a JavaScript/TypeScript SDK. It also ships as an MCP server, so it works directly with Claude Desktop, Cursor, and Windsurf.",
  },
  {
    id: "vs-agentmail",
    question: "How is LobsterMail different from AgentMail?",
    answer:
      "AgentMail requires a human to sign up, create API keys, and configure the agent's environment. LobsterMail lets the agent provision its own inbox — no human in the loop. LobsterMail also offers unlimited inboxes on the free tier, while AgentMail caps at 3 inboxes before charging $20/month.",
  },
  {
    id: "is-free",
    question: "Is LobsterMail free?",
    answer:
      "The free tier includes unlimited inboxes with send and receive — no credit card required. The Pro plan at $5/month adds custom domains (send from agent@yourcompany.com), a dedicated IP, no sending limits, and priority support.",
  },
  {
    id: "custom-domain",
    question: "Can my agent use a custom domain?",
    answer:
      "Yes. On the Pro plan, you can send from your own domain — like support@yourcompany.com. LobsterMail handles the DNS configuration including SPF, DKIM, and DMARC so your agent's emails land in inboxes, not spam folders.",
  },
  {
    id: "real-time",
    question: "Can my agent receive emails in real time?",
    answer:
      "Yes, two ways. You can poll the API for new messages, or set up webhooks so LobsterMail pushes incoming emails to your agent's endpoint the moment they arrive. Webhooks are available on all tiers.",
  },
  {
    id: "use-cases",
    question: "What can agents actually do with email?",
    answer:
      "Agents use LobsterMail to triage support inboxes, manage scheduling and meeting coordination, send follow-ups to customers, generate daily email digests, unsubscribe from newsletters, and communicate with other agents. If it involves reading or writing email, an agent can handle it.",
  },
];

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
    <section className="border-t border-edge px-6 py-28 sm:py-36">
      <FAQSchema />
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

