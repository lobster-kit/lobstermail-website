// Design tokens matching the LobsterMail website — updated from site research
export const COLORS = {
  // Core
  bg: "#0C0A09",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceStrong: "rgba(255, 255, 255, 0.08)",

  // Text
  textPrimary: "#f5f5f5",
  textSecondary: "#a3a3a3",
  textMuted: "#737373",

  // Accent (orange)
  accent: "#FB5705",
  accentHover: "#E04D04",
  accentGlow: "rgba(251, 87, 5, 0.15)",
  accentGlowSubtle: "rgba(251, 87, 5, 0.06)",

  // Edges (blue-tinted)
  edgeStrong: "rgba(128, 187, 255, 0.25)",
  edgeMedium: "rgba(128, 187, 255, 0.15)",
  edgeSubtle: "rgba(128, 187, 255, 0.08)",

  // Grid
  gridDot: "rgba(128, 187, 255, 0.15)",
  gridSize: 12, // 4x website's 48px — super dense dot grid

  // Effects
  glassShadow: "0 17px 35px 0 rgba(0, 80, 171, 0.15)",
  orangeShadow: "0 4px 8px 3px rgba(251, 87, 5, 0.15)",

  // Legacy (kept for easy migration)
  danger: "#ef4444",
  dangerDark: "#991b1b",
} as const;

// New 5-scene value-forward structure
// Scene durations in frames (at 30fps)
export const SCENES = {
  hook: { start: 0, duration: 90 }, // 0-3s   — Cage → break free (fast)
  tagline: { start: 90, duration: 60 }, // 3-5s   — Logo + "Instant email for your agent."
  selfSignup: { start: 150, duration: 120 }, // 5-9s   — Value prop: Zero human signup
  security: { start: 270, duration: 120 }, // 9-13s  — Value prop: Prompt injection security
  cta: { start: 390, duration: 150 }, // 13-18s — CTA: lobstermail.ai
} as const;

export const TOTAL_FRAMES = 540; // 18s at 30fps

// Glass card style helper
export const GLASS_CARD = {
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  border: "2px solid rgba(128, 187, 255, 0.15)",
  borderRadius: 24,
  boxShadow: "0 17px 35px 0 rgba(0, 80, 171, 0.15)",
} as const;
