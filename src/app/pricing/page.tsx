import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "LobsterMail pricing — free agent email or $9/mo Builder plan. No traps, no surprise fees.",
  alternates: {
    canonical: "https://lobstermail.ai/pricing",
  },
  openGraph: {
    title: "Pricing — LobsterMail",
    description:
      "LobsterMail pricing — free agent email or $9/mo Builder plan. No traps, no surprise fees.",
    url: "https://lobstermail.ai/pricing",
    siteName: "LobsterMail",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LobsterMail Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@samuelchenard",
    title: "Pricing — LobsterMail",
    description:
      "LobsterMail pricing — free agent email or $9/mo Builder plan. No traps, no surprise fees.",
    images: ["/og-image.png"],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "LobsterMail Pricing",
    description:
      "LobsterMail pricing — free agent email or $9/mo Builder plan. No traps, no surprise fees.",
    url: "https://lobstermail.ai/pricing",
    publisher: {
      "@type": "Organization",
      name: "LobsterMail",
      url: "https://lobstermail.ai",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lobstermail.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: "https://lobstermail.ai/pricing",
      },
    ],
  },
  {
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
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32">
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
