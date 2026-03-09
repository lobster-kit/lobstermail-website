import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { getAllPosts, getPaginatedPosts } from "@/lib/blog";
import { TopicNav } from "@/components/TopicNav";
import { BlogSearchProvider, BlogSearchInput, BlogSearchResults } from "@/components/BlogSearch";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const canonical =
    currentPage > 1
      ? `https://lobstermail.ai/blog?page=${currentPage}`
      : "https://lobstermail.ai/blog";
  const url = canonical;

  return {
    title: "AI Agent Email Blog",
    description:
      "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
    alternates: { canonical },
    openGraph: {
      title: "AI Agent Email Blog — LobsterMail",
      description:
        "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
      url,
      siteName: "LobsterMail",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Agent Email Blog — LobsterMail" }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@samuelchenard",
      title: "AI Agent Email Blog — LobsterMail",
      description:
        "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const { posts, totalPages, currentPage: resolvedPage } =
    getPaginatedPosts(currentPage);
  const allPosts = getAllPosts().map(({ content, ...meta }) => meta);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AI Agent Email Blog — LobsterMail",
      description:
        "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
      url: "https://lobstermail.ai/blog",
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
          name: "Blog",
          item: "https://lobstermail.ai/blog",
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
        <BlogSearchProvider allPosts={allPosts}>
          {/* Header */}
          <section className="mx-auto max-w-6xl px-6 pb-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <FadeIn>
                <h1 className="h1">AI Agent Email Blog</h1>
                <p className="p-text mt-4">
                  Learn about AI agent email — tutorials, use cases, and updates
                  from the LobsterMail team.
                </p>
              </FadeIn>
              <FadeIn delay={0.1} className="shrink-0 sm:mt-2">
                <BlogSearchInput />
              </FadeIn>
            </div>
          </section>

          {/* Topic Navigation */}
          <TopicNav />

          {/* Post Grid + Pagination */}
          <BlogSearchResults
            paginatedPosts={posts.map(({ content, ...meta }) => meta)}
            currentPage={resolvedPage}
            totalPages={totalPages}
          />
        </BlogSearchProvider>
      </main>
      <Footer />
    </div>
  );
}
