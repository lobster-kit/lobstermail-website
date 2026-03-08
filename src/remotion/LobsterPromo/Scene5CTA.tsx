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
import { COLORS } from "./styles";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

/**
 * Scene 5: CTA (13-18s / 150 frames)
 * Celebrating lobster + "lobstermail.ai" with glow pulse + "Hatch an inbox →" glass button
 */
export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Celebrating lobster scales in
  const lobsterEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const lobsterScale = interpolate(lobsterEntrance, [0, 1], [0.5, 1]);
  const lobsterOpacity = interpolate(lobsterEntrance, [0, 1], [0, 1]);

  // URL text entrance
  const urlEntrance = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const urlOpacity = interpolate(urlEntrance, [0, 1], [0, 1]);
  const urlY = interpolate(urlEntrance, [0, 1], [40, 0]);

  // CTA badge entrance
  const ctaEntrance = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const ctaOpacity = interpolate(ctaEntrance, [0, 1], [0, 1]);
  const ctaScale = interpolate(ctaEntrance, [0, 1], [0.8, 1]);

  // Orange glow pulse on URL
  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Big radial glow behind everything */}
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(251, 87, 5, ${0.1 * glowPulse}), transparent 55%)`,
        }}
      />

      {/* Celebrating lobster */}
      <div
        style={{
          transform: `scale(${lobsterScale})`,
          opacity: lobsterOpacity,
          marginBottom: 50,
        }}
      >
        <Img
          src={staticFile("video/lobster-celebrating.png")}
          style={{
            width: 380,
            height: 380,
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* lobstermail.ai URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.textPrimary,
            textAlign: "center",
            textShadow: `0 0 ${40 * glowPulse}px ${COLORS.accentGlow}, 0 0 ${80 * glowPulse}px rgba(251, 87, 5, 0.08)`,
          }}
        >
          lobstermail
          <span style={{ color: COLORS.accent }}>.ai</span>
        </div>
      </div>

      {/* CTA Button — glassmorphic with orange accent */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.bg,
            backgroundColor: COLORS.accent,
            padding: "22px 56px",
            borderRadius: 50, // matches website pill buttons
            textAlign: "center",
            boxShadow: `0 4px 8px 3px rgba(251, 87, 5, 0.25), 0 0 40px rgba(251, 87, 5, ${0.15 * glowPulse})`,
          }}
        >
          Hatch an inbox →
        </div>
      </div>
    </AbsoluteFill>
  );
};
