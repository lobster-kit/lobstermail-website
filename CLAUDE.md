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

- Dark-first with light mode support
- Glassmorphic card style (`glass` class)
- Colors: `text-foreground` / `text-secondary` / `text-muted`, accent is orange/amber (`text-accent`)
- Spacing: `px-6`, `max-w-6xl mx-auto` container pattern

## Brand Voice (Quick Reference)

- Direct, not corporate
- Empathetic, not condescending
- Confident, not salesy
- Agent-first perspective ("Your agent has its own email" not "configure email infrastructure")
- Playful, not silly — one crustacean reference per section max
- **Email is how agents interact with the world and each other — not how developers talk to their coding agents.** Agents use email for external actions (signing up for services, receiving verification codes, responding to customers, coordinating with vendors) and for agent-to-agent coordination (passing tasks, sharing results). But developers already have built-in ways to communicate with their own agents (IDE, terminal, dashboards). Don't frame email as agent-to-owner notification.
- See `knowledge-base/brand-guide.md` for the full guide
