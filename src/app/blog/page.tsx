import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { getPaginatedPosts, formatDate } from "@/lib/blog";
import { TopicNav } from "@/components/TopicNav";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
  alternates: {
    canonical: "https://lobstermail.ai/blog",
  },
  openGraph: {
    title: "Blog — LobsterMail",
    description:
      "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
    url: "https://lobstermail.ai/blog",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — LobsterMail",
    description:
      "Learn about AI agent email — tutorials, use cases, and updates from the LobsterMail team.",
    images: ["/og-image.png"],
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const { posts, totalPages, currentPage: resolvedPage } =
    getPaginatedPosts(currentPage);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32">
        {/* Header */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <FadeIn>
            <h1 className="h1">Blog</h1>
            <p className="p-text mt-4">
              Learn about AI agent email — tutorials, use cases, and updates
              from the LobsterMail team.
            </p>
          </FadeIn>
        </section>

        {/* Topic Navigation */}
        <TopicNav />

        {/* Post Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]">
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
                  <div className="p-6">
                    {post.tags.length > 0 && (
                      <div className="relative z-10 mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="inline-flex rounded-full border-2 border-edge bg-accent/[0.08] px-3 py-0.5 text-xs font-medium text-accent transition-colors hover:bg-accent/[0.15] hover:border-accent/30"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                    <h2 className="h4 mb-2 line-clamp-2 transition-colors group-hover:text-accent">
                      <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-3 line-clamp-2 text-sm text-secondary">
                      {post.description}
                    </p>
                    <time className="text-xs text-secondary">
                      {formatDate(post.date)}
                    </time>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn>
              <nav
                className="mt-16 flex items-center justify-center gap-2"
                aria-label="Blog pagination"
              >
                {resolvedPage > 1 && (
                  <Link
                    href={`/blog?page=${resolvedPage - 1}`}
                    className="rounded-lg border-2 border-edge px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - resolvedPage) <= 2
                  )
                  .map((p, i, arr) => {
                    const showEllipsis = i > 0 && p - arr[i - 1] > 1;
                    return (
                      <span key={p} className="flex items-center gap-2">
                        {showEllipsis && (
                          <span className="px-1 text-secondary">...</span>
                        )}
                        <Link
                          href={`/blog?page=${p}`}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-medium transition-colors ${
                            p === resolvedPage
                              ? "border-accent bg-accent/[0.08] text-accent"
                              : "border-edge text-secondary hover:border-edge-hover hover:text-foreground"
                          }`}
                        >
                          {p}
                        </Link>
                      </span>
                    );
                  })}
                {resolvedPage < totalPages && (
                  <Link
                    href={`/blog?page=${resolvedPage + 1}`}
                    className="rounded-lg border-2 border-edge px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </FadeIn>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
