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
 * Scene 3: Value Prop — Self Signup (5-9s / 120 frames)
 * "Zero human signup." + subtext
 * Lobster at laptop inside glassmorphic card.
 */
export const Scene3SelfSignup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card + lobster slide up together
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const cardY = interpolate(cardEntrance, [0, 1], [200, 0]);
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);
  const cardScale = interpolate(cardEntrance, [0, 1], [0.92, 1]);

  // Headline springs in slightly delayed
  const headlineEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const headlineOpacity = interpolate(headlineEntrance, [0, 1], [0, 1]);

  // Subtext fades up after headline
  const subtextEntrance = spring({
    frame: frame - 18,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const subtextOpacity = interpolate(subtextEntrance, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextEntrance, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Orange glow behind the card */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.accentGlowSubtle}, transparent 60%)`,
          opacity: cardOpacity,
        }}
      />

      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Lobster image */}
        <Img
          src={staticFile("video/lobster-self-signup.png")}
          style={{
            width: 380,
            height: 380,
            imageRendering: "pixelated",
            marginBottom: 40,
          }}
        />

        {/* Glassmorphic text card */}
        <div
          style={{
            ...GLASS_CARD,
            padding: "40px 60px",
            maxWidth: 900,
          }}
        >
          {/* Headline */}
          <div
            style={{
              opacity: headlineOpacity,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 68,
                fontWeight: 700,
                color: COLORS.textPrimary,
                lineHeight: 1.15,
              }}
            >
              Zero human signup.
            </div>
          </div>

          {/* Subtext */}
          <div
            style={{
              opacity: subtextOpacity,
              transform: `translateY(${subtextY}px)`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 36,
                fontWeight: 400,
                color: COLORS.textSecondary,
                lineHeight: 1.4,
              }}
            >
              Your agent hatches its own inbox.
              <br />
              No API keys. No config.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
