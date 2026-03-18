# Design System — LobsterMail

## Product Context
- **What this is:** Marketing website + docs for LobsterMail — agent-first email infrastructure for AI agents
- **Who it's for:** Developers building autonomous AI agents (OpenClaw, MCP, LangChain, CrewAI)
- **Space/industry:** Developer tools / API infrastructure (peers: Resend, Postmark, Loops, AgentMail)
- **Project type:** Marketing site with integrated docs and blog
- **Domain:** lobstermail.ai

## Aesthetic Direction
- **Direction:** Retro-Futuristic meets Editorial — a serif-first developer tool site
- **Decoration level:** Intentional — dot grid background, glassmorphic cards with blue-tinted borders, subtle orange glow halos. Each decorative element earns its place
- **Mood:** Warm, confident, crafted. Not cold and generic like every other dark-mode dev tool. The serif font says "we care about quality." The orange says "we have personality." The blue glass says "there's depth here"
- **What makes it distinctive:** Nobody in the developer tools space uses a serif as their primary font. The warm orange / cool blue tension creates visual depth that flat monochrome sites lack. The chat-style hero humanizes a technical product

## Typography

### Fonts
- **Primary (Display + Body):** Lora (serif) — warm, readable, distinctive in the dev tool space. Used for all headings, body copy, and buttons
- **Code / Data / Labels:** Geist Mono — clean, modern, good tabular figures. Used for code blocks, data tables, pricing tiers, section labels, and technical content
- **Loading:** `next/font/google` with CSS variables `--font-lora` and `--font-geist-mono`

### Type Scale (responsive, mobile → sm → md → lg)
| Level | Mobile | sm (640px) | md (768px) | lg (1024px) | Weight |
|-------|--------|------------|------------|-------------|--------|
| h1    | 28px   | 36px       | 48px       | 56px        | 900    |
| h2    | 28px   | 32px       | 36px       | 42px        | 700    |
| h3    | 22px   | 24px       | 28px       | 32px        | 600    |
| h4    | 18px   | 20px       | 22px       | 24px        | 700    |
| body  | 16px   | 18px       | —          | —           | 400    |

All headings use `line-height: normal`. Body uses `line-height: 1.5`.

### Typography Utilities
CSS classes in `globals.css`: `.h1`, `.h2`, `.h3`, `.h4`, `.p-text`. These include the font-family, weight, size, and responsive breakpoints.

## Color

### Approach: Restrained with intentional contrast
One accent color (orange) used sparingly for emphasis. Blue edges create structural depth. Warm neutrals prevent clinical feel.

### Dark Theme (default)
| Token              | Value                          | Usage |
|--------------------|--------------------------------|-------|
| `--background`     | `#0C0A09`                      | Page background (warm black) |
| `--foreground`     | `#FAFAF9`                      | Primary text (warm white) |
| `--text-secondary` | `#9A938E`                      | Body copy, descriptions |
| `--accent`         | `#FB5705`                      | CTAs, highlights, links, check icons |
| `--accent-hover`   | `#E04D04`                      | Button hover state |
| `--accent-glow`    | `rgba(251,87,5,0.06)`          | Subtle glow backgrounds |
| `--edge`           | `rgba(128,187,255,0.15)`       | Default borders (blue-tinted) |
| `--edge-subtle`    | `rgba(128,187,255,0.08)`       | Row dividers |
| `--edge-strong`    | `rgba(128,187,255,0.25)`       | Glass card borders, navbar |
| `--edge-input`     | `rgba(168,162,158,0.25)`       | Form input borders |
| `--terminal-bg`    | `#000000`                      | Code blocks, snippet blocks |
| `--dot-pattern`    | `rgba(128,187,255,0.15)`       | Body dot grid background |

### Light Theme
Same accent color. Background flips to `#FFFFFF`, foreground to `#1C1917`, secondary to `#57534E`. Edge blues increase opacity (0.30/0.18/0.45). Surfaces use black at low opacity instead of white.

### Surface Layers (progressive depth)
| Token        | Dark                       | Light                    |
|--------------|----------------------------|--------------------------|
| `--surface-1`| `rgba(255,255,255,0.04)`   | `rgba(0,0,0,0.02)`      |
| `--surface-2`| `rgba(255,255,255,0.06)`   | `rgba(0,0,0,0.03)`      |
| `--surface-3`| `rgba(255,255,255,0.08)`   | `rgba(0,0,0,0.05)`      |
| `--surface-4`| `rgba(255,255,255,0.10)`   | `rgba(0,0,0,0.07)`      |
| `--surface-5`| `rgba(255,255,255,0.14)`   | `rgba(0,0,0,0.10)`      |

### Orange Glow Halos
Radial gradients placed behind key focal points (hero code card, final CTA snippet). Not decorative — they draw the eye.
- Hero: `radial-gradient(ellipse at center, rgba(251,87,5,0.12), transparent 70%)` at `opacity: 0.6`
- Final CTA: `radial-gradient(ellipse at center, rgba(251,87,5,0.15), transparent 70%)` at `opacity: 0.6`
- Section glow: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(251,87,5,0.04), transparent 60%)`

## Spacing

### Base Unit: 4px
### Density: Comfortable

### Section Spacing
| Context | Value |
|---------|-------|
| Home sections (standard) | `py-28 sm:py-36` (112px / 144px) |
| Hero top | `pt-32 sm:pt-48 lg:pt-52` (navbar clearance) |
| Hero bottom | `pb-20 sm:pb-28` |
| Inner page `<main>` | `pt-32` (always) |
| Inner page header | `pb-20 sm:pb-28` |
| Between content blocks | `mt-20 sm:mt-28` |
| Last section before footer | `pb-28 sm:pb-36` |

### Container Pattern
```
max-w-6xl mx-auto px-6
```
Sections use `px-6` on the `<section>` and `max-w-6xl mx-auto` on the inner `<div>`.

## Layout
- **Approach:** Grid-disciplined
- **Max content width:** `max-w-6xl` (1152px)
- **Narrow content:** `max-w-3xl` (768px) for FAQ, comparison table
- **Gutters:** `px-6` (24px)
- **Pricing grid:** `sm:grid-cols-2 gap-6`
- **Comparison table grid:** `grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px]`
- **Footer:** `md:grid-cols-[1.4fr_1fr_1fr_1fr]`
- **Hero:** Flex column (mobile) → `lg:flex-row` with `gap-12 lg:gap-16`

## Border Radius

| Element | Radius | Notes |
|---------|--------|-------|
| Glass cards (`.glass`, `.glass-strong`, `.glass-subtle`) | `50px` | Signature pill-shaped silhouette |
| Buttons (primary) | `10px` | |
| Pricing CTA buttons | `9999px` (full round) | |
| FAQ container | `16px` (`rounded-2xl`) | |
| Chat bubbles | `16px` with `6px` on pointer corner | Agent: `rounded-tl-md`, Human: `rounded-tr-md` |
| Code snippet blocks | `12px` (`rounded-xl`) | |
| Chat inner container | `12px` (`rounded-xl`) | |
| Navbar dropdown | `16px` (`rounded-2xl`) | |
| Modals | `16px` (`rounded-2xl`) | |

## Glass Card System

Three variants, all with the signature 50px radius and blue-tinted borders:

### `.glass` (standard)
- Border: `3px solid var(--edge-strong)`
- Background: `var(--background)`
- Shadow: `0 17px 35px 0 rgba(0,80,171,0.15)`
- Used for: comparison table, free pricing card

### `.glass-strong` (featured/emphasis)
- Border: `3px solid var(--edge-strong)`
- Background: `rgba(18,19,23,1)` dark / `#F6FAFD` light
- Shadow: `0 20px 40px 0 rgba(0,80,171,0.22)` with **pulsing animation** (4s)
- Used for: hero code card, builder pricing card

### `.glass-subtle` (low emphasis)
- Border: `2px solid var(--edge-strong)`
- Background: `var(--background)`
- Shadow: `0 10px 25px 0 rgba(0,80,171,0.08)`

## Components

### Navbar
- Fixed, `top-0 z-50`, `backdrop-blur-xl`
- Border changes on scroll: `border-edge` → `border-edge-strong` at `scrollY > 60`
- Background: `bg-background/80` → `bg-background/95` on scroll
- Logo: 28px lobster icon + "LobsterMail" text, `font-extrabold`
- Links: `text-sm text-secondary`, hover → `text-foreground`
- Get Started button: `border-2 border-accent bg-accent/10 text-accent` with orange glow shadow

### Launch Banner
- Fixed at `top-[70px]`, `bg-accent`, `text-black`
- Pulsing shadow: `banner-bg-pulse` animation (4s)
- Shimmer sweep: `banner-shimmer` animation (7s, 2s delay)
- Content separated by `opacity-50` dash dividers

### Chat Mockup (CodeSnippet)
- Wrapper: `.glass-strong` with `p-6 sm:p-8`
- Inner: `rounded-xl bg-glass-strong-bg p-5 sm:p-6`
- Messages: `gap-[35px]` between messages
- Agent avatar: `h-7 w-7 rounded-full bg-accent/20`, Robot icon, "AGENT" label
- Human avatar: same size, `bg-secondary/20`, User icon, "YOU" label
- Agent bubble: `bg-accent/[0.08]`, `rounded-2xl rounded-tl-md`
- Human bubble: `bg-surface-4`, `rounded-2xl rounded-tr-md`

### CopySnippetBlock
- Dark terminal background: `bg-terminal`, `border-2` with `var(--snippet-border)` (accent in dark, dimmed in light)
- Orange glow shadow: `var(--snippet-shadow)`
- Copy badge: `border-2 border-accent bg-accent/10 text-accent`
- On copy: Check icon with `animate-icon-pop`

### Credibility Pill
- Spinning conic gradient border: `pill-border-spin` (4s linear infinite)
- Shimmer sweep: `pill-shimmer` (6s)
- Hover: glow (`bg-accent/[0.06]`), lift (`-translate-y-0.5`)
- Content: Newspaper icon (accent) + text

### Comparison Table
- Inside `.glass` card with `p-[15px]`
- Grid: `grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px]`
- X icon: `h-7 w-7 rounded-full border border-edge bg-foreground/10`, gray X
- Check icon: `h-7 w-7 rounded-full bg-accent/15 border border-accent/20`, orange check
- Rows animate in with staggered FadeIn (0.06s increments)

### Pricing Cards
- Grid: `sm:grid-cols-2 gap-6`, centered at `max-w-3xl`
- Free: `.glass`, secondary border button (`rounded-full border-2 border-edge-strong`)
- Builder: `.glass-strong`, solid accent button (`rounded-full bg-accent`)
- Both: `hover:-translate-y-1` lift effect
- Feature list: Check icons, `text-lg text-secondary`
- Divider: `h-px bg-edge`

### FAQ Accordion
- Container: `rounded-2xl border-3 border-edge-strong bg-background px-6 py-5 sm:px-8`
- Items separated by `border-b border-edge`
- Trigger: `text-base sm:text-lg font-semibold`, hover → `text-accent`
- Caret: `rotate-180` on expand, `duration-200`

### Footer
- Grid: `md:grid-cols-[1.4fr_1fr_1fr_1fr]`
- Column headings: `text-xs uppercase tracking-widest text-secondary`
- Links: `text-sm text-secondary`, hover → `text-foreground`
- Social icons: `p-1.5 rounded-md`, hover → `bg-white/5`

## Motion

### Approach: Intentional
Motion adds comprehension and personality, never distraction.

### Animations
| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `float` | 3s | ease-in-out, infinite | Hero lobster logo |
| `glass-shadow-pulse` | 4s | ease-in-out, infinite | `.glass-strong` shadow breathing |
| `banner-bg-pulse` | 4s | ease-in-out, infinite | Launch banner glow |
| `banner-shimmer` | 7s (2s delay) | ease-in-out, infinite | Banner light sweep |
| `pill-border-spin` | 4s | linear, infinite | Credibility pill conic gradient |
| `pill-shimmer` | 6s | ease-in-out, infinite | Credibility pill sweep |
| `icon-pop` | 0.4s | cubic-bezier(0.34,1.56,0.64,1) | Copy confirmation check |
| `modal-in` | 0.28s | ease-out | Modal entrance (scale 0.95→1) |
| `modal-overlay-in` | 0.2s | ease-out | Modal overlay fade |
| `message-in` | 0.55s | ease-out | Chat message entrance |

### FadeIn Component
- Scroll-triggered via IntersectionObserver (`threshold: 0.1`, `rootMargin: 0px 0px -40px 0px`)
- Duration: 0.9s, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Directions: up (default, 14px), down, left, right, none
- Staggered: siblings use incrementing `delay` props (typically 0.06-0.08s apart)

### Transitions
- Buttons/links: `0.2s ease`
- Card hover lift: `0.3s` on `transform`
- Navbar scroll state: `0.3s` on `background-color, border-color`

## Dot Grid Background
Applied via `body::before` pseudo-element:
- Pattern: 1px lines at 48px intervals, both horizontal and vertical
- Color: `var(--dot-pattern)` (blue-tinted)
- Position: `fixed`, `inset: 0`
- Mask: horizontal fade from `0.375` → `0.75` → `0.75` → `0.375` (dims at edges)

## Competitive Positioning
Most developer API sites (Resend, Clerk, AgentMail) use dark backgrounds with geometric sans-serifs (Inter, Geist). They're polished but interchangeable. LobsterMail's design stands out through:
1. **Serif primary font** — signals editorial quality, nobody else does this
2. **Orange/blue tension** — warm accent + cool glass creates depth flat sites lack
3. **Chat-style hero** — humanizes a technical product, shows the agent experience
4. **50px glass radius** — distinctive pill silhouette vs standard rounded cards

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-18 | Initial design system documented | Formalized existing design from codebase into DESIGN.md via /design-consultation. Competitive research confirmed distinctive positioning against Resend, Postmark, Loops, Clerk, AgentMail |
