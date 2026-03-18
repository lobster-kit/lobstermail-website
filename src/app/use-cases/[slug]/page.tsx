import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { DemoEmbed } from "@/components/DemoEmbed";
import { CodeSwitcher } from "@/components/CodeSwitcher";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { useCases, getUseCase, getOtherUseCases } from "@/lib/use-cases";
import * as PhosphorIcons from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) return {};

  const url = `https://lobstermail.ai/use-cases/${slug}`;
  return {
    title: uc.seoTitle,
    description: uc.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${uc.seoTitle} — LobsterMail`,
      description: uc.seoDescription,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${uc.seoTitle} — LobsterMail`,
      description: uc.seoDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const uc = getUseCase(slug);
  if (!uc) notFound();

  const others = getOtherUseCases(slug);
  const url = `https://lobstermail.ai/use-cases/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${uc.seoTitle} — LobsterMail`,
      description: uc.seoDescription,
      url,
      publisher: {
        "@type": "Organization",
        name: "LobsterMail",
        url: "https://lobstermail.ai",
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
          name: "Use Cases",
          item: "https://lobstermail.ai/use-cases",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: uc.title,
          item: url,
        },
      ],
    },
    ...(uc.steps && uc.steps.length > 0
      ? [
          {
            "@context": "https://schema.org" as const,
            "@type": "HowTo" as const,
            name: uc.seoTitle,
            description: uc.tagline,
            step: uc.steps.map((step, i) => ({
              "@type": "HowToStep" as const,
              position: i + 1,
              name: step.name,
              text: step.text,
            })),
          },
        ]
      : []),
    ...(uc.faqs && uc.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org" as const,
            "@type": "FAQPage" as const,
            mainEntity: uc.faqs.map((faq) => ({
              "@type": "Question" as const,
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer" as const,
                text: faq.answer,
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
        <div className="mx-auto max-w-6xl px-6">
          {/* Hero: title + tagline left, demo right */}
          <div id="demo" className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
            <div className="flex flex-col justify-center lg:flex-1">
              <FadeIn>
                <h1 className="h1" style={{ textShadow: '0 0 40px rgba(251,146,60,0.4)' }}>{uc.seoTitle ?? uc.title}</h1>
              </FadeIn>
              <FadeIn delay={0.08}>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-secondary">
                  {uc.tagline}
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.08} className="lg:flex-1">
              <DemoEmbed
                src={`/demos/${uc.demoSlug}/index.html`}
                title={`${uc.title} Demo`}
              />
            </FadeIn>
          </div>

          {/* Value props */}
          {uc.valueProps && uc.valueProps.length > 0 && (
            <FadeIn delay={0.12}>
              <div className="mt-20 sm:mt-28 sm:py-[50px] grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-edge text-center">
                {uc.valueProps.map((prop, i) => (
                  <div key={i} className="relative px-0 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                    <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-24 w-24 rounded-full bg-accent/[0.06] blur-2xl" />
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{prop.title}</h3>
                    <p className="mt-2 text-lg leading-relaxed text-secondary">{prop.description}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}


          {/* FAQ */}
          {uc.faqs && uc.faqs.length > 0 && (
            <FadeIn delay={0.24}>
              <div id="faq">
                <FAQ items={uc.faqs} />
              </div>
            </FadeIn>
          )}

          {/* CTA */}
          <FinalCTA />

          {/* More use cases */}
          <FadeIn delay={0.4}>
            <div id="more-use-cases" className="mt-20 sm:mt-28 pb-28 sm:pb-36">
              <h2 className="mb-8 text-xl font-bold tracking-tight sm:text-2xl">
                More use cases
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((other) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Icon = (PhosphorIcons as any)[other.iconName] as React.ComponentType<{ size?: number; className?: string }> | undefined;
                  return (
                    <Link
                      key={other.slug}
                      href={`/use-cases/${other.slug}`}
                      className="group rounded-2xl border-2 border-edge bg-background p-6 transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-4px_rgba(0,80,171,0.08)]"
                    >
                      {Icon && (
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-accent/40 bg-accent/[0.08] text-accent">
                          <Icon size={18} />
                        </div>
                      )}
                      <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                        {other.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary">
                        {other.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </div>
  );
}
