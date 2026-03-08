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
import { COLORS, GLASS_CARD } from "./styles";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

/**
 * Scene 2: Tagline (3-5s / 60 frames)
 * Logo + "Instant email for your agent."
 * Emerges from Scene 1's orange burst — warm wash fades to reveal glass card.
 */
export const Scene2Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Intro: Orange wash fading away (first ~18 frames) ---
  // This mirrors Scene 1's outro orange burst, creating a seamless bridge
  const introWashOpacity = interpolate(frame, [0, 18], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Card entrance is slightly delayed so it appears as the wash clears
  const logoEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.92, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  // Tagline text fades up after the card lands
  const taglineEntrance = spring({
    frame: frame - 16,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [30, 0]);

  // Subtle glow pulse behind text
  const glowPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  // Radial glow grows from the fading orange wash
  const glowScale = interpolate(frame, [0, 20], [1.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial accent glow — starts big (from the burst) and settles */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(251, 87, 5, ${0.08 * glowPulse + introWashOpacity * 0.15}), transparent 60%)`,
          transform: `scale(${glowScale})`,
        }}
      />

      {/* Glassmorphic card container */}
      <div
        style={{
          ...GLASS_CARD,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "60px 80px",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Brand name */}
        <div
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.textPrimary,
            marginBottom: 16,
            textAlign: "center",
            textShadow: `0 0 ${30 * glowPulse}px ${COLORS.accentGlow}`,
          }}
        >
          lobstermail
          <span style={{ color: COLORS.accent }}>.ai</span>
        </div>

        {/* Divider line */}
        <div
          style={{
            width: 120,
            height: 2,
            backgroundColor: COLORS.edgeMedium,
            marginBottom: 24,
          }}
        />

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
              fontSize: 52,
              fontWeight: 400,
              color: COLORS.textSecondary,
              lineHeight: 1.3,
              textAlign: "center",
            }}
          >
            Instant email
            <br />
            for your agent.
          </div>
        </div>
      </div>

      {/* --- Intro: Orange wash overlay fading away --- */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 50%, rgba(251, 87, 5, ${introWashOpacity}), rgba(251, 87, 5, ${introWashOpacity * 0.5}) 50%, rgba(12, 10, 9, ${introWashOpacity * 0.2}) 85%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
