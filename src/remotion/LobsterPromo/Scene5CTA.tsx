import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { COLORS } from "./styles";

const { fontFamily: loraFamily } = loadLora("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

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

  // Subtle glow pulse on URL
  const glowPulse = Math.sin(frame * 0.15) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Celebrating lobster */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          marginBottom: 50,
        }}
      >
        <Img
          src={staticFile("video/lobster-celebrating.png")}
          style={{
            width: 350,
            height: 350,
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
            fontFamily: loraFamily,
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.accent,
            textAlign: "center",
            textShadow: `0 0 ${40 * glowPulse}px ${COLORS.accent}60, 0 0 ${80 * glowPulse}px ${COLORS.accent}30`,
          }}
        >
          lobstermail.ai
        </div>
      </div>

      {/* CTA Badge */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}
      >
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.bg,
            backgroundColor: COLORS.accent,
            padding: "20px 50px",
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          Hatch an inbox →
        </div>
      </div>
    </AbsoluteFill>
  );
};
