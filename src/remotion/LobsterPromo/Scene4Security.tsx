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
 * Scene 4: Value Prop — Security (9-13s / 120 frames)
 * "Built-in prompt injection security." + subtext
 * Shield lobster inside glassmorphic card with blue-tinted border.
 */
export const Scene4Security: React.FC = () => {
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

  // Subtle shield pulse
  const shieldPulse = Math.sin(frame * 0.08) * 0.04 + 1;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Blue-ish glow behind the card (security = cooler tone) */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(128, 187, 255, 0.06), transparent 60%)`,
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
        {/* Shield lobster image with subtle pulse */}
        <div style={{ transform: `scale(${shieldPulse})` }}>
          <Img
            src={staticFile("video/lobster-security-shield.png")}
            style={{
              width: 380,
              height: 380,
              imageRendering: "pixelated",
              marginBottom: 40,
            }}
          />
        </div>

        {/* Glassmorphic text card with stronger blue border */}
        <div
          style={{
            ...GLASS_CARD,
            border: `2px solid ${COLORS.edgeStrong}`,
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
                fontSize: 60,
                fontWeight: 700,
                color: COLORS.textPrimary,
                lineHeight: 1.15,
              }}
            >
              Built-in prompt
              <br />
              injection security.
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
              6-layer threat detection.
              <br />
              Every email scanned.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
