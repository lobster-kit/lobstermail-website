# Adding LobsterMail Docs to The Claw Depot

Instructions for embedding LobsterMail documentation into the Next.js site at `lobster-mail.vercel.app`.

---

## Data Source

All documentation is served from the LobsterMail API. No git access, npm packages, or API keys required.

**Base URL:** `https://api.lobstermail.ai`

| Endpoint | Response | Use |
|---|---|---|
| `GET /v1/docs/guides` | JSON array of guide metadata | Build sidebar navigation |
| `GET /v1/docs/guides/:slug` | JSON with full MDX content | Render individual doc pages |
| `GET /v1/docs/openapi` | Raw YAML string | API reference page |

---

## 1. Data Fetching Layer

Create a shared data module. All endpoints are public — no auth headers needed.

```typescript
// lib/docs.ts
const API = "https://api.lobstermail.ai";

export interface GuideMeta {
  title: string;
  slug: string;
  order: number;
  description: string;
  lastUpdated: string;
}

export interface Guide extends GuideMeta {
  content: string; // raw MDX
}

export async function getGuides(): Promise<GuideMeta[]> {
  const res = await fetch(`${API}/v1/docs/guides`, { next: { revalidate: 120 } });
  const { guides } = await res.json();
  return guides; // already sorted by `order`
}

export async function getGuide(slug: string): Promise<Guide | null> {
  const res = await fetch(`${API}/v1/docs/guides/${slug}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getOpenApiSpec(): Promise<string> {
  const res = await fetch(`${API}/v1/docs/openapi`, { next: { revalidate: 120 } });
  return res.text();
}
```

`revalidate: 120` means Next.js caches for 2 minutes then re-fetches in the background. Docs only change on deploy, so this is more than fast enough while keeping the site snappy.

---

## 2. Route Structure

```
/products/lobster-mail/docs                    → redirect to first guide
/products/lobster-mail/docs/[slug]             → individual guide page
/products/lobster-mail/docs/api-reference      → OpenAPI spec viewer
```

This nests docs under the existing LobsterMail product page.

---

## 3. Sidebar Component

The sidebar drives navigation between guides. It should match the existing glassmorphic card style.

```tsx
// components/docs-sidebar.tsx
import Link from "next/link";
import { getGuides } from "@/lib/docs";

export async function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  const guides = await getGuides();

  return (
    <nav className="glass sticky top-24 rounded-xl p-4 space-y-1">
      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">
        Documentation
      </p>
      {guides.map((g) => (
        <Link
          key={g.slug}
          href={`/products/lobster-mail/docs/${g.slug}`}
          className={`
            block px-3 py-2 rounded-lg text-sm transition-colors duration-200
            ${
              g.slug === activeSlug
                ? "bg-accent/15 text-accent font-medium"
                : "text-secondary hover:text-foreground hover:bg-white/5"
            }
          `}
        >
          {g.title}
        </Link>
      ))}
      <div className="border-t border-white/10 my-3" />
      <Link
        href="/products/lobster-mail/docs/api-reference"
        className={`
          block px-3 py-2 rounded-lg text-sm transition-colors duration-200
          ${
            activeSlug === "api-reference"
              ? "bg-accent/15 text-accent font-medium"
              : "text-secondary hover:text-foreground hover:bg-white/5"
          }
        `}
      >
        API Reference
      </Link>
    </nav>
  );
}
```

---

## 4. Docs Layout

Wraps all doc pages with the sidebar. Uses the existing site layout (dark background, centered content).

```tsx
// app/products/lobster-mail/docs/layout.tsx
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar is rendered inside each page so it knows the active slug */}
        {children}
      </div>
    </div>
  );
}
```

---

## 5. Guide Page

Renders MDX content using `next-mdx-remote`. Install it first:

```bash
pnpm add next-mdx-remote
```

```tsx
// app/products/lobster-mail/docs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuide, getGuides } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs-sidebar";

// Pre-render all guide pages at build time
export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — LobsterMail Docs`,
    description: guide.description,
  };
}

// Custom MDX components styled to match The Claw Depot
const mdxComponents = {
  h1: (props: any) => (
    <h1 className="font-serif text-3xl font-bold text-foreground mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2
      className="font-serif text-xl font-semibold text-foreground mt-10 mb-4 pb-2 border-b border-white/10"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3 className="font-serif text-lg font-medium text-foreground mt-8 mb-3" {...props} />
  ),
  p: (props: any) => <p className="text-secondary leading-relaxed mb-4" {...props} />,
  a: (props: any) => (
    <a className="text-accent hover:underline transition-colors" {...props} />
  ),
  code: (props: any) => (
    <code
      className="font-mono text-sm bg-white/5 text-accent/90 px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="font-mono text-sm bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto mb-6"
      {...props}
    />
  ),
  ul: (props: any) => <ul className="list-disc list-inside text-secondary mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-secondary mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full text-sm text-secondary" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th
      className="text-left font-mono text-xs text-muted uppercase tracking-wider px-3 py-2 border-b border-white/10"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="px-3 py-2 border-b border-white/5" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-2 border-accent/50 pl-4 text-secondary/80 italic mb-4"
      {...props}
    />
  ),
};

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug);
  if (!guide) notFound();

  return (
    <>
      <DocsSidebar activeSlug={params.slug} />
      <article className="min-w-0">
        <header className="mb-10">
          <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
            Documentation
          </p>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-3">
            {guide.title}
          </h1>
          <p className="text-secondary text-lg">{guide.description}</p>
          <p className="font-mono text-xs text-muted mt-3">
            Last updated {guide.lastUpdated}
          </p>
        </header>
        <div className="prose-invert">
          <MDXRemote source={guide.content} components={mdxComponents} />
        </div>
      </article>
    </>
  );
}
```

---

## 6. Index Redirect

```tsx
// app/products/lobster-mail/docs/page.tsx
import { redirect } from "next/navigation";

export default function DocsIndex() {
  redirect("/products/lobster-mail/docs/getting-started");
}
```

---

## 7. API Reference Page (Optional)

For the OpenAPI spec, use [Scalar](https://github.com/scalar/scalar) which fits dark themes well:

```bash
pnpm add @scalar/api-reference-react
```

```tsx
// app/products/lobster-mail/docs/api-reference/page.tsx
import { getOpenApiSpec } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs-sidebar";
import { ApiReference } from "@scalar/api-reference-react";

export const metadata = {
  title: "API Reference — LobsterMail Docs",
  description: "Complete API reference for the LobsterMail email infrastructure.",
};

export default async function ApiReferencePage() {
  const spec = await getOpenApiSpec();

  return (
    <>
      <DocsSidebar activeSlug="api-reference" />
      <div className="min-w-0">
        <ApiReference
          configuration={{
            spec: { content: spec },
            darkMode: true,
            hideModels: false,
          }}
        />
      </div>
    </>
  );
}
```

---

## 8. Add Docs Link to Navigation

Add a "Docs" link to the LobsterMail product page and the site footer.

```tsx
<Link href="/products/lobster-mail/docs" className="text-secondary hover:text-accent transition-colors">
  Docs
</Link>
```

---

## Guides Available (8 total)

| Order | Slug | Title |
|-------|------|-------|
| 1 | `getting-started` | Getting Started |
| 2 | `agent-quickstart` | Agent Quickstart |
| 3 | `mcp-server` | MCP Server |
| 4 | `receiving-emails` | Receiving Emails |
| 5 | `sending-emails` | Sending Emails |
| 6 | `webhooks` | Webhooks |
| 7 | `custom-domains` | Custom Domains |
| 8 | `security-and-injection` | Security and Prompt Injection |

New guides are added to the API automatically on deploy — the sidebar picks them up from the `order` field. No website changes needed when a new guide is published.

---

## Style Notes

- **Fonts**: Headings use Lora (serif), code uses Geist Mono — both are already loaded on the site
- **Colors**: Text uses `text-foreground` / `text-secondary` / `text-muted`, links and highlights use `text-accent` (orange/amber)
- **Cards**: Use `glass` class for frosted panels (sidebar, callout boxes)
- **Spacing**: Follow the existing `px-6`, `max-w-6xl mx-auto` container pattern
- **Tone**: Keep it casual — this is The Claw Depot, not a corporate docs site
