import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getAuthorSlug,
} from "@/lib/authors";
import { getPostsByAuthor, formatDate } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllAuthorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: `Posts by ${author.name}`,
    description: `Read all blog posts by ${author.name}, ${author.title} at LobsterMail.`,
    alternates: {
      canonical: `https://lobstermail.ai/blog/author/${slug}`,
    },
    openGraph: {
      title: `Posts by ${author.name} — LobsterMail`,
      description: `Read all blog posts by ${author.name}, ${author.title} at LobsterMail.`,
      url: `https://lobstermail.ai/blog/author/${slug}`,
      type: "profile",
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      image: `https://lobstermail.ai${author.avatar}`,
      sameAs: author.socials.map((s) => s.url),
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32">
        {/* Author Header */}
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <FadeIn>
            <div className="flex items-center gap-5">
              <Image
                src={author.avatar}
                alt={author.name}
                width={72}
                height={72}
                className="rounded-full border-2 border-edge"
              />
              <div>
                <h1 className="h2">{author.name}</h1>
                <p className="text-secondary">{author.title} at LobsterMail</p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Posts */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <p className="mb-8 text-sm text-secondary">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.06} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-edge bg-background transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]">
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
                      <div className="relative z-10 mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="inline-flex whitespace-nowrap rounded-full border-2 border-edge bg-accent/[0.08] px-3 py-0.5 text-xs lg:text-[10px] font-medium text-accent transition-colors hover:bg-accent/[0.15] hover:border-accent/30"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}
                    <h2 className="h4 mb-2 line-clamp-2 transition-colors group-hover:text-accent lg:text-[18px]!">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="after:absolute after:inset-0"
                      >
                        {post.title}
                      </Link>
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
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
