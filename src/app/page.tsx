import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { UseCasesSection } from "@/components/UseCasesSection";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "LobsterMail — Free Email for AI Agents",
  description:
    "Give your AI agent its own email address in seconds. Free tier, no human signup, instant inbox creation. Built for developers building with OpenClaw and MCP.",
  alternates: { canonical: "https://lobstermail.ai" },
  openGraph: {
    title: "LobsterMail — Free Email for AI Agents",
    description:
      "Give your AI agent its own email address in seconds. Free tier, no human signup, instant inbox creation.",
    url: "https://lobstermail.ai",
    siteName: "LobsterMail",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LobsterMail — Free Email for AI Agents" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@samuelchenard",
    title: "LobsterMail — Free Email for AI Agents",
    description:
      "Give your AI agent its own email address in seconds. Free tier, no human signup, instant inbox creation.",
    images: ["/og-image.png"],
  },
};

const faqJsonLd = {
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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main id="top">
        <Hero />
        <ProblemSolution />
        <UseCasesSection />

        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
