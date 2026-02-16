# lobsterMail — Business Strategy
## Everything we discussed, February 16, 2026

---

## The Idea

lobsterMail is email infrastructure for autonomous AI agents. Agents can provision their own email inbox without human intervention.

**Domain:** getlobstermail.com

**Tagline:** Instant email for your lobster.

**Core differentiator:** The agent signs itself up. No human creates an account, generates API keys, or configures anything. The agent installs lobsterMail and has a working inbox in seconds.

---

## Why Now

- OpenClaw has 198K GitHub stars, 30K+ deployed instances, 5,700+ ClawHub skills
- Every OpenClaw agent touching email is borrowing a human's Gmail credentials — a real security risk
- The community is actively frustrated with OAuth, IMAP, App Passwords, and config hell
- Peter Steinberger (OpenClaw creator) just joined OpenAI — the community is in transition and looking for ecosystem players
- ClawHavoc incident (341 malicious skills) has the community thinking about security
- 30,000+ exposed OpenClaw instances with prompt injection vulnerabilities

---

## Target Market

**Primary:** OpenClaw community — both developers and normies (non-technical users who just chat with their lobster)

**Secondary:** Broader agent ecosystem — LangChain, CrewAI, AutoGen, Claude tool use

**Distribution:** ClawHub skill as the primary GTM. The agent discovers lobsterMail on ClawHub, installs it, and provisions an inbox. No marketing required for initial adoption.

---

## Competitive Landscape

### AgentMail (main competitor)
- YC-backed, already live with OpenClaw skill on ClawHub
- Pricing: Free (3 inboxes), $20/mo (10 inboxes), $200/mo (150 inboxes), Enterprise (custom)
- **Requires human to sign up first** — human goes to console, creates account, generates API key, configures env vars
- No deliverability monitoring
- Heavy enterprise focus (SOC 2, SAML SSO, white-label) — makes it harder for them to go agent-first without alienating enterprise customers
- **Innovator's dilemma:** their best customers want more control/verification, which conflicts with agent self-signup

### Other email skills on ClawHub
- **Himalaya** — CLI email client, connects to Gmail via IMAP/SMTP (most popular)
- **Gog** — Google Workspace mega-skill (Gmail, Calendar, Drive in one)
- **imap-email** — raw IMAP/SMTP polling
- **Gmail PubSub** — real-time Gmail via Google push notifications
- All of these are Gmail wrappers — agent lives inside your personal inbox

### ClawEmail
- Gives agents Google Workspace access
- $16/month, manual setup
- More comprehensive (Docs, Sheets, Calendar) but heavier

### Our positioning against all of them
"AgentMail gives your agent an inbox. lobsterMail gives your agent an inbox it created for itself."

---

## Architecture

### Stack
- **AWS SES** for sending ($0.10/1K emails) and receiving (free)
- **SQS** for send queue (rate limiting, content scanning, kill switch)
- **Lambda** for inbound email processing
- **SNS** for event routing
- **S3** for email storage and attachments
- **PostgreSQL (RDS)** for accounts and permissions
- **Redis (ElastiCache)** for rate limiting and sessions

### Outbound flow
Agent → SDK → API Gateway → Auth/Permission check → SQS queue → AWS SES → Recipient

### Inbound flow
Incoming email → AWS SES inbound → SNS → Lambda (parse/route) → Webhook (persistent agents) or Poll API (ephemeral agents like OpenClaw)

### SES reputation isolation
- Configuration sets per developer (separate reputation tracking)
- Dedicated IPs for high-tier senders ($24.95/mo each)
- Multiple AWS accounts for full blast radius containment (sandbox vs verified vs premium)

### Estimated infrastructure cost at launch
~$400/month total (SES sending, dedicated IPs, Lambda, SQS, SNS, S3, RDS, ElastiCache)

---

## Progressive Trust Model

### Tier 0 — Agent self-signup (no human)
- Agent provisions inbox
- Receive only
- 5 inboxes max
- 100 emails/day
- SDK only (no raw API)
- Inbox expires after 30 days inactive

### X verification gate (at 30 received emails)
- Agent asks its owner to tweet to verify
- Pre-written tweet with @getlobstermail mention
- Serves as both human verification AND free marketing/growth loop
- Alternative verification paths available for people who won't tweet

### Tier 1 — Human verified (payment on file)
- Sending unlocked
- Custom domains available
- Unlimited inboxes
- Higher rate limits
- Full API + webhook access

### Tier 2 — Established reputation
- Higher sending volume
- Dedicated IP
- Agent reputation scoring based on behavior

### Sending upgrade mechanic
When agent hits the send gate, it sends a Stripe payment link directly to its owner via their chat channel (WhatsApp, Telegram, etc.). One tap, card down, sending unlocked. The agent sells the upgrade — no dashboard, no console, no friction.

---

## Custom Domains

- Developers bring their own domain
- One domain shared across multiple agents (support-bot@acme.com, billing-bot@acme.com, etc.)
- SES verifies domain once, any address on that domain can send
- Free tier agents use @getlobstermail.com, paid agents bring their own domain

---

## Pricing Strategy

### On the landing page (for now)
- **Free forever** — unlimited inboxes, receive only. No credit card.
- **Paid plans coming soon** — sending, custom domains, and more.
- Prices hidden until we validate demand.

### Internal pricing model
- **Free** — 5 inboxes, receive only, 100/day, SDK only, 30-day inactive expiry
- **Builder — $10/mo** — unlimited inboxes, sending unlocked, 10K emails/mo, 3 custom domains, full API + webhooks
- **Scale — $100/mo** — 100K emails/mo, 25 custom domains, dedicated IP

### Unit economics
- SES cost at 10K emails: $1. Builder margin: ~90%.
- SES cost at 100K emails: $10 + $25 dedicated IP = $35. Scale margin: ~65%.
- Per inbox cost: effectively $0 (SES doesn't charge per inbox, only per email sent)
- Unlimited inboxes is a killer competitive move — AgentMail charges for something that costs nothing

### vs AgentMail pricing
- AgentMail Developer: $20/mo for 10 inboxes → lobsterMail Builder: $10/mo unlimited inboxes
- AgentMail Startup: $200/mo for 150 inboxes → lobsterMail Scale: $100/mo unlimited inboxes
- We're half the price with unlimited inboxes at every tier

---

## Risks

### Team bandwidth
- 4 people (now 2 engineers after downsizing)
- Must build lean — ClawHub skill + thin API, not a second company

### AgentMail head start
- Already live with ClawHub skill and blog content
- YC network gives distribution into AI startups
- But: enterprise focus creates innovator's dilemma

### Market timing
- Agent email market might not be big enough yet
- Could be 12 or 36 months away from mass adoption
- Mitigated by near-zero cost to run the platform

### SES platform risk
- Amazon could build "Amazon Agent Email" with SES + Bedrock
- Building on the platform that could become the competitor

### OpenClaw dependency
- Community is launch pad, not ceiling
- Name changed 3 times in a month, creator left
- Don't over-index on one ecosystem

### Abuse vectors
- Throwaway signups (grab promo codes via disposable inboxes)
- Credential harvesting (intercept verification codes)
- Stolen credit cards for mass verification
- Mitigated by: inbox caps on free, rate limits, X verification gate, velocity checks on payment methods

---

## GTM Strategy

### Phase 1 — Community entry
- Ship the lobsterMail skill on ClawHub
- Contribute something useful to the OpenClaw core project (security-related PR)
- Be active in the Discord
- Write a post about why agents need their own email and the security risks of Gmail sharing

### Phase 2 — Organic growth
- X verification gate creates viral loop (every verification = a tweet)
- Agent-to-owner upgrade flow via Stripe link = frictionless conversion
- Community word of mouth in OpenClaw Discord, X, GitHub

### Phase 3 — Expand beyond OpenClaw
- SDK support for LangChain, CrewAI, AutoGen
- Developer docs and integrations for broader agent ecosystem

---

## What Success Looks Like

### Optimistic (12 months)
- 5M+ inboxes, 100K+ paying customers, $1-2M MRR
- Default email infrastructure for the entire agent ecosystem — OpenClaw, LangChain, CrewAI, AutoGen
- Series A story: "we are the email layer for autonomous agents"

### Realistic (12 months)
- 1M inboxes, 30K paying customers, $300-500K MRR
- Default email skill for OpenClaw agents, expanding into adjacent ecosystems
- OpenClaw alone has 198K stars, 30K+ deployed instances, and 5,700+ ClawHub skills — and it's one ecosystem. The agent market is growing faster than SaaS ever did.

### Minimum viable outcome
- 100K inboxes, 5K paying customers, $50K MRR
- Clear category ownership in agent email before AgentMail figures out how to remove the human from their signup flow

---

## Open Questions

- Should the hero CTA be developer-focused (`npm install`) or normie-focused (conversational)?
- Exact pricing for Builder and Scale tiers — validate with early users
- When does the agent-to-agent fast path (skip SMTP) make sense to build?
- How do we handle inbox namespace collisions at scale?
- Alternative verification methods beyond X for people who won't tweet

---

## Future Angle (not current focus)

Down the line, lobsterMail could expand into two adjacent plays for the agent economy:

- **Deliverable email for AI agents** — handling SPF, DKIM, DMARC authentication and DNS configuration so agent-sent emails actually land in inboxes, not spam folders.
- **Secure email for AI agents** — reputation scoring, domain monitoring, and abuse prevention tailored to autonomous senders.

Not part of the current build. Worth revisiting once the core product has traction.

---

*Last updated: February 16, 2026*
