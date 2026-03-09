import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getGuide, getGuides } from "@/lib/docs";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsPrevNext } from "@/components/docs/DocsPrevNext";
import { docsComponents } from "@/components/docs/mdx-components";
import type { Metadata } from "next";

// Pre-render all guide pages at build time
export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};

  const url = `https://lobstermail.ai/docs/${slug}`;

  return {
    title: `${guide.title} — LobsterMail Docs`,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${guide.title} — LobsterMail Docs`,
      description: guide.description,
      url,
      type: "article",
      siteName: "LobsterMail",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@samuelchenard",
      title: `${guide.title} — LobsterMail Docs`,
      description: guide.description,
      images: ["/og-image.png"],
    },
  };
}

function JsonLd({ guide, guides }: { guide: { title: string; description: string; lastUpdated: string; slug: string }; guides: { title: string; slug: string }[] }) {
  const url = `https://lobstermail.ai/docs/${guide.slug}`;

  const structuredData = [
    // TechArticle
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: guide.title,
      description: guide.description,
      dateModified: guide.lastUpdated,
      author: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
      },
      publisher: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
      },
      proficiencyLevel: "Beginner",
      about: {
        "@type": "SoftwareApplication",
        name: "LobsterMail",
        applicationCategory: "DeveloperApplication",
      },
      mainEntityOfPage: url,
      isPartOf: {
        "@type": "CreativeWork",
        name: "LobsterMail Documentation",
        url: "https://lobstermail.ai/docs",
      },
    },
    // BreadcrumbList
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
          name: "Docs",
          item: "https://lobstermail.ai/docs",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: guide.title,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [guide, guides] = await Promise.all([getGuide(slug), getGuides()]);

  if (!guide) notFound();

  return (
    <>
      <JsonLd guide={guide} guides={guides} />
      <article>
        <DocsHeader
          title={guide.title}
          description={guide.description}
          lastUpdated={guide.lastUpdated}
        />
        <div className="docs-content">
          <MDXRemote
            source={guide.content.replace(/^#\s+.+\n*/, "")}
            components={docsComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
        <DocsPrevNext guides={guides} currentSlug={slug} />
      </article>
    </>
  );
}
