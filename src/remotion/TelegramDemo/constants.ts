// Telegram dark theme colors
export const TG = {
  bg: "#0E1621",
  headerBg: "#17212B",
  incomingBubble: "#182533",
  outgoingBubble: "#2B5278",
  text: "#FFFFFF",
  timestamp: "#6C7883",
  typingDots: "#6C7883",
  botBadge: "#3A95D5",
  onlineDot: "#4DCD5E",
  headerBorder: "#101921",
  emailHighlight: "#5CA0D3",
} as const;

// Scene frame ranges (30fps, 15s = 450 frames)
export const SCENES = {
  botProblem: { start: 0, end: 105 }, // 0.0s – 3.5s
  userSolution: { start: 105, end: 165 }, // 3.5s – 5.5s
  typing1: { start: 165, end: 195 }, // 5.5s – 6.5s
  botSignup: { start: 195, end: 330 }, // 6.5s – 11.0s
  typing2: { start: 330, end: 345 }, // 11.0s – 11.5s
  botComplete: { start: 345, end: 390 }, // 11.5s – 13.0s
  endCard: { start: 390, end: 450 }, // 13.0s – 15.0s
} as const;

export const DEMO_CONFIG = {
  id: "TelegramDemo",
  fps: 30,
  durationInFrames: 450,
  width: 1280,
  height: 720,
} as const;

// Chat messages
export const MESSAGES = [
  {
    sender: "bot" as const,
    text: "I tried to create a GitHub account to manage your repos, but they require email verification. I don't have an email address.",
    scene: "botProblem",
  },
  {
    sender: "user" as const,
    text: "get yourself an email with this: lobstermail.ai/skill",
    scene: "userSolution",
  },
  {
    sender: "bot" as const,
    // Rich text segments for the signup response
    segments: [
      { text: "Done. I signed up on LobsterMail and got my own inbox.\n\n" },
      { text: "clawdia@lobstermail.ai", bold: true, color: "#5CA0D3", glow: true },
      { text: "\n\nGoing back to the GitHub signup now." },
    ],
    scene: "botSignup",
  },
  {
    sender: "bot" as const,
    text: "GitHub account created. Verification email received and confirmed. Your repos are ready.",
    scene: "botComplete",
  },
] as const;

// Typography
export const FONT = {
  family:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  sizeBody: 20,
  sizeName: 18,
  sizeBadge: 13,
  sizeTimestamp: 13,
} as const;

// Layout
export const LAYOUT = {
  headerHeight: 56,
  avatarSize: 44,
  bubbleMaxWidth: 680,
  bubblePadding: 14,
  bubbleRadius: 12,
  messageGap: 8,
  sidePadding: 24,
} as const;
