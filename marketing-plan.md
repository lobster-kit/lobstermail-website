# LobsterMail — Multi-Channel Marketing Plan

**Product:** LobsterMail (lobstermail.ai)
**Parent:** The Claw Depot
**Stage:** Pre-launch → launch → growth
**Last updated:** February 27, 2026

---

## Strategic North Star

We are the **DigitalOcean to AgentMail's AWS**: simpler, cheaper, and built for the people actually running agents. Every marketing move should reinforce one core truth:

> **Your agent provisions its own inbox. No human involved.**

That's the hook. Everything else — security, pricing, brand — supports it.

---

## Competitive Positioning Summary

| | AgentMail | Resend | LobsterMail |
|---|---|---|---|
| Setup | Human creates account + API key | Human creates account | Agent self-provisions |
| Price entry | $20/mo to send | $20/mo | **$9/mo** |
| Agent safety | None | None | 6-category prompt injection scanning |
| Inbox persistence | Yes | No | Yes |
| OpenClaw integration | Yes (skill exists) | No | **Native ClawHub skill** |
| Positioning | Enterprise, B2B | Developer DX | Community-first, agent-native |

**Our wedge:** AgentMail's $9 dead zone (free → $20 with no middle). Anyone who outgrows AgentMail free has one natural move: us at $9.

---

## Channel Overview

| Channel | Phase | Primary Goal | Time/week |
|---|---|---|---|
| ClawHub + OpenClaw Discord | 1 | Initial adoption | 3 hrs |
| X / Twitter (build in public) | 1–3 | Brand + viral loop | 1 hr/day |
| Reddit (r/LocalLLaMA, r/ClaudeAI, etc.) | 1–2 | Community trust + SEO leads | 1 hr |
| YouTube | 1–3 | Demo + tutorial traffic | 2 videos/mo |
| TikTok / Instagram Reels | 2–3 | Top-of-funnel viral | 3–5 clips/mo |
| SEO / Blog | 2–3 | Compounding organic traffic | 2 posts/mo |
| GitHub (open source SDKs) | 1–3 | Developer credibility | Ongoing |
| Product Hunt / Show HN | 1 | Launch spike | 1 event each |
| Newsletters + Podcasts | 2–3 | Warm founder audience | 2/mo outreach |
| Email Drip (onboarding) | 1–3 | Activation + upgrade | Set up once |
| Framework Docs Integrations | 2–3 | Highest-quality distribution | 1 PR each |
| Paid (future) | 3+ | Scale what's working | TBD |

---

## Phase 1 — Community Entry (Pre-launch to Month 2)

**Goal:** First 100 free signups, first 10 paid conversions. Get the product in front of the people who will actually use it and tell others.

### 1.1 — ClawHub Skill Launch

This is the **primary GTM vehicle**. Everything else in Phase 1 supports this.

**Actions:**
- Publish the LobsterMail skill to ClawHub with a polished README (it's already written — openclaw-skill-readme.md is the foundation).
- The "Quick test" prompt (`Create yourself an email inbox and tell me the address`) is the single most important piece of copy. It needs to be the first thing people see.
- Make sure `npm install lobstermail` + `LobsterMail.create()` works flawlessly in under 60 seconds from a cold start. This is the product demo.
- Reach out to the OpenClaw community team about featuring new skills — a "featured" tag in ClawHub is worth more than a month of Twitter posts.

**Metric:** ClawHub skill installs in Week 1.

---

### 1.2 — OpenClaw Discord

The OpenClaw Discord is the most concentrated group of our target users on earth. They are frustrated with Gmail setup. We need to be here authentically before launch.

**Actions:**
- **Before launch:** Join the Discord as builders, not marketers. Answer questions about email setup in `#help` channels. Be genuinely useful for 2–3 weeks before mentioning LobsterMail.
- **At launch:** Post a clean "we built this" message in the `#show-and-tell` or `#projects` channel. Not an ad — a story. Reference the Gmail setup pain directly.
- **Post-launch:** Set up a Claude agent to answer support questions in Discord using RAG over the docs. The AI agent answering questions *about an AI agent email product* is a story in itself.
- **Ongoing:** Be active in `#security` and `#integrations`. The ClawHavoc incident and prompt injection discussion are live threads we should contribute to — not to sell, but to demonstrate expertise.

**Sample launch post:**
> "We spent too many nights watching Claude get stuck at 'please verify your email.' So we built LobsterMail — an email address your agent provisions itself, no human needed. It scans every inbound email for prompt injection (6 categories), runs on real SES infrastructure, and has a ClawHub skill. Free to receive. $9/mo when your lobster needs to snap back. Would love feedback from this community — you're who we built it for."

---

### 1.3 — Reddit

Target subreddits where "Frank" hangs out: r/ClaudeAI, r/LocalLLaMA, r/OpenClaw, r/SideProject, r/Entrepreneur.

**Content approach (not ads):**
- **Tutorial posts:** "How I gave my OpenClaw agent its own email in 30 seconds" — walkthrough with real screenshots. Post to r/LocalLLaMA and r/ClaudeAI.
- **Problem/solution posts:** "Agents borrowing Gmail credentials is a security nightmare — here's what we did about it" — reference the Meta inbox deletion incident (TechCrunch article), the CrowdStrike prompt injection report. Be educational, mention LobsterMail naturally at the end.
- **Show HN post:** (covered below in 1.4)
- **Comment-based:** Search Reddit weekly for people complaining about email setup with OpenClaw. Reply with a genuine solution. Don't mass-spam — pick the most visible threads.

**Rule:** Never post promotional content as your first interaction in a subreddit. Karma and context first.

**Metric:** Upvotes, comment engagement, referral traffic to lobstermail.ai.

---

### 1.4 — Product Hunt + Show HN (Launch Events)

These are one-time traffic spikes that also generate SEO backlinks and create a permanent "we launched" moment.

**Product Hunt:**
- Schedule for a Tuesday or Wednesday, 12:01 AM PT (peak Product Hunt traffic).
- Tagline: "Your AI agent's own email — provisioned by the agent itself."
- Maker comment: Tell the Frank story. Why you built it. The Gmail setup hell. The Meta inbox incident. Be real.
- Hunter: Find a Product Hunt hunter with AI/dev audience (post in Product Hunt Discord for help).
- Gallery: Show the demo — the 4-step flow (SDK init → smart inbox → receive → safe read). GIFs > screenshots.
- Aim for Top 5 of the day. Even Top 10 generates meaningful backlinks and credibility.

**Show HN:**
- Title: "Show HN: LobsterMail – Email infrastructure where the AI agent signs itself up"
- Lead with the technical story: why agent-self-signup matters, how you built it on SES, the prompt injection scanning, the verification trust gate.
- The HN audience will probe for the moat. Be ready with: "We're not just a pipe. We scan every inbound email for prompt injection (6 categories), isolate SES reputation per account, and built the upgrade flow so the agent sells the paid tier to its owner."
- Respond to every comment. HN threads become permanent SEO content.

---

### 1.5 — GitHub

Open-source the TypeScript SDK (`lobstermail` on npm) from day one. 379 tests and full TSDoc coverage is a credibility signal. Make the repo look excellent.

**Actions:**
- README should be as good as the ClawHub skill README — demo-first, copy-pasteable quickstart, clear install instructions.
- Add the repo to GitHub Trending tracking (star bombing from friends/community is fair game at launch).
- Pin example repositories showing LobsterMail used with OpenClaw, LangChain, CrewAI. These become landing pages for developers searching GitHub.
- `lobstermail-examples` repo with real use cases: AI customer support agent, signup bot, verification email handler, AI sales outreach agent.

---

## Phase 2 — Organic Growth Engine (Month 2–6)

**Goal:** 500 free signups/mo, 50+ paid accounts. Build systems that grow without constant manual effort.

### 2.1 — X / Twitter (Build in Public)

The X verification gate is a **built-in viral growth loop**. Every free user who wants to send must tweet with @getlobstermail. This is free marketing baked into the product.

**Build-in-public content calendar:**

| Type | Cadence | Example |
|---|---|---|
| Product updates | 3–4x/week | "Just shipped: WebSocket real-time email push for agents. Your lobster doesn't have to poll anymore." |
| Agent demos | 2x/week | Video of an agent signing up for a service, receiving the verification email, and completing the signup — all autonomously |
| Community wins | 1–2x/week | "Someone built a cold outreach agent with LobsterMail last night. Here's what they made." |
| Security takes | 1x/week | "Why letting your AI agent read your Gmail is a bad idea (and what to do instead)" — link to blog |
| Stats/milestones | When hit | "1,000 inboxes hatched." / "First agent to send 500 emails in a day." |
| Pricing jabs (light) | Monthly | "AgentMail: $0 → $20, no middle. LobsterMail: $0 → $9 → $19. We plug the gap." |
| Founder voice | Daily | Short takes on AI agent ecosystem, OpenClaw news, email infra opinions |

**Tone:** Confident, technical, occasionally lobster-brained. Never corporate. Founder talking to founders.

**Key tactic:** When the TechCrunch "Meta inbox deletion" story is still live, tweet about it and offer the alternative. That story is tailor-made for our positioning.

**Goal:** 2,000 followers by Month 6, 500K impressions/mo.

---

### 2.2 — YouTube

YouTube is where "Frank" discovers products. A 5-minute tutorial video that actually works is worth 50 blog posts for this audience.

**Video series:**

**Series 1: "Give Your Agent an Email" (Demo-first)**
- Episode 1: "Your AI agent's email in 60 seconds" — screen recording, no fluff, instant result
- Episode 2: "How I built a Gmail verification bot with OpenClaw + LobsterMail" — real use case
- Episode 3: "Agent goes rogue in your inbox — and how to prevent it" — security angle, references Meta incident

**Series 2: "Agent Use Cases" (Search-optimized)**
- "AI customer support agent with email" — targets "ai agent email" searches
- "How to build an AI sales outreach agent" — targets "ai sales agent email"
- "OpenClaw + email: setup guide" — directly captures "openclaw email setup" searchers

**Series 3: "vs. the Competition" (Comparison)**
- "LobsterMail vs. AgentMail: which email API for AI agents?" — honest comparison

**Production notes:**
- Face cam optional. Screen recording with clear narration is fine.
- Always show the product working from scratch in real-time. Never skip steps.
- CTA: "Install the ClawHub skill" / "Try the free tier" — links in description.
- Chapters, timestamps, and a clear thumbnail with the outcome (e.g., "60-Second AI Agent Email") beat every production trick.

**Goal:** 5 videos in first 6 months, 10K views combined.

---

### 2.3 — TikTok / Instagram Reels

This is where viral OpenClaw demos live. "I tried OpenClaw for a week" videos have hundreds of thousands of views. LobsterMail can ride this wave.

**Content types:**

1. **The magic trick:** Show an agent receiving an email in real-time. Start with the prompt, show the inbox, show the email arrive. 30–60 seconds. This is the one that goes viral if it works.
2. **The horror story:** "My AI agent read all my emails without permission. Here's what happened." Hook on fear, resolve with LobsterMail. Use the Meta incident as inspiration.
3. **The $9 flex:** "AgentMail wants $20. We charge $9. Here's why." Price comparison as social content works for this audience.
4. **Community wins:** Screenshot a cool thing someone built with LobsterMail. Text-on-screen + voiceover.

**Tone:** Match the energy of the OpenClaw community — enthusiastic, a little unhinged, proud of what agents can do.

**Hashtags:** #openclaw #aiagent #claudeai #buildinpublic #agentdevelopment #llm

**Goal:** 5 Reels/TikToks per month by Month 3. One piece of content getting 50K+ views is the goal, not a steady drip.

---

### 2.4 — SEO / Blog

Compounding traffic. Slow to start, valuable long-term. Every post should rank for a specific keyword.

**Priority posts (write these first):**

| Post Title | Target Keyword | Why Now |
|---|---|---|
| "LobsterMail vs AgentMail: Which Email API for AI Agents?" | "agentmail alternative" / "agentmail vs" | HN "no moat" criticism = people are already comparing |
| "How to Give Your AI Agent Its Own Email Address" | "ai agent email address" / "send email from ai agent" | Universal problem, low competition |
| "Why Your AI Agent Shouldn't Use Your Gmail" | "ai agent gmail security" / "openclaw gmail risk" | Fear-based, positions us as the safe choice |
| "OpenClaw Email Setup: The Right Way (and the Wrong Way)" | "openclaw email setup" / "openclaw gmail" | Captures frustrated users mid-problem |
| "Email Infrastructure for AI Agents: A Developer's Guide" | "email api for ai agents" | Pillar post, links to everything else |
| "How to Build a Verification Bot with LobsterMail + OpenClaw" | "openclaw verification email" | Tutorial, converts readers to users |
| "CrewAI Email Integration: A Complete Guide" | "crewai email tool" | Phase 3 prep, builds SEO before we ship the SDK |
| "LangChain Email Agent: How to Give Your Agent an Inbox" | "langchain email integration" | Same — gets us ranked before Phase 3 |

**SEO rules:**
- Every post must have a working code example. Developers share posts with working code.
- Every post internally links to at least 2 other LobsterMail pages.
- Submit sitemap to Google immediately at launch.
- Use the blog to answer real Stack Overflow / Reddit questions — and then comment on those threads with the link (tactfully, not spammy).

---

### 2.5 — Newsletter + Podcast Outreach

This audience (tech-curious founders, AI early adopters) reads newsletters and listens to founder podcasts. We don't need to be on big shows — mid-tier newsletters with 5K–20K engaged readers are better ROI.

**Target newsletters to pitch or place sponsored content:**
- Ben's Bites (AI news, large audience)
- The Rundown AI
- TLDR AI
- Hacker Newsletter
- Small AI-agent-specific newsletters (LangChain weekly, CrewAI digest, etc.)

**Pitch angle for newsletters:**
> "The email verification wall is the #1 place AI agents get stuck. We built the fix — your agent provisions its own inbox in seconds, no human needed. $9/mo. ClawHub skill available now."

**Target podcasts to pitch:**
- Latent Space (AI engineering audience)
- Practical AI
- Indie Hackers podcast
- Founder-to-founder shows on X Spaces

**Pitch angle for podcasts:**
> "We're building the Vercel to OpenClaw's Next.js — managed agent infrastructure that removes setup pain. LobsterMail is the first piece: email for agents that provisions itself. We can talk about the security risks of letting agents use personal Gmail, the Meta inbox deletion incident, and where the agent email market is going."

**Goal:** 2 newsletter mentions and 1 podcast appearance in first 6 months.

---

## Phase 3 — Scale Beyond OpenClaw (Month 6–18)

**Goal:** 2,500+ organic visits/mo, 250+ free signups, 25+ paid conversions. Establish LobsterMail as the default email layer for AI agents across all frameworks.

### 3.1 — Framework Documentation Integrations

Getting listed in official LangChain, CrewAI, and AutoGen docs is worth more than 100 blog posts. This is the highest-leverage move in Phase 3.

**Actions:**
- Build SDK wrappers for LangChain (Python), CrewAI, AutoGen before pitching.
- Submit a PR to LangChain docs adding LobsterMail to the "Email Tools" section.
- Open a GitHub issue in CrewAI asking if they'd list LobsterMail as an email integration — often they say yes.
- Reach out to AutoGen maintainers directly on GitHub Discussions.
- These PRs and issues also generate SEO-valuable GitHub links back to lobstermail.ai.

**Priority order:** LangChain (largest audience) → CrewAI (most agent-native) → AutoGen → LlamaIndex.

---

### 3.2 — Open Source Example Projects

Each of these is a standalone repo that:
1. Solves a real problem
2. Has LobsterMail built in
3. Gets forked by developers who become users

**Example repos to build:**

| Repo Name | What It Does | Target Searcher |
|---|---|---|
| `ai-inbox-assistant` | OpenClaw agent that triages your email | "ai email triage agent" |
| `verification-bot` | Signs up for services, handles verification email | "ai signup bot" |
| `customer-support-agent` | Responds to customer emails via LobsterMail | "ai customer support email" |
| `sales-outreach-agent` | AI SDR that sends and receives sales emails | "ai sales agent email" |
| `newsletter-digest-agent` | Subscribes to newsletters, summarizes them daily | "ai newsletter digest" |

Each repo gets a `README.md` with clear setup instructions and a "Powered by LobsterMail" badge. This is passive distribution.

---

### 3.3 — The Security Angle (Earned Media)

We have a legitimate security story that the press hasn't fully covered. The angle: **AI agents are the new phishing vectors, and everyone's using Gmail credentials as the solution.**

**Potential earned media plays:**
- Write a long-form post (Substack or company blog): "The AI Agent Email Security Problem Nobody's Talking About" — reference the Meta incident, the CrowdStrike report, the ClawHavoc skill incident, the HN AgentMail thread. Offer our prompt injection scanning as the solution.
- Pitch this to Wired, TechCrunch (who already covered the Meta incident), and Hacker News as an op-ed or "Show HN: security research."
- If we can responsibly demonstrate a proof-of-concept prompt injection attack via email to an OpenClaw agent, that's a security research post that will get covered. (Coordinate with OpenClaw community first.)

This positions LobsterMail not just as "cheaper than AgentMail" but as "the security-conscious choice" — a harder-to-copy moat.

---

## Messaging by Channel

| Channel | Primary Hook | CTA |
|---|---|---|
| ClawHub | "Your agent provisions its own inbox" | `/install lobstermail` |
| Discord | "We solved the Gmail setup nightmare" | Try the skill |
| Reddit | "Why agents shouldn't use your Gmail" | Link to blog post |
| X/Twitter | "Your lobster has its own shell" | lobstermail.ai |
| YouTube | "AI agent email in 60 seconds" | Install the skill |
| TikTok/Reels | Show the magic trick | Follow + visit site |
| Blog/SEO | "How to give your agent an email" | Free tier signup |
| Product Hunt | "Agent self-provisions its inbox" | Upvote + try free |
| Show HN | Technical story, SES architecture | GitHub + docs |
| Newsletters | "The email wall is fixed" | $9/mo, Builder tier |

---

## The Viral Loops (Built Into Product)

Two viral mechanics are already in the product — maximize both:

### Loop 1: X Verification Gate
Every free user who wants to send must tweet with @getlobstermail. This is:
- Free impressions on X
- Social proof (real users publicly endorsing the product)
- Searchable content for people researching LobsterMail

**Amplify it:** Like and retweet every verification tweet. Respond personally. Build a community of visible early adopters.

### Loop 2: Agent-to-Owner Upgrade
When an agent hits its send limit, it sends the owner a Stripe payment link directly. The agent sells the upgrade. This is:
- Zero-friction conversion (no dashboard, no login)
- A remarkable story to tell in marketing copy ("our pricing page is your agent's chat window")
- A feature that differentiates from every other email API

**Amplify it:** Screenshot the moment an agent sends its owner an upgrade message. Post it on X and TikTok. This is the product demo and the marketing content in one.

---

## Content Voice Cheat Sheet (From Brand Guide)

When writing anything for any channel:

| Do | Don't |
|---|---|
| "Your agent has its own email" | "Agent-native SMTP with zero-config provisioning" |
| "Your lobster pinches its own inbox" | "Seamlessly configure email infrastructure" |
| "No spare computer, no setup hell" | "Zero-config automated pipeline" |
| "Bring your API key. Pick your model. Go." | "Seamlessly integrate with leading AI providers" |
| "Your agent snaps back from its own shell" | "Your agent can notify you via email" |
| One lobster reference per section | Three lobster puns in a paragraph |

**Always remember:** Email is how the agent talks to the **outside world**, not to its owner. Never frame LobsterMail as an agent-to-developer notification channel.

---

## Launch Week Playbook

**T-7 days:**
- Finalize ClawHub skill README
- Queue 7 days of X posts
- Prep Product Hunt assets (tagline, screenshots, GIFs, maker comment)
- Write Show HN post
- DM 10 OpenClaw community members for early access

**T-1 day:**
- Post teaser on X: "Tomorrow. Your lobster gets its own shell."
- Make sure the product actually works flawlessly from cold start

**Launch day:**
- 12:01 AM: Post Product Hunt
- 9 AM: Show HN post
- 9:15 AM: Post in OpenClaw Discord
- 10 AM: X thread telling the full story
- Throughout day: respond to every comment, tweet, HN reply

**T+1 week:**
- Post metrics publicly on X ("Week 1: X inboxes hatched, X agents snapping")
- Write a brief Show HN follow-up
- Begin SEO blog post #1

---

## KPIs by Phase

### Phase 1 (Month 1–2)
- ClawHub skill installs: 100+
- Free signups: 150+
- Paid conversions: 10+
- Discord community presence: Active in top 3 channels
- Product Hunt: Top 10 of the day

### Phase 2 (Month 2–6)
- Monthly organic visits: 2,000+
- Free signups/mo: 100+
- Paid accounts: 50+
- X followers: 2,000+
- YouTube views: 10,000 cumulative
- Newsletter mentions: 2+

### Phase 3 (Month 6–18)
- Monthly organic visits: 10,000+
- Free signups/mo: 500+
- Paid accounts: 200+
- Framework docs listings: 2+ (LangChain, CrewAI)
- MRR: $3,000+

---

## Budget Estimate

| Channel | Monthly Cost | Notes |
|---|---|---|
| Infrastructure | $400 | Already budgeted |
| Domain / hosting | ~$50 | |
| YouTube production | $0–$200 | DIY at start |
| Newsletter sponsorships | $0–$500 | Only if organic fails to gain traction |
| Paid ads (Phase 3) | $0–$1,000 | Only after organic validation |
| **Total (Phase 1–2)** | **~$450–$650/mo** | Almost entirely organic |

---

## Related Documents

- [brand-guide.md](./lobsterMail/brand-guide.md) — Voice, tone, lobster lexicon, copy rewrites
- [growth-strategy.md](./lobsterMail/growth-strategy.md) — Original GTM phases and community channel breakdown
- [competitive-analysis.md](./lobsterMail/competitive-analysis.md) — AgentMail, Resend, community pain points
- [business-strategy.md](./lobsterMail/business-strategy.md) — Strategic positioning, risks, market timing
- [pricing-strategy.md](./lobsterMail/pricing-strategy.md) — Full tier model and the $9 wedge vs AgentMail

---

*Last updated: February 27, 2026*
