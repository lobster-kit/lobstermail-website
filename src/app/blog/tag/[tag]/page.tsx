import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { getAllTags, getPostsByTag, getPaginatedPostsByTag, formatDate } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const { page } = await searchParams;
  const decoded = decodeURIComponent(tag);
  const postCount = getPostsByTag(decoded).length;
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const canonical =
    currentPage > 1
      ? `https://lobstermail.ai/blog/tag/${tag}?page=${currentPage}`
      : `https://lobstermail.ai/blog/tag/${tag}`;

  return {
    title: decoded,
    description: `Articles tagged "${decoded}" on the LobsterMail blog.`,
    ...(postCount < 3 && { robots: { index: false, follow: true } }),
    alternates: { canonical },
    openGraph: {
      title: `${decoded} — Blog`,
      description: `Articles tagged "${decoded}" on the LobsterMail blog.`,
      url: canonical,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${decoded} — LobsterMail Blog`,
      description: `Articles tagged "${decoded}" on the LobsterMail blog.`,
      images: ["/og-image.png"],
    },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const { page } = await searchParams;
  const decoded = decodeURIComponent(tag);
  const currentPage = Math.max(1, parseInt(page ?? "1", 10) || 1);
  const {
    posts,
    totalPages,
    currentPage: resolvedPage,
    totalPosts,
  } = getPaginatedPostsByTag(decoded, currentPage);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="pt-32">
        {/* Header */}
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <FadeIn>
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              &larr; All posts
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="h1">{decoded}</h1>
              <span className="mt-1 inline-flex rounded-full border-2 border-edge bg-accent/[0.08] px-3 py-0.5 text-sm font-medium text-accent">
                {totalPosts} {totalPosts === 1 ? "post" : "posts"}
              </span>
            </div>
          </FadeIn>
        </section>

        {/* Post Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
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
                    {post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className={`inline-flex whitespace-nowrap rounded-full border-2 px-3 py-0.5 text-xs lg:text-[10px] font-medium ${
                              t === decoded
                                ? "border-accent bg-accent/[0.15] text-accent"
                                : "border-edge bg-accent/[0.08] text-accent"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="h4 mb-2 line-clamp-2 transition-colors group-hover:text-accent lg:text-[18px]!">
                      {post.title}
                    </h2>
                    <p className="mb-3 line-clamp-2 text-sm text-secondary">
                      {post.description}
                    </p>
                    <time className="mt-auto text-xs text-secondary">
                      {formatDate(post.date)}
                    </time>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <FadeIn>
              <nav
                className="mt-16 flex items-center justify-center gap-2"
                aria-label="Tag pagination"
              >
                {resolvedPage > 1 && (
                  <Link
                    href={`/blog/tag/${tag}?page=${resolvedPage - 1}`}
                    className="rounded-lg border-2 border-edge bg-background px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
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
                          href={`/blog/tag/${tag}?page=${p}`}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-sm font-medium transition-colors ${
                            p === resolvedPage
                              ? "border-accent bg-background text-accent ring-1 ring-inset ring-accent/[0.15]"
                              : "border-edge bg-background text-secondary hover:border-edge-hover hover:text-foreground"
                          }`}
                        >
                          {p}
                        </Link>
                      </span>
                    );
                  })}
                {resolvedPage < totalPages && (
                  <Link
                    href={`/blog/tag/${tag}?page=${resolvedPage + 1}`}
                    className="rounded-lg border-2 border-edge bg-background px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-edge-hover hover:text-foreground"
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
