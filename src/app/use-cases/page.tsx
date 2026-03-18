import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { useCases } from "@/lib/use-cases";

const url = "https://lobstermail.ai/use-cases";

export const metadata: Metadata = {
  title: "AI Agent Email Use Cases",
  description:
    "See how agents use LobsterMail — from onboarding and verification to billing automation, data extraction, and multi-inbox search.",
  alternates: { canonical: url },
  openGraph: {
    title: "Use Cases — LobsterMail",
    description:
      "See how agents use LobsterMail — from onboarding and verification to billing automation, data extraction, and multi-inbox search.",
    url,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases — LobsterMail",
    description:
      "See how agents use LobsterMail — from onboarding and verification to billing automation and more.",
    images: ["/og-image.png"],
  },
};

export default function UseCasesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Use Cases — LobsterMail",
      description:
        "See how agents use LobsterMail for email verification, billing, data extraction, and more.",
      url,
      publisher: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: useCases.map((uc, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://lobstermail.ai/use-cases/${uc.slug}`,
          name: uc.title,
        })),
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
          name: "Use Cases",
          item: url,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32">
        <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
          <FadeIn>
            <h1 className="h1">Use Cases</h1>
            <p className="p-text mt-4 max-w-2xl">
              Real workflows agents run with LobsterMail — from signing up for
              services to managing multi-turn email conversations.
            </p>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <FadeIn key={uc.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/use-cases/${uc.slug}`}
                  className="group flex h-full flex-col rounded-2xl border-2 border-edge bg-background p-6 transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]"
                >
                  <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {uc.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-secondary">
                    {uc.description}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View details &rarr;
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
