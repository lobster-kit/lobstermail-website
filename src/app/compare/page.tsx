import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { getComparisonPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Agent Email Comparisons",
  description:
    "Compare LobsterMail with other agent email providers. Side-by-side breakdowns of features, pricing, and developer experience.",
  alternates: {
    canonical: "https://lobstermail.ai/compare",
  },
  openGraph: {
    title: "Agent Email Comparisons — LobsterMail",
    description:
      "Compare LobsterMail with other agent email providers. Side-by-side breakdowns of features, pricing, and developer experience.",
    url: "https://lobstermail.ai/compare",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Email Comparisons — LobsterMail",
    description:
      "Compare LobsterMail with other agent email providers.",
    images: ["/og-image.png"],
  },
};

export default function ComparePage() {
  const posts = getComparisonPosts();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Agent Email Comparisons — LobsterMail",
      description:
        "Compare LobsterMail with other agent email providers.",
      url: "https://lobstermail.ai/compare",
      publisher: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `https://lobstermail.ai/blog/${post.slug}`,
          name: post.title,
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
          name: "Compare",
          item: "https://lobstermail.ai/compare",
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
            <h1 className="h1">Agent Email Comparisons</h1>
            <p className="p-text mt-4">
              Side-by-side breakdowns of features, pricing, and developer
              experience across agent email providers.
            </p>
          </FadeIn>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]"
                >
                  {post.image && (
                    <div className="aspect-[16/9] overflow-hidden border-b-2 border-edge">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={338}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="h4 mb-2 line-clamp-2 transition-colors group-hover:text-accent lg:text-[18px]!">
                      {post.title}
                    </h2>
                    <p className="mb-3 line-clamp-2 text-sm text-secondary">
                      {post.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs text-secondary">
                      <time>{formatDate(post.date)}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
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
