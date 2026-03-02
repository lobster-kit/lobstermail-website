# Agent Guidelines — LobsterMail Website

## Knowledge Base (Required Reading)

Before making any product, copy, design, or strategy decisions, **always read the relevant files in `knowledge-base/`**. This is a symlinked directory (Google Drive) containing the canonical source of truth for LobsterMail.

| File | Contents | Consult when... |
|---|---|---|
| `lobstermail-business-strategy.md` | Business strategy, architecture, tiers, pricing, risks | Making product or positioning decisions |
| `brand.md` | Voice, tone, lobster lexicon, copy guidelines | Writing any user-facing copy |
| `competitive-analysis.md` | AgentMail weaknesses, pain points, attack vectors | Positioning, comparison content, feature prioritization |
| `WEBSITE-DOCS-INSTRUCTIONS.md` | Docs integration (API endpoints, components, routing) | Working on the docs section |
| `tech-overview.md` | SDK, API surface, infra, security features | Technical content, docs, blog posts |
| `growth-strategy.md` | GTM phases, SEO, community channels, automation | Marketing content, SEO, blog strategy |

If a file isn't accessible (Google Drive sync), note the gap and ask the user rather than guessing.

## Core Principles

1. **Knowledge base is the source of truth.** If something in the codebase conflicts with the knowledge base, flag it to the user. The knowledge base wins.
2. **Agent-first perspective.** LobsterMail's core differentiator is that the agent provisions its own inbox. Always frame things from the agent's perspective, not the human's.
3. **Brand voice matters.** Direct, empathetic, confident, playful (not silly). See `knowledge-base/brand.md` for the full guide. One crustacean reference per section max.
4. **Ask before updating core docs.** If a decision warrants updating knowledge base files or CLAUDE.md, ask the user for permission first.

## What This Project Is

LobsterMail is email infrastructure for autonomous AI agents — a subproduct of The Claw Depot. The website at lobstermail.ai is the marketing site, docs hub, and blog.

- **Primary audience:** OpenClaw community (developers + non-technical users)
- **Secondary audience:** Broader agent ecosystem (LangChain, CrewAI, AutoGen)
- **Key positioning:** "AgentMail gives your agent an inbox. LobsterMail gives your agent an inbox it created for itself."
- **Competitor:** AgentMail (YC-backed, enterprise-focused, human-first signup)

## Tech Stack

- Next.js 16 (App Router), React 19, Tailwind CSS v4
- MDX blog posts in `content/blog/`
- Docs fetched from LobsterMail API (`https://api.lobstermail.ai`)
- Deployed on Vercel

## When Writing Copy

- Follow `knowledge-base/brand.md` tone rules
- Use the lobster lexicon sparingly (season, don't drown)
- Terms: "pinching" an inbox, "hatching" (signup), "molting up" (upgrading), "snapping" (sending), "the reef" (network)
- Hero tagline: "Instant email for your agent"
- Agent is "your agent" primarily, "your lobster" occasionally for warmth

## When Writing Blog Posts

- Check `knowledge-base/growth-strategy.md` for SEO target keywords
- Check `knowledge-base/competitive-analysis.md` for positioning angles
- Tone: founder talking to another founder, not a corporate blog
