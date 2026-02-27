# LobsterMail Promo Clip — Implementation Plan

## Video Spec
- **Format:** Vertical 1080x1920 (TikTok/Reels/Shorts)
- **Duration:** ~18 seconds (540 frames @ 30fps)
- **Vibe:** Hype / launch energy — fast cuts, bold text, high energy

## Creative Concept: "Break Free"

A 5-scene narrative: your agent is trapped → pain points flash → it breaks free → product reveal → CTA.

### Scene Breakdown

| Scene | Frames | Seconds | Content |
|-------|--------|---------|---------|
| 1 — Hook | 0-120 | 0-4s | Dark bg, lobster-in-cage.png shakes/rattles in. Bold text: **"Your agent needs email."** |
| 2 — Pain | 120-210 | 4-7s | Rapid-fire text slams: **"API keys." "Human signup." "Config hell."** Each flashes in red then strikes through / glitches out |
| 3 — Freedom | 210-330 | 7-11s | lobster-out-of-cage.png smashes in with spring bounce. Text: **"Not anymore."** Screen flash / energy burst |
| 4 — Product | 330-480 | 11-16s | lobstermail-logo-big.png fades up on cloud. Typewriter text: **"Instant email for your agent."** Subtitle fades: "No API keys. No human signup." |
| 5 — CTA | 480-540 | 16-18s | Bold **"lobstermail.ai"** with glow pulse. Button-style badge: **"Hatch an inbox →"** |

### Transitions
- Scene 1→2: Hard cut (abrupt, tension)
- Scene 2→3: Slide from bottom (liberation energy)
- Scene 3→4: Fade (settling down)
- Scene 4→5: Fade (clean close)

## File Structure

```
src/remotion/
  Root.tsx                    # Registers all compositions
  index.ts                    # Remotion Studio entry point
  LobsterPromo/
    index.tsx                 # Main composition (orchestrates scenes)
    Scene1Hook.tsx            # Caged lobster + hook text
    Scene2Pain.tsx            # Pain points rapid-fire
    Scene3Freedom.tsx         # Lobster breaks free
    Scene4Product.tsx         # Logo + tagline
    Scene5CTA.tsx             # URL + call to action
    styles.ts                 # Shared colors, constants
remotion.config.ts            # Remotion Studio config (entry point)
```

## Assets Used (from public/)

| File | Scene | Purpose |
|------|-------|---------|
| `lobster-in-cage.png` | 1 | Trapped lobster (the problem) |
| `lobster-out-of-cage.png` | 3 | Lobster breaking free (liberation) |
| `lobstermail-logo-big.png` | 4 | Hero logo with envelope + cloud |
| `lobster-mail-logo.png` | 5 | Logo mark for CTA |

## Packages to Install

- `@remotion/transitions` — scene transitions (fade, slide)
- `@remotion/google-fonts` — Lora (serif headings) + Geist Mono font loading

## Design Tokens (matching the website)

- **Background:** `#0a0a0a` (near-black)
- **Text primary:** `#f5f5f5` (warm white)
- **Text muted:** `#737373`
- **Accent:** `#f97316` (orange-500)
- **Accent glow:** `#fb923c` (orange-400)
- **Danger/pain:** `#ef4444` (red-500)
- **Heading font:** Lora (serif)
- **Code/mono font:** Geist Mono

## Implementation Steps

1. **Install missing Remotion packages** (`@remotion/transitions`, `@remotion/google-fonts`)
2. **Create `remotion.config.ts`** at project root pointing to `src/remotion/index.ts`
3. **Create shared styles** (`src/remotion/LobsterPromo/styles.ts`) with design tokens
4. **Build Scene 1** — Hook with caged lobster + shake animation + bold text entrance
5. **Build Scene 2** — Pain points rapid-fire with strike-through / glitch
6. **Build Scene 3** — Freedom scene with spring-bounce lobster entrance + flash
7. **Build Scene 4** — Product reveal with typewriter headline
8. **Build Scene 5** — CTA with glow pulse on URL
9. **Build main composition** — Wire all scenes together with TransitionSeries
10. **Create Root.tsx + index.ts** — Register composition with Remotion Studio
11. **Add `remotion` script** to package.json for `npx remotion studio`
12. **Preview and iterate** in Remotion Studio
