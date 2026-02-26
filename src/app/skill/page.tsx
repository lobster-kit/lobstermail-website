import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { docsComponents } from "@/components/docs/mdx-components";
import { getSkillContent } from "@/lib/docs";

const url = "https://lobstermail.ai/skill";

export const metadata: Metadata = {
  title: "Skill File — LobsterMail",
  description:
    "LobsterMail skill file for AI agents. Setup instructions, SDK reference, MCP tools, REST API, and pricing — everything an agent needs to use LobsterMail.",
  alternates: { canonical: url },
  openGraph: {
    title: "Skill File — LobsterMail",
    description:
      "LobsterMail skill file for AI agents. Setup, SDK, MCP tools, REST API, and pricing.",
    url,
    type: "article",
    siteName: "LobsterMail",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill File — LobsterMail",
    description:
      "LobsterMail skill file for AI agents. Setup, SDK, MCP tools, REST API, and pricing.",
    images: ["/og-image.png"],
  },
};

function stripFrontmatter(raw: string): string {
  // Remove YAML frontmatter (--- ... ---)
  return raw.replace(/^---[\s\S]*?---\n*/, "");
}

export default async function SkillPage() {
  const raw = await getSkillContent();
  // Strip frontmatter and the first H1 heading
  const content = stripFrontmatter(raw).replace(/^#\s+.+\n*/, "");

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pt-32 pb-28">
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10">
          <div className="min-w-0">
            <FadeIn>
              <header className="mb-12">
                <p className="font-mono text-xs uppercase tracking-wider text-secondary">
                  Skill File
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  LobsterMail
                </h1>
                <p className="mt-3 max-w-2xl text-secondary">
                  Email for AI agents. Create inboxes, receive and send email.
                  No API keys, no human signup, no configuration.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <code className="rounded-md border border-edge-subtle bg-surface-4 px-2 py-1 font-mono text-xs text-secondary">
                    https://api.lobstermail.ai/skill
                  </code>
                </div>
              </header>
            </FadeIn>

            <article className="docs-content">
              <MDXRemote
                source={content}
                components={docsComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </article>
          </div>

          <aside>
            <TableOfContents />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
