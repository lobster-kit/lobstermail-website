import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Lora";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const COLORS = {
  bg: "#0C0A09",
  accent: "#FB5705",
  textPrimary: "#f5f5f5",
  textSecondary: "#a3a3a3",
  textMuted: "#737373",
};

/**
 * Branded end card (frames 390–450 / 13s–15s).
 * Logo → tagline → promo → URL, sequential entrance.
 */
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale-up (starts immediately)
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  // "Instant email for your agent." (starts at +12 frames / 0.4s)
  const taglineOpacity = interpolate(frame, [12, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [12, 21], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "First 1,000 agents get 3 months free" (starts at +24 frames / 0.8s)
  const promoOpacity = interpolate(frame, [24, 33], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const promoY = interpolate(frame, [24, 33], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "lobstermail.ai" URL (starts at +36 frames / 1.2s)
  const urlOpacity = interpolate(frame, [36, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse on the whole card
  const glowPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial orange glow (matches hero section) */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(251, 87, 5, ${0.12 * glowPulse}), transparent 70%)`,
        }}
      />

      {/* Content stack */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            marginBottom: 8,
          }}
        >
          <Img
            src={staticFile("lobster-logo-800.png")}
            style={{
              width: 120,
              height: 120,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.textPrimary,
              textAlign: "center",
            }}
          >
            Instant email for your agent.
          </div>
        </div>

        {/* Promo */}
        <div
          style={{
            opacity: promoOpacity,
            transform: `translateY(${promoY}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 22,
              fontWeight: 400,
              color: COLORS.accent,
              textAlign: "center",
            }}
          >
            First 1,000 agents get 3 months free
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 20,
              fontWeight: 400,
              color: COLORS.textMuted,
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            lobstermail.ai
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
