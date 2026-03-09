import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getTermBySlug,
  getAllTermSlugs,
  getAllTerms,
  GLOSSARY_CATEGORIES,
} from "@/lib/glossary";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { extractFaqItems } from "@/lib/blog";
import { blogComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/docs/TableOfContents";

export async function generateStaticParams() {
  return getAllTermSlugs().map((term) => ({ term }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const entry = getTermBySlug(term);
  if (!entry) return {};

  const title = `What is ${entry.title}? — AI & Email Glossary`;
  const description = entry.shortDefinition;

  return {
    title,
    description,
    alternates: {
      canonical: `https://lobstermail.ai/glossary/${term}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://lobstermail.ai/glossary/${term}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const entry = getTermBySlug(term);
  if (!entry) notFound();

  const categoryLabel =
    GLOSSARY_CATEGORIES.find((c) => c.id === entry.category)?.label ??
    entry.category;

  // Resolve related terms
  const allTerms = getAllTerms();
  const relatedTermObjects = entry.relatedTerms
    .map((slug) => allTerms.find((t) => t.slug === slug))
    .filter(Boolean);

  // Resolve related blog posts
  const relatedBlogPosts = entry.relatedBlogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean);

  const faqItems = extractFaqItems(entry.content);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: entry.title,
      description: entry.shortDefinition,
      url: `https://lobstermail.ai/glossary/${term}`,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "AI & Email Glossary",
        url: "https://lobstermail.ai/glossary",
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
          name: "Glossary",
          item: "https://lobstermail.ai/glossary",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: entry.title,
          item: `https://lobstermail.ai/glossary/${term}`,
        },
      ],
    },
    ...(faqItems.length > 0
      ? [
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
        ]
      : []),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32">
        <div className="mx-auto max-w-4xl px-6 pb-28 xl:max-w-6xl">
          {/* Back Link */}
          <div className="pb-8">
            <Link
              href="/glossary"
              className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              &larr; Back to Glossary
            </Link>
          </div>

          {/* Article + TOC */}
          <div className="xl:flex xl:gap-10">
            <article className="min-w-0 flex-1 mx-auto max-w-2xl md:max-w-3xl xl:mx-0 xl:max-w-none">
              <div className="glass relative z-10 overflow-hidden">
                <div className="px-8 py-10 sm:px-12 sm:py-14">
                  {/* Category badge */}
                  <Link
                    href={`/glossary?category=${entry.category}`}
                    className="inline-flex rounded-full border-2 border-edge bg-accent/[0.08] px-3 py-0.5 text-xs font-medium text-accent transition-colors hover:bg-accent/[0.15] hover:border-accent/30"
                  >
                    {categoryLabel}
                  </Link>

                  <h1 className="h1 mt-4 mb-4">{entry.title}</h1>
                  <p className="text-lg text-secondary leading-relaxed">
                    {entry.shortDefinition}
                  </p>

                  <hr className="my-10 border-t-2 border-edge" />

                  <div className="prose-claw">
                    <MDXRemote
                      source={entry.content}
                      components={blogComponents}
                      options={{
                        mdxOptions: { remarkPlugins: [remarkGfm] },
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>

            {/* Table of Contents */}
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents />
            </aside>
          </div>

          {/* Related Glossary Terms */}
          {relatedTermObjects.length > 0 && (
            <section className="mt-16">
              <h2 className="h3 mb-6">Related terms</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTermObjects.map((rt) => (
                  <Link
                    key={rt!.slug}
                    href={`/glossary/${rt!.slug}`}
                    className="group rounded-xl border-2 border-edge p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/30"
                  >
                    <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                      {rt!.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-secondary line-clamp-2">
                      {rt!.shortDefinition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related Blog Posts */}
          {relatedBlogPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="h3 mb-6">Related articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogPosts.map((rp) => (
                  <Link
                    key={rp!.slug}
                    href={`/blog/${rp!.slug}`}
                    className="group overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
                        {rp!.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-secondary line-clamp-2">
                        {rp!.description}
                      </p>
                      <div className="mt-3 text-xs text-secondary">
                        <time>{formatDate(rp!.date)}</time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
