import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  getPostBySlug,
  getAllSlugs,
  formatDate,
  getRelatedPosts,
  getAdjacentPosts,
  extractFaqItems,
} from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { blogComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/docs/TableOfContents";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://lobstermail.ai/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.updatedDate && { modifiedTime: post.updatedDate }),
      ...(post.image && {
        images: [{ url: post.image, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = post.author ? getAuthor(post.author) : null;
  const { prev, next } = getAdjacentPosts(slug);
  const relatedPosts = getRelatedPosts(slug);
  const faqItems = extractFaqItems(post.content);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      ...(post.updatedDate && { dateModified: post.updatedDate }),
      ...(post.image && {
        image: `https://lobstermail.ai${post.image}`,
      }),
      ...(author && {
        author: {
          "@type": "Person",
          name: author.name,
          jobTitle: author.title,
          url: author.socials.find((s) => s.platform === "linkedin")?.url,
          sameAs: author.socials.map((s) => s.url),
        },
      }),
      publisher: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://lobstermail.ai/blog/${slug}`,
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
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://lobstermail.ai/blog/${slug}`,
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
    // Hub page CollectionPage schema
    ...(post.type === "hub"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: post.title,
            description: post.description,
            url: `https://lobstermail.ai/blog/${slug}`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: relatedPosts.map((rp, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://lobstermail.ai/blog/${rp.slug}`,
                name: rp.title,
              })),
            },
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
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
            >
              &larr; Back to Blog
            </Link>
          </div>

          {/* Article + TOC */}
          <div className="xl:flex xl:gap-10">
            {/* Article Card */}
            <article className="min-w-0 flex-1 mx-auto max-w-2xl md:max-w-3xl xl:mx-0 xl:max-w-none">
              <div className="glass relative z-10 overflow-hidden">
                {/* Hero Image */}
                {post.image && (
                  <div className="border-b-2 border-edge">
                    <Image
                      src={post.image}
                      alt={post.imageAlt ?? `Illustration for ${post.title}`}
                      width={1200}
                      height={630}
                      className="h-auto w-full"
                      priority
                    />
                  </div>
                )}

                {/* Article Header + Content */}
                <div className="px-8 py-10 sm:px-12 sm:py-14">
                  {post.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
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

                  <h1 className="h1 mb-4">{post.title}</h1>
                  <p className="p-text text-secondary">{post.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-secondary">
                    <time>{formatDate(post.date)}</time>
                    {post.updatedDate && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span>Updated {formatDate(post.updatedDate)}</span>
                      </>
                    )}
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  {author && (
                    <div className="mt-6">
                      <AuthorByline author={author} />
                    </div>
                  )}

                  <hr className="my-10 border-t-2 border-edge" />

                  <div className="prose-claw">
                    <MDXRemote
                      source={post.content}
                      components={blogComponents}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  </div>
                </div>
              </div>
              {/* Prev/Next Navigation */}
              {(prev || next) && (
                <nav
                  className="mt-10 grid grid-cols-2 gap-4 px-8 pb-10 sm:px-12"
                  aria-label="Post navigation"
                >
                  {prev ? (
                    <Link
                      href={`/blog/${prev.slug}`}
                      className="group flex flex-col rounded-xl border-2 border-edge p-4 transition-colors hover:border-accent/30"
                    >
                      <span className="text-xs text-secondary">
                        &larr; Previous
                      </span>
                      <span className="mt-1 text-sm font-medium text-foreground transition-colors group-hover:text-accent line-clamp-1">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group flex flex-col items-end rounded-xl border-2 border-edge p-4 text-right transition-colors hover:border-accent/30"
                    >
                      <span className="text-xs text-secondary">
                        Next &rarr;
                      </span>
                      <span className="mt-1 text-sm font-medium text-foreground transition-colors group-hover:text-accent line-clamp-1">
                        {next.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}
            </article>

            {/* Table of Contents — right sidebar on lg */}
            <aside className="hidden xl:block w-56 shrink-0">
              <TableOfContents />
            </aside>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="h3 mb-6">Related posts</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1"
                  >
                    {rp.image && (
                      <div className="aspect-[16/9] overflow-hidden border-b-2 border-edge">
                        <Image
                          src={rp.image}
                          alt={rp.imageAlt ?? `Illustration for ${rp.title}`}
                          width={400}
                          height={225}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-accent line-clamp-2">
                        {rp.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs text-secondary">
                        <time>{formatDate(rp.date)}</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>{rp.readingTime} min read</span>
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
