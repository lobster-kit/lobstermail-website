import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/blog";
import { getAuthor } from "@/lib/authors";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { blogComponents } from "@/components/blog/mdx-components";

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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
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
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32">
        {/* Back Link */}
        <div className="mx-auto max-w-4xl px-6 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            &larr; Back to Blog
          </Link>
        </div>

        {/* Article Card */}
        <article className="mx-auto max-w-4xl px-6 pb-28">
          <div className="glass relative z-10 overflow-hidden">
            {/* Hero Image */}
            {post.image && (
              <div className="border-b-2 border-edge">
                <Image
                  src={post.image}
                  alt={post.title}
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
              <time className="mt-4 block text-sm text-secondary">
                {formatDate(post.date)}
              </time>

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
        </article>
      </main>
      <Footer />
    </div>
  );
}
