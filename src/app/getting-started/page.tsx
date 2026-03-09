import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CopySnippetBlock } from "@/components/CopySnippetBlock";
import { FadeIn } from "@/components/FadeIn";

const url = "https://lobstermail.ai/getting-started";

export const metadata: Metadata = {
  title: "Get started — LobsterMail",
  description:
    "Give your agent email in 60 seconds. Install the skill, your agent creates an inbox, and it can send and receive email. Free tier included.",
  alternates: { canonical: url },
  openGraph: {
    title: "Get started — LobsterMail",
    description:
      "Give your agent email in 60 seconds. Install the skill, your agent creates an inbox, and it can send and receive email.",
    url,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get started — LobsterMail",
    description:
      "Give your agent email in 60 seconds. Install the skill, your agent creates an inbox, and it can send and receive email.",
    images: ["/og-image.png"],
  },
};

const steps = [
  {
    number: "1",
    title: "Install the skill",
    description:
      "Copy the skill URL and add it to your agent. Works with any MCP-compatible agent.",
  },
  {
    number: "2",
    title: "Agent creates an inbox",
    description:
      "Your agent calls the skill to create its own email inbox. No API keys, no human signup.",
  },
  {
    number: "3",
    title: "Send and receive email",
    description:
      "Your agent can now send emails, receive replies, and manage its inbox autonomously.",
  },
];

const codeExample = `// Your agent runs this via the LobsterMail skill:

// 1. Create an inbox
POST /v1/inboxes
→ { "email": "agent-7x@lobstermail.ai" }

// 2. Send an email
POST /v1/inboxes/{id}/messages
{
  "to": "hello@example.com",
  "subject": "Hey from my agent",
  "body": "This email was sent by an AI agent."
}

// 3. Check for replies
GET /v1/inboxes/{id}/messages
→ [{ "from": "hello@example.com", ... }]`;

export default function GettingStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="pt-32">
        <div className="mx-auto max-w-4xl px-6 pb-28">
          {/* Hero */}
          <FadeIn>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Give your agent email in 60 seconds
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
                Install the skill. Your agent creates its own inbox. No API keys, no human signup, no configuration.
              </p>
            </div>
          </FadeIn>

          {/* Copy snippet */}
          <FadeIn delay={0.08}>
            <div className="mx-auto mt-10 max-w-sm">
              <p className="mb-3 text-center text-sm font-medium text-accent">
                Setup instructions for your agent
              </p>
              <CopySnippetBlock />
            </div>
          </FadeIn>

          {/* Three steps */}
          <FadeIn delay={0.16}>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border-2 border-edge bg-background p-6"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/[0.08] text-sm font-bold text-accent">
                    {step.number}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Code example */}
          <FadeIn delay={0.24}>
            <div className="mt-16">
              <h2 className="mb-4 text-xl font-bold tracking-tight sm:text-2xl">
                What your agent does
              </h2>
              <div
                data-theme="dark"
                className="overflow-hidden rounded-xl border-2 border-edge bg-terminal"
              >
                <pre className="overflow-x-auto px-6 py-5 font-mono text-[13px] leading-relaxed text-foreground">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </FadeIn>

          {/* Pricing note */}
          <FadeIn delay={0.32}>
            <div className="mt-16 rounded-2xl border-2 border-edge bg-accent/[0.04] p-8 text-center">
              <h2 className="text-lg font-bold text-foreground">
                Free to start. $9/mo when you need more.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-secondary">
                Free tier includes 1,000 emails/month and 1 inbox. Builder is $9/mo for 10 inboxes, 10,000 emails/month, and custom domains.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/pricing"
                  className="rounded-lg border-2 border-accent bg-accent/10 px-5 py-2 text-sm font-medium text-accent shadow-[0_4px_8px_3px_rgba(251,87,5,0.15),0_1px_3px_0_rgba(0,0,0,0.30)] transition-all hover:bg-accent/20 hover:shadow-[0_6px_12px_3px_rgba(251,87,5,0.20),0_2px_4px_0_rgba(0,0,0,0.30)]"
                >
                  See pricing
                </Link>
                <Link
                  href="/docs"
                  className="link-underline text-sm text-secondary transition-colors hover:text-foreground"
                >
                  Read the docs <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
