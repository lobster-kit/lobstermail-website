import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for using the LobsterMail email infrastructure service for AI agents.",
  alternates: { canonical: "https://lobstermail.ai/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-28">
        <FadeIn>
          <header className="mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-secondary">
              Legal
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-3 text-sm text-secondary">
              Last updated: February 23, 2026
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="space-y-12 text-[15px] leading-relaxed text-secondary sm:text-base">
            {/* 1. Introduction */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                1. Introduction
              </h2>
              <p>
                These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your
                use of LobsterMail, an email infrastructure service for AI
                agents operated by The Claw Depot (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, &ldquo;our&rdquo;). LobsterMail is accessible
                at lobstermail.ai and through the{" "}
                <code className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-sm text-foreground">
                  lobstermail
                </code>{" "}
                npm package.
              </p>
              <p>
                By installing the LobsterMail SDK, calling our API, or using any
                part of the service, you agree to these Terms. If you do not
                agree, do not use the service.
              </p>
              <p>
                &ldquo;You&rdquo; refers to the human individual, company, or
                organization that installs, deploys, or operates an AI agent
                using LobsterMail. AI agents cannot accept legal terms. The
                person or entity that initiates an agent&rsquo;s use of
                LobsterMail is the responsible party under these Terms.
              </p>
            </section>

            {/* 2. Service Description */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                2. Service Description
              </h2>
              <p>
                LobsterMail provides email infrastructure that allows AI agents
                to:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Create and manage their own email inboxes programmatically
                </li>
                <li>Send and receive email messages</li>
                <li>
                  Process incoming email with built-in security scanning
                </li>
              </ul>
              <p>
                The service is available through a free tier and paid plans as
                described on our website.
              </p>
            </section>

            {/* 3. Operator Responsibility */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                3. Your Responsibility as an Operator
              </h2>
              <p>
                You are fully responsible for every AI agent you deploy using
                LobsterMail and for all activity on inboxes those agents create.
                This includes:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Every email your agent sends, including its content,
                  recipients, and timing
                </li>
                <li>
                  Every action your agent takes based on emails it receives
                </li>
                <li>
                  Any errors, inaccuracies, or unintended behavior by your agent
                </li>
                <li>
                  Ensuring your agent complies with applicable laws and these
                  Terms
                </li>
                <li>
                  Monitoring your agent&rsquo;s activity and intervening when
                  necessary
                </li>
              </ul>
              <p>
                LobsterMail provides the infrastructure. What your agent does
                with it is entirely your responsibility.
              </p>
            </section>

            {/* 4. Prompt Injection and Security */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                4. Prompt Injection and Security
              </h2>
              <p>
                LobsterMail scans incoming emails for prompt injection patterns,
                suspicious senders, embedded scripts, and oversized payloads.
                This scanning is provided as a convenience to help flag
                potentially dangerous content.
              </p>
              <p className="font-semibold text-foreground">
                This scanning is not a guarantee of safety.
              </p>
              <p>You acknowledge and agree that:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Our injection detection uses heuristics and pattern matching.
                  It will not catch every attack.
                </li>
                <li>
                  New and novel injection techniques may bypass our scanning
                  entirely.
                </li>
                <li>
                  LobsterMail is not liable for any damage, loss, or harm caused
                  by prompt injection attacks that evade our detection,
                  regardless of severity.
                </li>
                <li>
                  You are solely responsible for how your agent interprets,
                  processes, and acts on email content — whether or not that
                  content has been flagged by our scanning.
                </li>
                <li>
                  You must implement your own defense-in-depth measures. Never
                  concatenate raw email content directly into LLM prompts.
                  Validate before acting. Restrict agent permissions. Rate-limit
                  agent actions. Log everything.
                </li>
              </ul>
              <p>
                Our{" "}
                <Link
                  href="/docs/security-and-injection"
                  className="text-accent transition-colors hover:text-accent-hover"
                >
                  security documentation
                </Link>{" "}
                provides guidance, but following it does not transfer liability
                to us.
              </p>
            </section>

            {/* 5. AI Agent Conduct */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                5. AI Agent Conduct
              </h2>
              <p>
                Your agent may generate and send emails autonomously. You
                acknowledge that:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  AI models can hallucinate, produce inaccurate information, or
                  behave unpredictably
                </li>
                <li>
                  LobsterMail has no control over what your agent writes, who it
                  contacts, or what decisions it makes
                </li>
                <li>
                  We are not responsible for any email content generated by your
                  agent, even if that content is inaccurate, misleading,
                  offensive, or harmful
                </li>
                <li>
                  We are not responsible for any real-world consequences of your
                  agent&rsquo;s email communications, including but not limited
                  to financial loss, reputational damage, or legal liability
                </li>
                <li>
                  You must implement appropriate oversight, testing, and
                  safeguards before deploying agents in production
                </li>
              </ul>
              <p>
                We may suspend or terminate any agent or inbox that exhibits
                abusive, harmful, or policy-violating behavior, at our sole
                discretion and without prior notice.
              </p>
            </section>

            {/* 6. Third-Party Services */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                6. Third-Party Services
              </h2>
              <p>
                LobsterMail relies on third-party infrastructure to operate,
                including but not limited to cloud hosting, email delivery
                services, and optionally AI model providers for security
                scanning.
              </p>
              <p>
                Email content processed through our service may be transmitted to
                these third-party providers. We are not responsible for how
                third-party services handle your data, their availability, or
                changes to their terms or policies. You should review the privacy
                and data handling policies of any third-party services relevant
                to your use case.
              </p>
            </section>

            {/* 7. Prohibited Uses */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                7. Prohibited Uses
              </h2>
              <p>You may not use LobsterMail for:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Sending spam or unsolicited bulk email</li>
                <li>Phishing, impersonation, or social engineering</li>
                <li>
                  Distributing malware, viruses, or malicious content
                </li>
                <li>
                  Harvesting credentials, intercepting verification codes, or
                  account takeover
                </li>
                <li>
                  Creating throwaway inboxes to abuse or circumvent other
                  services
                </li>
                <li>
                  Any activity that violates CAN-SPAM, GDPR, CASL, or other
                  applicable email or privacy regulations
                </li>
                <li>Any illegal activity under applicable law</li>
              </ul>
              <p>
                Violation of these rules may result in immediate suspension or
                termination of your account without notice or refund.
              </p>
            </section>

            {/* 8. Email Deliverability */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                8. Email Deliverability
              </h2>
              <p>
                LobsterMail does not guarantee that any email will be delivered
                to its intended recipient. Emails may be filtered, delayed,
                bounced, quarantined, or blocked by recipient mail servers, spam
                filters, or network conditions outside our control.
              </p>
              <p>
                We may throttle, queue, or temporarily suspend sending from your
                agent&rsquo;s inboxes to protect our shared infrastructure, IP
                reputation, or to comply with sending limits.
              </p>
              <p>
                You are responsible for maintaining good sending practices and
                complying with email authentication standards (SPF, DKIM, DMARC)
                when using custom domains.
              </p>
            </section>

            {/* 9. Data Handling */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                9. Data Handling
              </h2>
              <p>
                We store email content (messages, metadata, attachments) as
                necessary to provide the service. We do not sell your data to
                third parties.
              </p>
              <p>
                We may access stored email content for the purposes of abuse
                prevention, security investigation, service debugging, and legal
                compliance.
              </p>
              <p>
                You are responsible for ensuring your use of LobsterMail
                complies with data protection laws applicable in your
                jurisdiction, including GDPR, CCPA, PIPEDA, and others. If your
                agent processes personal data belonging to third parties, you are
                the data controller and bear full responsibility for lawful
                processing.
              </p>
              <p>
                Inboxes on the free tier that remain inactive may be reclaimed
                after a period of inactivity. We reserve the right to delete
                associated email data when an inbox is reclaimed.
              </p>
            </section>

            {/* 10. Service Availability */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                10. Service Availability
              </h2>
              <p>
                LobsterMail is provided on an &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; basis. We do not guarantee uptime, availability,
                or uninterrupted service.
              </p>
              <p>
                We may modify, suspend, or discontinue any part of the service
                at any time, with or without notice. We are not liable to you or
                any third party for any modification, suspension, or
                discontinuation of the service.
              </p>
            </section>

            {/* 11. Limitation of Liability */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                11. Limitation of Liability
              </h2>
              <div className="space-y-4 rounded-xl border border-edge bg-surface-1 p-5 text-sm">
                <p className="font-semibold uppercase tracking-wide text-foreground">
                  To the maximum extent permitted by law:
                </p>
                <p>
                  The service is provided &ldquo;as is&rdquo; without warranty
                  of any kind, express or implied, including but not limited to
                  warranties of merchantability, fitness for a particular
                  purpose, and non-infringement.
                </p>
                <p>
                  LobsterMail, The Claw Depot, and their officers, directors,
                  employees, and agents shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages
                  arising out of or related to your use of the service,
                  regardless of the theory of liability.
                </p>
                <p>
                  This includes, without limitation, damages arising from:
                </p>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Actions taken or not taken by your AI agent</li>
                  <li>
                    Prompt injection attacks, whether detected or undetected
                  </li>
                  <li>Email non-delivery, delays, or misdelivery</li>
                  <li>
                    Loss of data, revenue, business opportunities, or reputation
                  </li>
                  <li>Third-party service failures or data handling</li>
                  <li>
                    AI hallucinations, errors, or unpredictable behavior
                  </li>
                  <li>
                    Unauthorized access to your agent&rsquo;s inboxes
                  </li>
                  <li>
                    Any reliance on our security scanning or detection features
                  </li>
                </ul>
                <p>
                  Our total aggregate liability for all claims related to the
                  service shall not exceed the amount you paid us in the twelve
                  (12) months immediately preceding the event giving rise to the
                  claim. For free tier users, this amount is zero.
                </p>
              </div>
            </section>

            {/* 12. Indemnification */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless LobsterMail,
                The Claw Depot, and their officers, directors, employees, and
                agents from and against any claims, damages, losses, liabilities,
                costs, and expenses (including reasonable legal fees) arising
                from:
              </p>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  Your use of the service or your agent&rsquo;s use of the
                  service
                </li>
                <li>
                  Any emails sent or received through your agent&rsquo;s inboxes
                </li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable law or regulation</li>
                <li>
                  Any claim by a third party related to your agent&rsquo;s
                  actions or communications
                </li>
              </ul>
            </section>

            {/* 13. Changes to These Terms */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                13. Changes to These Terms
              </h2>
              <p>
                We may update these Terms at any time. When we do, we will
                update the &ldquo;Last updated&rdquo; date at the top of this
                page. Your continued use of the service after changes are posted
                constitutes your acceptance of the revised Terms.
              </p>
              <p>
                For material changes, we will make reasonable efforts to notify
                you through our website or documentation.
              </p>
            </section>

            {/* 14. Governing Law */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                14. Governing Law
              </h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the Province of Quebec, Canada, without regard to
                conflict of law principles. Any disputes arising under these
                Terms shall be subject to the exclusive jurisdiction of the
                courts located in Quebec, Canada.
              </p>
            </section>

            {/* 15. Contact */}
            <section className="space-y-4">
              <h2 className="border-b border-edge pb-2 text-lg font-bold text-foreground sm:text-xl">
                15. Contact
              </h2>
              <p>
                If you have questions about these Terms, contact us at{" "}
                <a
                  href="mailto:hello@lobstermail.ai"
                  className="text-accent transition-colors hover:text-accent-hover"
                >
                  hello@lobstermail.ai
                </a>
                .
              </p>
            </section>
          </div>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
