import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { getAllTerms, getAlphabetIndex, GLOSSARY_CATEGORIES } from "@/lib/glossary";
import { AlphabetNav } from "@/components/glossary/AlphabetNav";
import { CategoryFilter } from "@/components/glossary/CategoryFilter";
import { GlossaryCard } from "@/components/glossary/GlossaryCard";

export const metadata: Metadata = {
  title: "AI & Email Glossary",
  description:
    "Definitions for AI agent, email infrastructure, and protocol terms. From context engineering to DKIM — every term explained for developers building with AI.",
  alternates: { canonical: "https://lobstermail.ai/glossary" },
  openGraph: {
    title: "AI & Email Glossary — LobsterMail",
    description:
      "Definitions for AI agent, email infrastructure, and protocol terms. From context engineering to DKIM — every term explained for developers building with AI.",
    url: "https://lobstermail.ai/glossary",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Email Glossary — LobsterMail",
    description:
      "Definitions for AI agent, email infrastructure, and protocol terms. From context engineering to DKIM — every term explained for developers building with AI.",
    images: ["/og-image.png"],
  },
};

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allTerms = getAllTerms();
  const alphabetIndex = getAlphabetIndex();
  const activeLetters = new Set(alphabetIndex.keys());

  // Filter by category if set
  const filteredTerms = category
    ? allTerms.filter((t) => t.category === category)
    : allTerms;

  // Group filtered terms by letter
  const grouped = new Map<string, typeof filteredTerms>();
  for (const term of filteredTerms) {
    const letter = term.title[0].toUpperCase();
    const group = grouped.get(letter) ?? [];
    group.push(term);
    grouped.set(letter, group);
  }

  const sortedLetters = Array.from(grouped.keys()).sort();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: "AI & Email Glossary — LobsterMail",
      description:
        "Definitions for AI agent, email infrastructure, and protocol terms.",
      url: "https://lobstermail.ai/glossary",
      hasDefinedTerm: allTerms.map((t) => ({
        "@type": "DefinedTerm",
        name: t.title,
        description: t.shortDefinition,
        url: `https://lobstermail.ai/glossary/${t.slug}`,
      })),
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
          name: "Glossary",
          item: "https://lobstermail.ai/glossary",
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
        {/* Header */}
        <section className="mx-auto max-w-6xl px-6 pb-10">
          <FadeIn>
            <h1 className="h1">AI & Email Glossary</h1>
            <p className="p-text mt-4">
              Every AI, email, and agent term explained for developers. From
              context engineering to DKIM.
            </p>
          </FadeIn>
        </section>

        {/* Category Filter */}
        <section className="mx-auto max-w-6xl px-6 pb-6">
          <FadeIn delay={0.05}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">
              Filter by category
            </p>
            <Suspense>
              <CategoryFilter />
            </Suspense>
          </FadeIn>
        </section>

        {/* Alphabet Nav */}
        <section className="mx-auto max-w-6xl px-6 pb-10">
          <FadeIn delay={0.1}>
            <AlphabetNav activeLetters={activeLetters} />
          </FadeIn>
        </section>

        {/* Terms grouped by letter */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          {sortedLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-10">
              <FadeIn>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  {letter}
                </h2>
              </FadeIn>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {grouped.get(letter)!.map((term) => (
                  <FadeIn key={term.slug}>
                    <GlossaryCard term={term} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <p className="text-secondary">
              No terms found for this category.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
