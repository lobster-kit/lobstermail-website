# LobsterMail Website

> **Start here:** Read [`marketing-plan.md`](./marketing-plan.md) first — it covers the full GTM strategy, channel priorities (ClawHub, Discord, Reddit, YouTube, SEO), competitive positioning, and what needs to be built next. It's the fastest way to understand what you're working toward before touching any code.

Marketing website for LobsterMail — agent-first email infrastructure for AI agents. Built with Next.js 16, React 19, Tailwind CSS v4.

**Domain:** lobstermail.ai
**Deployed at:** lobster-mail.vercel.app

## Knowledge Base

**Always consult `knowledge-base/` before making product, copy, or strategy decisions.** This is a symlinked directory pointing to our shared Google Drive folder with the canonical source of truth for LobsterMail.

Key files:
- `knowledge-base/lobstermail-business-strategy.md` — Business strategy, architecture, pricing tiers, progressive trust model, risks
- `knowledge-base/brand.md` — Brand guide, voice & tone rules, lobster lexicon, copy guidelines, easter eggs
- `knowledge-base/competitive-analysis.md` — AgentMail weaknesses, community pain points, our attack vectors
- `knowledge-base/WEBSITE-DOCS-INSTRUCTIONS.md` — How to embed LobsterMail docs into this site (API endpoints, components, routing)
- `knowledge-base/tech-overview.md` — Full technical overview (SDK, API surface, infra, security features)
- `knowledge-base/growth-strategy.md` — GTM phases, SEO strategy, community channels, automation model

When writing copy, follow the brand guide voice rules. When making product decisions, check business strategy first. When positioning against competitors, reference the competitive analysis.

## Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Fonts:** Lora (serif headings), Geist Mono (code)
- **Docs:** MDX via next-mdx-remote, content fetched from LobsterMail API (`https://api.lobstermail.ai`)
- **Blog:** Local MDX files in `content/blog/`
- **Icons:** Phosphor Icons
- **API Reference:** Scalar (`@scalar/api-reference-react`)
- **Deploy:** Vercel

## Project Structure

```
src/
  app/           — Next.js App Router pages
  components/    — React components (Navbar, Hero, Pricing, FAQ, etc.)
  hooks/         — Custom React hooks
  lib/           — Utilities (blog, docs, constants)
content/
  blog/          — MDX blog posts
public/          — Static assets (logos, favicons, OG images)
knowledge-base/  — Symlink to Google Drive (gitignored)
```

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm lint` — ESLint

## Design System

**Always read [`DESIGN.md`](./DESIGN.md) before making any visual or UI decisions.** All font choices, colors, spacing, glass card variants, motion, and aesthetic direction are defined there. Do not deviate without explicit user approval. In QA mode, flag any code that doesn't match DESIGN.md.

Quick reference:
- Dark-first with light mode support
- Glassmorphic card style: `.glass`, `.glass-strong` (pulsing shadow), `.glass-subtle` — all 50px radius
- Fonts: Lora (serif, primary for everything), Geist Mono (code/data/labels)
- Colors: `text-foreground` / `text-secondary` / `text-muted`, accent is orange (`text-accent` / `#FB5705`), blue-tinted edges (`--edge` / `--edge-strong`)
- **No transparent buttons.** Buttons must never use alpha/opacity backgrounds (e.g. `bg-accent/15`, `bg-white/10`). The background grid must not show through buttons. Use opaque color tokens instead — e.g. `bg-accent-muted` for soft accent fills.
- Spacing: `px-6`, `max-w-6xl mx-auto` container pattern

### Section Spacing Rules

Every page section must follow these spacing standards. Do not deviate.

**Home page sections (full-width `<section>` blocks):**
- Standard: `px-6 py-28 sm:py-36` — all sections use this for consistent vertical rhythm
- Hero is the exception: uses `pt-32 sm:pt-48 lg:pt-52` for navbar clearance, `pb-20 sm:pb-28`
- Never set `pt-0` or `pb-0` on a section to "merge" it with an adjacent one — keep spacing uniform

**Inner pages (`<main>` wrapper):**
- Always: `<main className="pt-32">` — consistent navbar clearance across all inner pages
- Header/intro sections (page title + description): `pb-20 sm:pb-28`
- Content blocks within a page: `mt-20 sm:mt-28` between blocks
- Last content section before footer: `pb-28 sm:pb-36`

**Container pattern — home page sections:**
```tsx
<section className="px-6 py-28 sm:py-36">
  <div className="mx-auto max-w-6xl">
    {/* content */}
  </div>
</section>
```

**Container pattern — inner page listing (blog, compare, use-cases index):**
```tsx
<main className="pt-32">
  <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
    {/* page title + description */}
  </section>
  <section className="mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
    {/* content grid */}
  </section>
</main>
```

**Container pattern — inner page detail (getting-started, use-case detail):**
```tsx
<main className="pt-32">
  <div className="mx-auto max-w-4xl px-6 pb-28 sm:pb-36">
    {/* hero/title block */}
    <div className="mt-20 sm:mt-28">{/* next block */}</div>
    <div className="mt-20 sm:mt-28">{/* next block */}</div>
  </div>
</main>
```

## Brand Voice (Quick Reference)

- Direct, not corporate
- Empathetic, not condescending
- Confident, not salesy
- Agent-first perspective ("Your agent has its own email" not "configure email infrastructure")
- Playful, not silly — one crustacean reference per section max
- **Email is how agents interact with the world and each other — not how developers talk to their coding agents.** Agents use email for external actions (signing up for services, receiving verification codes, responding to customers, coordinating with vendors) and for agent-to-agent coordination (passing tasks, sharing results). But developers already have built-in ways to communicate with their own agents (IDE, terminal, dashboards). Don't frame email as agent-to-owner notification.
- See `knowledge-base/brand-guide.md` for the full guide
