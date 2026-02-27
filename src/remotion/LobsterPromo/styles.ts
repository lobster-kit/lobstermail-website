// Design tokens matching the LobsterMail website
export const COLORS = {
  bg: "#0a0a0a",
  bgSubtle: "#141414",
  textPrimary: "#f5f5f5",
  textSecondary: "#a3a3a3",
  textMuted: "#737373",
  accent: "#f97316", // orange-500
  accentGlow: "#fb923c", // orange-400
  accentBright: "#fdba74", // orange-300
  danger: "#ef4444", // red-500
  dangerDark: "#991b1b", // red-900
  gridLine: "#1a1a1a",
} as const;

// Scene durations in frames (at 30fps)
export const SCENES = {
  hook: { start: 0, duration: 90 }, // 0-3s
  pain: { start: 90, duration: 90 }, // 3-6s
  freedom: { start: 180, duration: 90 }, // 6-9s
  valueProps: { start: 270, duration: 150 }, // 9-14s
  cta: { start: 420, duration: 120 }, // 14-18s
} as const;

export const TOTAL_FRAMES = 540; // 18s at 30fps
