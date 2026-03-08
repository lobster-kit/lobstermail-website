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

/**
 * Scene 1: Hook (0-3s / 90 frames)
 * Cage drops in → shake → flash → lobster breaks free → "Not anymore."
 * Combines old Scene1 + Scene3 into one fast, punchy sequence.
 */
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Phase 1: Caged lobster (frames 0-40) ---

  // Cage drops from top with spring bounce
  const cageEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 120 },
  });
  const cageY = interpolate(cageEntrance, [0, 1], [-400, 0]);

  // Cage shakes after landing
  const shakeIntensity = interpolate(frame, [10, 20, 35], [8, 4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 2.5) * shakeIntensity;

  // "Your agent needs email." text
  const hookTextOpacity = interpolate(frame, [12, 18, 38, 44], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cage fades out before flash
  const cageOpacity = interpolate(frame, [38, 44], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 2: White flash at frame 44 ---
  const flashOpacity = interpolate(frame, [44, 48, 54], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Phase 3: Lobster breaks free (frames 48+) ---
  const lobsterEntrance = spring({
    frame: frame - 48,
    fps,
    config: { damping: 8, stiffness: 120 },
  });
  const lobsterY = interpolate(lobsterEntrance, [0, 1], [500, 0]);
  const lobsterScale = interpolate(lobsterEntrance, [0, 1], [0.5, 1]);
  const lobsterOpacity = interpolate(frame, [48, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Not anymore." text
  const freeTextEntrance = spring({
    frame: frame - 58,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const freeTextOpacity = interpolate(freeTextEntrance, [0, 1], [0, 1]);
  const freeTextScale = interpolate(freeTextEntrance, [0, 1], [0.8, 1]);

  // --- Phase 4: Orange burst outro (last ~20 frames) ---
  // "Not anymore." glow intensifies → radial orange wash fills the screen
  const outroStart = 80;

  // Text glow ramps up dramatically
  const textGlowIntensity = interpolate(
    frame,
    [outroStart, outroStart + 12],
    [1, 3.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Radial orange gradient expands from center
  const orangeWashOpacity = interpolate(
    frame,
    [outroStart, outroStart + 18],
    [0, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Content scales up slightly as energy releases
  const outroScale = interpolate(
    frame,
    [outroStart, outroStart + 18],
    [1, 1.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Content fades into the orange wash
  const outroContentFade = interpolate(
    frame,
    [outroStart + 8, outroStart + 18],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* --- Phase 1: Caged lobster --- */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: cageOpacity,
          transform: `translateY(${cageY}px) translateX(${shakeX}px)`,
        }}
      >
        <Img
          src={staticFile("video/lobster-in-cage-v2.png")}
          style={{
            width: 420,
            height: "auto",
            imageRendering: "pixelated",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            opacity: hookTextOpacity,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 80,
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
      </div>

      {/* --- Phase 3: Lobster breaking free --- */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: lobsterOpacity * outroContentFade,
          transform: `translateY(${lobsterY}px) scale(${lobsterScale * outroScale})`,
        }}
      >
        <Img
          src={staticFile("lobster-out-of-cage.png")}
          style={{
            width: 520,
            height: "auto",
            imageRendering: "pixelated",
            marginBottom: 30,
          }}
        />
        <div
          style={{
            opacity: freeTextOpacity,
            transform: `scale(${freeTextScale})`,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 88,
              fontWeight: 700,
              color: COLORS.accent,
              lineHeight: 1.1,
              textShadow: `0 0 ${30 * textGlowIntensity}px rgba(251, 87, 5, ${0.4 * textGlowIntensity}), 0 0 ${60 * textGlowIntensity}px rgba(251, 87, 5, ${0.15 * textGlowIntensity})`,
            }}
          >
            Not anymore.
          </div>
        </div>
      </div>

      {/* --- Phase 2: White flash overlay --- */}
      <AbsoluteFill
        style={{
          backgroundColor: "#ffffff",
          opacity: flashOpacity,
        }}
      />

      {/* --- Phase 4: Orange burst outro overlay --- */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 50%, rgba(251, 87, 5, ${orangeWashOpacity}), rgba(251, 87, 5, ${orangeWashOpacity * 0.6}) 40%, rgba(12, 10, 9, ${orangeWashOpacity * 0.3}) 80%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
