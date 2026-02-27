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

export const Scene3Freedom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // White flash at scene start
  const flashOpacity = interpolate(frame, [0, 4, 12], [0.9, 0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lobster smashes in from bottom with bouncy spring
  const lobsterEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 8, stiffness: 120 },
  });
  const lobsterY = interpolate(lobsterEntrance, [0, 1], [600, 0]);
  const lobsterScale = interpolate(lobsterEntrance, [0, 1], [0.5, 1]);

  // "Not anymore." text
  const textEntrance = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);
  const textScale = interpolate(textEntrance, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Lobster breaking free */}
      <div
        style={{
          transform: `translateY(${lobsterY}px) scale(${lobsterScale})`,
          marginBottom: 30,
        }}
      >
        <Img
          src={staticFile("lobster-out-of-cage.png")}
          style={{
            width: 600,
            height: "auto",
            imageRendering: "pixelated",
          }}
        />
      </div>

      {/* "Not anymore." text */}
      <div
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 96,
            fontWeight: 700,
            color: COLORS.accent,
            lineHeight: 1.1,
          }}
        >
          Not anymore.
        </div>
      </div>

      {/* White flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ffffff",
          opacity: flashOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
