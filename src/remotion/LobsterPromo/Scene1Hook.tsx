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
  weights: ["700"],
  subsets: ["latin"],
});

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Lobster cage shakes in from top
  const cageEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const cageY = interpolate(cageEntrance, [0, 1], [-400, 0]);

  // Cage rattles/shakes after landing
  const shakeIntensity = interpolate(frame, [15, 30, 60], [8, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 2.5) * shakeIntensity;
  const shakeRotate = Math.sin(frame * 3) * shakeIntensity * 0.3;

  // Text slides up with spring
  const textEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const textY = interpolate(textEntrance, [0, 1], [100, 0]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Caged lobster */}
      <div
        style={{
          transform: `translateY(${cageY}px) translateX(${shakeX}px) rotate(${shakeRotate}deg)`,
          marginBottom: 40,
        }}
      >
        <Img
          src={staticFile("lobster-in-cage.png")}
          style={{
            width: 500,
            height: "auto",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* Hook text */}
      <div
        style={{
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 88,
            fontWeight: 700,
            color: COLORS.textPrimary,
            lineHeight: 1.1,
          }}
        >
          Your agent
          <br />
          needs email.
        </div>
      </div>
    </AbsoluteFill>
  );
};
