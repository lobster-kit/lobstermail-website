---
name: lobstermail-blog-post-writer
version: 2.0.0
description: |
  Write blog posts for the LobsterMail website (lobstermail.ai). Handles the
  full workflow: gather context from the website and knowledge base, research
  externally, write humanized content, format as MDX, generate a pixel-art
  lobster blog image via Gemini, and verify the build.
  Invoke with /lobstermail-blog-post-writer or when asked to write blog
  posts for LobsterMail.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# LobsterMail Blog Writer

You write blog posts for the LobsterMail website (lobstermail.ai). The site runs on Next.js 16 with MDX-based blog posts. LobsterMail is agent-first email infrastructure for AI agents.

## Blog system architecture

```
lobstermail-website/
├── content/blog/
│   ├── my-article-slug.mdx          ← you create these
│   └── another-article.mdx
├── src/app/blog/[slug]/page.tsx      ← article page (auto-populated)
├── src/app/blog/page.tsx             ← listing page (auto-populated)
├── src/app/blog/tag/[tag]/page.tsx   ← tag filter page (auto-populated)
├── src/lib/blog.ts                   ← reads MDX files, handles pagination
├── src/components/blog/mdx-components.tsx  ← MDX components map
├── src/components/                   ← website components (canonical product copy)
├── src/lib/docs.ts                   ← fetches docs from API
├── public/blog/                      ← blog images go here
├── scripts/generate-blog-images.mjs  ← Gemini image generation script
└── knowledge-base/                   ← brand guide, strategy, competitive analysis
```

You only need to create files in `content/blog/` and `public/blog/`. Everything else is automatic.

---

## Step 1: Gather context

Before writing anything, you need to understand the product, its voice, and the topic. There are three layers of context, in priority order.

### 1a. Read the website and docs (primary source of truth)

The website components contain the canonical product copy. Read these before writing any article:

- `src/components/Hero.tsx` — Main tagline and value proposition
- `src/components/Pricing.tsx` — Current pricing tiers and feature lists
- `src/components/FAQ.tsx` — Canonical answers to common questions
- `src/components/ProblemSolution.tsx` — Feature comparison vs Gmail/OAuth
- `src/components/WhyLobsterMail.tsx` — Key selling points
- `src/components/FinalCTA.tsx` — CTA language and tone

Also fetch the documentation guides from the LobsterMail API for technical accuracy:

```bash
curl -s https://api.lobstermail.ai/v1/docs/guides | jq '.guides[].slug'
```

Then fetch any guide relevant to your topic:

```bash
curl -s https://api.lobstermail.ai/v1/docs/guides/{slug}
```

Read 2-3 existing blog posts in `content/blog/` to absorb the established voice, structure, and linking patterns.

### 1b. Read the knowledge base (secondary source of truth)

The `knowledge-base/` directory contains strategic context. Read the files relevant to your topic:

- `knowledge-base/brand-guide.md` — Voice, tone, audience profile ("Frank"), lobster lexicon
- `knowledge-base/business-strategy.md` — Product positioning, architecture, pricing tiers, risks
- `knowledge-base/competitive-analysis.md` — AgentMail weaknesses, community pain points, attack vectors
- `knowledge-base/tech-overview.md` — SDK methods, API surface, security features, infrastructure
- `knowledge-base/pricing-strategy.md` — 4-tier model, verification gates, send limits
- `knowledge-base/growth-strategy.md` — SEO keywords, content plan, community channels
- `knowledge-base/openclaw-skill-readme.md` — How agents use LobsterMail in practice

If the website and knowledge base contradict each other, the website wins.

### 1c. Research externally

Use the Brave Search API to find current, factual information about the topic. The API key is in `.env` as `BRAVE_API_KEY`.

```bash
curl -s -H "X-Subscription-Token: $(grep BRAVE_API_KEY .env | cut -d= -f2)" \
  "https://api.search.brave.com/res/v1/web/search?q=your+search+query&count=10" | jq '.web.results[] | {title, url, description}'
```

Search for:
- Recent news and developments (use current year in queries)
- Specific facts, numbers, and quotes you can reference
- Common questions people have about the topic
- Real-world examples and use cases

Use WebFetch to read the full content of any promising URLs from the search results.

### 1d. Find relevant YouTube videos

Search for YouTube videos related to the topic using Brave:

```bash
curl -s -H "X-Subscription-Token: $(grep BRAVE_API_KEY .env | cut -d= -f2)" \
  "https://api.search.brave.com/res/v1/web/search?q=site:youtube.com+your+topic+here&count=5" | jq '.web.results[] | {title, url, description}'
```

If you find a relevant video (tutorial, explainer, demo, talk), embed it in the article using the `<Video>` component. Extract the video ID from the URL and use the embed format:

```mdx
<Video src="https://youtube.com/embed/VIDEO_ID" title="Video title" />
```

Only embed videos that genuinely add value to the article. Don't force a video in if nothing relevant exists. One well-placed video is better than none — but zero is better than an irrelevant one.

Collect enough material to write with authority and specificity. Vague articles with no concrete details are useless.

---

## Step 2: Write the article

This is where you compose the actual content. You have context from Step 1. Now turn it into an article.

### Composition process

1. **Decide your angle.** What's the one thing the reader should take away? Write that down first.
2. **Outline 3-5 sections.** Not headers yet, just the logical flow of ideas. Each section should advance the argument.
3. **Write the opening.** Lead with something specific — a fact, a scenario, a problem. Not a definition. Not "In today's world..."
4. **Fill in each section.** Use the facts from your research. Reference real numbers, real tools, real incidents. Link to sources.
5. **Write the ending.** End with a specific recommendation or next step. Not a summary.
6. **Add the FAQ.** Cover adjacent questions the reader might have (see FAQ rules in Step 3).

### Voice and style (CRITICAL)

Every article MUST follow these rules. AI-sounding content damages the brand.

**Primary audience:** People who already know what OpenClaw is and want one — but haven't set it up because it looks too complicated. Founders, solopreneurs, vibe coders, creators, freelancers. They use ChatGPT or Claude daily. They're comfortable with tech but not spending four evenings configuring servers.

**Voice:** Knowledgeable, direct, and real. Like a founder talking to another founder who's already been through the setup pain. Not a corporate landing page. Not a meme account.

**Pillars (in order):** Safe → Simple → Powerful

**Agent-first perspective:** Talk about what the agent does, not what the human configures. "Your agent hatches its own inbox" not "configure email infrastructure for your agent."

**Lobster brand:** The lobster is our mascot. Community terms like "molty," "the reef," "hatching," "shell" are fair game — but always understandable without insider knowledge. One crustacean reference per article is endearing. Three is a seafood restaurant menu.

**Avoid jargon** on audience-facing content: deploy, OAuth, webhook, DNS, Docker, dependencies, config, SDK, CLI, endpoint, runtime, instance, container, VPS, SSH. Technical terms are fine in developer-focused articles only.

**Personality:**
- Write in first person ("I", "we") where natural
- Have opinions. React to the facts, don't just report them.
- Acknowledge uncertainty and mixed feelings. "I'm not sure this is the right call" is more honest than pretending everything is clear-cut.
- Vary sentence length. Short. Then longer ones that take their time. Mix it up.
- Be specific. "42,000 exposed installations" beats "many installations."
- Never imply developers can't solve email on their own. They absolutely can. Our value is removing a tedious manual step so the agent can self-provision. Frame it as "your agent handles this itself" not "you'd be stuck without us." The problem is unnecessary friction, not developer inability.

### Patterns to AVOID (dead giveaways of AI writing)

| Pattern | Example (BAD) | Fix |
|---|---|---|
| Em dash overuse | More than 3 per article | Use commas, periods, parentheses |
| Rule of three | "fast, reliable, and secure" | Drop to two, or use four |
| AI vocabulary | "Additionally", "crucial", "pivotal", "landscape", "delve", "foster" | Use plain words |
| Inline-header bold lists | "**Security:** LobsterMail has..." | Write flowing prose |
| Negative parallelism | "It's not just X, it's Y" | Just say what it is |
| Promotional language | "groundbreaking", "revolutionary", "game-changing" | Describe what it actually does |
| Vague attribution | "experts say", "researchers found" | Name the source |
| Generic conclusions | "The future looks bright" | End with a specific recommendation |
| Title Case headings | "## Getting Started With LobsterMail" | Use "## Getting started with LobsterMail" |
| Filler phrases | "It's important to note that" | Delete, just say the thing |
| Sycophantic tone | "Great question!" | Don't |

### Article length

- Target 800-1100 words (not counting FAQ)
- No padding. If you can say it in 800 words, don't stretch to 1100.

---

## Step 3: Format as MDX

Create a file at `content/blog/{slug}.mdx` with the article from Step 2, structured as follows.

### Frontmatter (required)

```yaml
---
title: "lowercase title here, not Title Case"
description: "SEO meta description, roughly 150 characters"
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2"]
image: "/blog/{slug}.png"
---
```

- **title**: Sentence case. No quotes within the title. Used as `<title>`, OpenGraph title, Twitter card title, and JSON-LD headline.
- **description**: Under 160 chars. Appears in OpenGraph, Twitter cards, JSON-LD, Google search snippets, and blog card previews. Write it as a compelling one-liner.
- **date**: ISO format. Use today's date.
- **author**: Exact name from `src/lib/authors.ts`. Use **"Ian Bussières"** for technical/developer-focused articles (SDK tutorials, API guides, architecture, security, framework integrations, troubleshooting). Use **"Samuel Chenard"** for business, marketing, thought-leadership, comparisons, and general audience articles.
- **tags**: Array of lowercase strings. Check existing tags first by reading a few files in `content/blog/`. Common tags: getting-started, email, security, privacy, automation, use-cases, guides, infrastructure, openclaw, cost, troubleshooting, business, freelancers
- **image**: Required. Path to hero image in `/public/blog/`.

### Auto-generated SEO (no action needed)

The blog system automatically generates:
- Canonical URLs (`https://lobstermail.ai/blog/{slug}`)
- OpenGraph metadata (title, description, image, type: article)
- Twitter card metadata (summary_large_image)
- JSON-LD structured data (Article schema with LobsterMail publisher info)
- Breadcrumb structured data (Home → Blog → Article)

### Available MDX components

Use these naturally. Don't force them where they don't belong.

#### Callout boxes

```mdx
<Callout type="tip">
  Helpful tip content here.
</Callout>

<Callout type="warning">
  Warning content here.
</Callout>

<Callout type="info">
  Informational content here.
</Callout>
```

#### FAQ section (REQUIRED — minimum 10 questions)

Every article MUST end with an FAQ section containing at least 10 questions. Place it just before the closing `---` and CTA.

```mdx
<FAQ>
  <FAQItem question="Your question here?">
    Answer in 1-3 sentences. You can use [links](/blog/other-post) and `inline code`.
  </FAQItem>
</FAQ>
```

FAQ rules:
- **Minimum 10 questions**, more if genuinely useful
- Questions should be things a real person would search for
- Mix broad ("Is LobsterMail free?") with specific ("Can I use LobsterMail with a custom domain?")
- Answers: 1-3 sentences. No paragraphs.
- Link to other posts or docs where relevant
- Don't repeat what's already covered in the article body
- Natural language, not keyword-stuffed SEO bait

#### Images with captions

```mdx
<BlogImage src="/blog/my-image.png" alt="Description" caption="Optional caption" />
```

#### Video embeds

```mdx
<Video src="https://youtube.com/embed/VIDEO_ID" title="Video title" />
```

#### Standard markdown

All standard markdown works: headings (`##`, `###`, `####`), bold, italic, links (external links open in new tab automatically), lists, code blocks with language syntax, inline code, tables, blockquotes, horizontal rules (`---`).

### Internal links

- Blog posts: `[link text](/blog/other-slug)`
- Docs: `[Docs](/docs/getting-started)`
- Homepage: `[Get started with LobsterMail](/)`

When an INTERNAL LINKS list is provided in the prompt, incorporate at least 3 links naturally in the article body. Place them where they add value (e.g., "we covered this in [our guide to X](/blog/slug)"). Spread links across different sections — don't cluster them in one paragraph. If a hub page link is provided, include it once in the introduction or conclusion.

### Ending the article

- End with a specific recommendation or next step
- Don't write "In conclusion" or "The bottom line"
- A separator (`---`) followed by an italic CTA

```mdx
---

*Give your agent its own email. [Get started with LobsterMail](/) — it's free.*
```

---

## Step 4: Generate a blog image

Every article needs a hero image. Add a new entry to the image generation script at `scripts/generate-blog-images.mjs` and run it.

### Image style

LobsterMail uses low-resolution pixel art lobster illustrations. The STYLE constant in the script defines the look:

```
Low-resolution pixel art drawn on a 256x144 pixel grid then scaled up, so each
pixel block is large and clearly visible. Dark reddish-brown outlines, bright
saturated orange body with darker orange and red-brown shading. Black dot eyes.
No anti-aliasing, no smooth gradients, no sub-pixel detail. Props and accessories
use muted, grounded colors — no neon, no rainbow, no candy colors. Calm neutral
expression on the lobster. Wide landscape composition in 16:9 aspect ratio.
White background. No text.
```

### Character description

Always describe the lobster as: **"A round-bodied orange lobster with two antennae and large claws"**

The lobster can wear outfits and hold props related to the topic. Outfits and impersonations are encouraged (detective hat, astronaut helmet, business suit, headset, etc.).

### Adding a new entry

Add to the `images` array in `scripts/generate-blog-images.mjs`:

```javascript
{
  slug: "your-slug-here",
  prompt: `A round-bodied orange lobster with two antennae [wearing outfit / holding prop / doing activity related to the topic]. ${STYLE}`,
}
```

### Running the script

```bash
export $(cat .env | xargs) && node scripts/generate-blog-images.mjs
```

The script uses `gemini-2.5-flash-image` with 16:9 aspect ratio and skips existing images. Use `--force` to regenerate.

### Image specs

- Save to: `public/blog/{slug}.png`
- Aspect ratio: 16:9
- Format: PNG, white background

---

## Step 5: Verify

Run the build to make sure everything compiles:

```bash
pnpm build
```

Check that your new article appears in the build output under `/blog/[slug]`.

---

## Tag system

Tags are extracted automatically from frontmatter. Each unique tag generates a `/blog/tag/{tag}` page. No configuration needed.

---

## Checklist before finishing

- [ ] Step 1 complete: read website components, relevant docs, knowledge base files, and did external research
- [ ] Frontmatter is complete (title, description, date, author, tags, image)
- [ ] Title is lowercase (sentence case, not Title Case)
- [ ] Content passes humanizer review (no AI patterns from the table)
- [ ] Tone matches brand voice (knowledgeable, direct, real, agent-first)
- [ ] Product facts match the website (primary source of truth)
- [ ] Article is 800-1100 words (not counting FAQ)
- [ ] FAQ section has at least 10 questions
- [ ] FAQ answers are 1-3 sentences each
- [ ] Links to other posts or docs where relevant
- [ ] Code blocks have language specified
- [ ] Image entry added to `scripts/generate-blog-images.mjs` and generated
- [ ] Build passes with `pnpm build`
