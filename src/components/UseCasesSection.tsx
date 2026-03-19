"use client";

import { useState, useEffect } from "react";
import {
  PaperPlaneTilt,
  Headset,
  ShieldCheck,
  Storefront,
  Eye,
  Lightning,
  Link,
  EnvelopeSimple,
  Check,
  CaretDown,
} from "@phosphor-icons/react";
import { FadeIn } from "./FadeIn";

// ─── Data ─────────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    id: "sdr",
    label: "AI SDR / Cold Outreach",
    Icon: PaperPlaneTilt,
    blurb: "Researches prospects, writes cold emails, handles replies, books meetings.",
    inboxEmail: "outreach@yourcompany.com",
    inboxStatus: "Sending via LobsterMail",
  },
  {
    id: "support",
    label: "Customer Support Triage",
    Icon: Headset,
    blurb: "Classifies incoming emails, auto-replies simple ones, escalates the rest.",
    inboxEmail: "support@yourcompany.com",
    inboxStatus: "Listening via LobsterMail",
  },
  {
    id: "verification",
    label: "Account Signup & Verification",
    Icon: ShieldCheck,
    blurb: "Signs up for services, catches verification emails, extracts OTP codes.",
    inboxEmail: "agent-7x@lobstermail.ai",
    inboxStatus: "Created via LobsterMail SDK",
  },
  {
    id: "vendor",
    label: "Vendor Outreach & Procurement",
    Icon: Storefront,
    blurb: "Emails vendors for quotes, compares pricing, sends purchase orders.",
    inboxEmail: "procurement@yourcompany.com",
    inboxStatus: "Sending via LobsterMail",
  },
  {
    id: "intel",
    label: "Competitive Intelligence",
    Icon: Eye,
    blurb: "Monitors competitor newsletters, extracts pricing and feature changes.",
    inboxEmail: "intel-watch@yourcompany.com",
    inboxStatus: "Listening via LobsterMail",
  },
  {
    id: "leads",
    label: "Inbound Lead Qualification",
    Icon: Lightning,
    blurb: "Responds to leads in 30 seconds, qualifies via email, routes hot leads.",
    inboxEmail: "sales@yourcompany.com",
    inboxStatus: "Listening via LobsterMail",
  },
  {
    id: "backlinks",
    label: "PR & Backlink Submissions",
    Icon: Link,
    blurb: "Submits to directory sites, handles all verification emails autonomously.",
    inboxEmail: "seo-agent@lobstermail.ai",
    inboxStatus: "Created via LobsterMail SDK",
  },
] as const;

const STEP_COUNT = 5;
const STEP_INTERVAL_MS = 1800;

// ─── Animation primitives ──────────────────────────────────────────────────────

function FlowCard({
  label,
  lines,
  variant = "incoming",
  delay = 0,
}: {
  label: string;
  lines: string[];
  variant?: "action" | "incoming" | "thinking" | "extracted";
  delay?: number;
}) {
  const isAccent = variant === "action" || variant === "extracted";
  const isThinking = variant === "thinking";

  const borderColor = isAccent
    ? "var(--accent)"
    : isThinking
      ? "var(--edge)"
      : "rgba(255,255,255,0.15)";

  const labelColor = isAccent ? "text-accent" : "text-secondary";
  const bgClass = isThinking ? "bg-surface-2" : "bg-surface-1";

  return (
    <div
      className={`rounded-r-lg ${bgClass} px-4 py-2.5`}
      style={{
        borderLeft: `2px solid ${borderColor}`,
        animation: `card-in 0.45s ease ${delay}s both`,
      }}
    >
      <p className={`mb-1 font-mono text-xs uppercase tracking-wider ${labelColor}`}>
        {label}
      </p>
      {lines.map((line, i) => (
        <p key={i} className="text-sm leading-snug text-foreground/80">
          {line}
        </p>
      ))}
    </div>
  );
}

function StatusLine({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div
      className="flex items-center gap-2 rounded-lg bg-accent/[0.08] px-4 py-2.5 font-mono text-sm text-accent"
      style={{ animation: `card-in 0.45s ease ${delay}s both` }}
    >
      <Check size={14} weight="bold" />
      {label}
    </div>
  );
}

// ─── 7 animation panels ────────────────────────────────────────────────────────

function SDRAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="extracted"
          label="Prospect Found"
          lines={["Sarah Chen, CTO", "Maplewood AI \u00b7 Series A"]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="action"
          label="Email Sent"
          lines={[
            "To: sarah@maplewood.ai",
            "\u201cHi Sarah \u2014 saw your post about agent tooling. We built the email piece.\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="incoming"
          label="Reply Received"
          lines={[
            "Sarah Chen \u00b7 sarah@maplewood.ai",
            "\u201cInteresting \u2014 we\u2019ve been hacking around SES. What\u2019s pricing like?\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          delay={0.15}
          variant="thinking"
          label="🧠 Analyzing Reply"
          lines={[
            "Intent: High interest",
            "Signal: Price-sensitive",
            "\u2192 Send pricing + booking link",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Follow-Up Sent"
          lines={[
            "To: sarah@maplewood.ai",
            "Pricing breakdown + demo link",
            "cal.com/yourcompany/demo",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          delay={0.15}
          variant="incoming"
          label="Reply Received"
          lines={["Sarah Chen", "\u201cThursday 2pm works.\u201d"]}
        />
      )}
      {step >= 4 && (
        <FlowCard
          variant="action"
          label="Calendar Event"
          lines={["Demo booked \u00b7 Thursday 2:00 PM ET"]}
        />
      )}
      {step >= 4 && <StatusLine label="Meeting booked" delay={0.1} />}
    </div>
  );
}

function SupportAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={[
            "Mike Rivera \u00b7 mike@acmesaas.com",
            "\u201cAPI returning 403 on /inboxes since this morning. Blocked on a release.\u201d",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="thinking"
          label="🧠 Classifying"
          lines={[
            "Category: Technical",
            "Urgency: 🔴 High",
            "Type: API access / auth issue",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="extracted"
          label="📋 Data Extracted"
          lines={[
            "Endpoint: /inboxes \u00b7 Error: 403",
            "Account: acmesaas",
            "Since: March 19, 8:00 AM",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Reply Sent"
          lines={[
            "To: mike@acmesaas.com",
            "\u201cHi Mike \u2014 flagged as high priority. Engineering is looking at the 403 now.\u201d",
          ]}
        />
      )}
      {step >= 4 && (
        <FlowCard
          variant="thinking"
          label="⚡ Escalated"
          lines={["\u2192 #eng-urgent Slack", "Full context attached"]}
        />
      )}
      {step >= 4 && <StatusLine label="Triaged in 4 seconds" delay={0.1} />}
    </div>
  );
}

function VerificationAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="action"
          label="Signup"
          lines={[
            "Filling registration form",
            "notion.so/signup",
            "Email: agent-7x@lobstermail.ai",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={["Notion \u00b7 team@notion.so", "\u201cYour verification code\u201d"]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="extracted"
          label="📋 Data Extracted"
          lines={["OTP Code: 847291", "Expires: 10 minutes"]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Verification"
          lines={["Code submitted", "Account active"]}
        />
      )}
      {step >= 4 && <StatusLine label="Signed up autonomously" />}
    </div>
  );
}

function VendorAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="action"
          label="RFQ Sent"
          lines={[
            "To: 3 vendors",
            "Herman Miller \u00b7 Steelcase \u00b7 Fully",
            "\u201cRequesting quote for 50 ergonomic chairs\u201d",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="incoming"
          label="Quote \u00b7 Herman Miller"
          lines={["Aeron \u00d7 50 \u00b7 $1,294/unit \u00b7 4 wks"]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          delay={0.12}
          variant="incoming"
          label="Quote \u00b7 Steelcase"
          lines={["Leap \u00d7 50 \u00b7 $1,037/unit \u00b7 2 wks"]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          delay={0.24}
          variant="incoming"
          label="Quote \u00b7 Fully"
          lines={["Silta \u00d7 50 \u00b7 $849/unit \u00b7 3 wks"]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="thinking"
          label="🧠 Comparing Quotes"
          lines={[
            "Fully: $42,450 \u00b7 3 weeks",
            "Steelcase: $51,850 \u00b7 2 weeks",
            "Herman Miller: $64,700 \u00b7 4 weeks",
            "Best value: Fully \u00b7 34% below HM",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="PO Sent"
          lines={[
            "To: orders@fully.com",
            "Purchase order #PO-0419",
            "Silta Chair \u00d7 50 \u00b7 $42,450",
          ]}
        />
      )}
      {step >= 4 && <StatusLine label="Procurement complete" />}
    </div>
  );
}

function IntelAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={[
            "RivalMail \u00b7 updates@rivalmail.io",
            "\u201cAnnouncing our new Enterprise plan \u2014 $299/mo\u201d",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="extracted"
          label="📋 Data Extracted"
          lines={[
            "Competitor: RivalMail",
            "New pricing tier \u00b7 $299/mo Enterprise",
            "Features: SSO, dedicated IPs, SLA",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={[
            "AgentPost \u00b7 blog@agentpost.dev",
            "\u201cWe now support webhook delivery for inbound\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          delay={0.15}
          variant="extracted"
          label="📋 Data Extracted"
          lines={["Competitor: AgentPost", "New feature \u00b7 Inbound webhooks"]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Intel Report"
          lines={[
            "Weekly Competitive Brief",
            "2 pricing changes \u00b7 1 feature launch",
            "Sent to team@yourcompany.com",
          ]}
        />
      )}
      {step >= 4 && <StatusLine label="Report delivered" />}
    </div>
  );
}

function LeadQualAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={[
            "Jordan Park \u00b7 jordan@fintechco.com",
            "\u201cBuilding payment agents, need email for receipts and customer replies\u201d",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="action"
          label="Reply Sent"
          lines={[
            "To: jordan@fintechco.com",
            "\u201cExactly what we do. How many agents and what volume?\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="incoming"
          label="Reply Received"
          lines={[
            "Jordan Park \u00b7 jordan@fintechco.com",
            "\u201c40 agents, ~2K emails/day. Need custom domains.\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          delay={0.15}
          variant="thinking"
          label="🧠 Lead Scored"
          lines={[
            "🔥 Hot \u00b7 Enterprise fit",
            "Volume: 2,000/day \u00b7 Agents: 40",
            "Tier match: Scale ($99)",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Reply Sent"
          lines={[
            "To: jordan@fintechco.com",
            "\u201cGreat fit for Scale plan. Looping in Sam \u2014 cal.com/sam/demo\u201d",
          ]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          delay={0.15}
          variant="thinking"
          label="⚡ Handoff"
          lines={["\u2192 Sam (founder)", "Full context + Slack notification"]}
        />
      )}
      {step >= 4 && <StatusLine label="Qualified in 3 minutes" />}
    </div>
  );
}

function BacklinkAnim({ step }: { step: number }) {
  return (
    <div className="flex flex-col-reverse gap-2">
      {step >= 0 && (
        <FlowCard
          variant="action"
          label="Site 1 \u00b7 Product Hunt"
          lines={["Filling submission form", "Verification email requested"]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          variant="incoming"
          label="Email Received"
          lines={[
            "Product Hunt \u00b7 no-reply@producthunt.com",
            "\u201cConfirm your email address\u201d",
          ]}
        />
      )}
      {step >= 1 && (
        <FlowCard
          delay={0.12}
          variant="extracted"
          label="📋 OTP Extracted"
          lines={["Code: 529841 \u00b7 Submitted \u00b7 \u2713 Verified"]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          variant="action"
          label="Site 2 \u00b7 BetaList"
          lines={["Filling submission form"]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          delay={0.12}
          variant="incoming"
          label="Email Received"
          lines={[
            "BetaList \u00b7 confirm@betalist.com",
            "\u201cClick to verify your account\u201d",
          ]}
        />
      )}
      {step >= 2 && (
        <FlowCard
          delay={0.24}
          variant="extracted"
          label="📋 Link Extracted"
          lines={["Magic link clicked \u00b7 \u2713 Verified"]}
        />
      )}
      {step >= 3 && (
        <FlowCard
          variant="action"
          label="Progress"
          lines={[
            "\u2713 35 / 35 sites submitted",
            "35 verifications passed \u00b7 0 failures",
          ]}
        />
      )}
      {step >= 4 && (
        <StatusLine label="An afternoon of work, done autonomously" />
      )}
    </div>
  );
}

// ─── Shared animation internals ────────────────────────────────────────────────

const ANIMATIONS = [
  SDRAnim,
  SupportAnim,
  VerificationAnim,
  VendorAnim,
  IntelAnim,
  LeadQualAnim,
  BacklinkAnim,
];

function InboxHeader({ email, status }: { email: string; status: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 border-b border-edge pb-3.5">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-surface-4" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-4" />
        <span className="h-2.5 w-2.5 rounded-full bg-surface-4" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-0.5">
        <span className="font-mono text-xs text-secondary">{email}</span>
        <span className="flex items-center gap-1.5 text-xs text-secondary/60">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent/80" />
          {status}
        </span>
      </div>
      <div className="w-[46px]" />
    </div>
  );
}

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex justify-center gap-1.5 pt-4">
      {Array.from({ length: STEP_COUNT }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-500"
          style={{
            width: i === step ? "20px" : "6px",
            background: i <= step ? "var(--accent)" : "var(--surface-4)",
            opacity: i <= step ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );
}

// Desktop: glass card with aspect-square
function AnimationPanel({
  caseIndex,
  step,
}: {
  caseIndex: number;
  step: number;
}) {
  const Anim = ANIMATIONS[caseIndex];
  const { inboxEmail, inboxStatus } = USE_CASES[caseIndex];

  return (
    <div className="glass-strong aspect-square w-full p-5 sm:p-6">
      <div className="flex h-full flex-col rounded-xl bg-glass-strong-bg p-4 sm:p-5">
        <InboxHeader email={inboxEmail} status={inboxStatus} />
        <div className="min-h-0 flex-1 overflow-hidden">
          <Anim step={step} />
        </div>
        <StepDots step={step} />
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

export function UseCasesSection() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
  }, [active]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % STEP_COUNT);
    }, STEP_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeIn>
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-widest text-secondary">
            Use Cases
          </p>
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Built for any agent workflow.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-14 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
            {/* Tab nav (desktop) / Accordion (mobile) */}
            <div className="flex flex-col gap-1">
              {USE_CASES.map((uc, i) => {
                const isActive = i === active;
                const Anim = ANIMATIONS[i];

                return (
                  <div
                    key={uc.id}
                    className={`rounded-xl transition-colors duration-300 ${
                      isActive ? "bg-surface-1 lg:bg-transparent" : ""
                    }`}
                  >
                    {/* Header row */}
                    <button
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-4 text-left transition-all duration-300 ${
                        isActive
                          ? "py-3 lg:bg-surface-2 lg:py-4"
                          : "py-2.5 text-secondary hover:bg-surface-1 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-accent/15 text-accent"
                            : "bg-surface-2 text-secondary group-hover:bg-surface-3 group-hover:text-foreground"
                        }`}
                      >
                        <uc.Icon size={15} weight={isActive ? "fill" : "regular"} />
                      </span>
                      <span
                        className={`flex-1 font-medium leading-tight transition-colors duration-200 ${
                          isActive ? "text-foreground" : ""
                        }`}
                      >
                        {uc.label}
                      </span>
                      {/* Mobile chevron */}
                      <CaretDown
                        size={14}
                        className={`flex-shrink-0 text-secondary transition-transform duration-300 lg:hidden ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Desktop: blurb only */}
                    <div
                      className="hidden overflow-hidden transition-all duration-300 ease-out lg:block"
                      style={{
                        maxHeight: isActive ? "60px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <p className="px-4 pb-3 pl-14 text-sm leading-relaxed text-secondary">
                        {uc.blurb}
                      </p>
                    </div>

                    {/* Mobile: blurb + embedded animation */}
                    <div
                      className="overflow-hidden transition-all duration-400 ease-out lg:hidden"
                      style={{
                        maxHeight: isActive ? "700px" : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div className="px-4 pb-4 pt-1">
                        <p className="mb-4 pl-10 text-sm leading-relaxed text-secondary">
                          {uc.blurb}
                        </p>
                        {/* Compact animation */}
                        <div
                          className="flex h-[360px] flex-col rounded-xl p-4"
                          style={{ background: "var(--glass-strong-bg)" }}
                        >
                          <InboxHeader email={uc.inboxEmail} status={uc.inboxStatus} />
                          <div className="min-h-0 flex-1 overflow-hidden">
                            <Anim step={isActive ? step : 0} />
                          </div>
                          <StepDots step={isActive ? step : 0} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: full animation panel */}
            <div className="hidden lg:block">
              <AnimationPanel caseIndex={active} step={step} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
