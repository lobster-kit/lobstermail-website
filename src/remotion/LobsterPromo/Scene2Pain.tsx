import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { COLORS } from "./styles";

const { fontFamily: loraFamily } = loadLora("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

const PAIN_POINTS = [
  { text: "API keys.", delay: 0 },
  { text: "Human signup.", delay: 18 },
  { text: "Config hell.", delay: 36 },
];

export const Scene2Pain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      {PAIN_POINTS.map((point, i) => {
        const entrance = spring({
          frame: frame - point.delay,
          fps,
          config: { damping: 8, stiffness: 200 },
        });

        const scale = interpolate(entrance, [0, 1], [2.5, 1]);
        const opacity = interpolate(entrance, [0, 1], [0, 1]);

        // Strikethrough appears after the text lands
        const strikeDelay = point.delay + 14;
        const strikeProgress = interpolate(
          frame,
          [strikeDelay, strikeDelay + 6],
          [0, 100],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        // Text turns muted after strikethrough
        const textColor =
          strikeProgress >= 100 ? COLORS.textMuted : COLORS.danger;

        return (
          <div
            key={point.text}
            style={{
              transform: `scale(${scale})`,
              opacity,
              marginBottom: 50,
              position: "relative",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: loraFamily,
                fontSize: 96,
                fontWeight: 700,
                color: textColor,
                lineHeight: 1.2,
                transition: "none",
              }}
            >
              {point.text}
            </div>

            {/* Strikethrough line */}
            {strikeProgress > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "52%",
                  left: "5%",
                  height: 6,
                  width: `${strikeProgress * 0.9}%`,
                  backgroundColor: COLORS.accent,
                  borderRadius: 3,
                }}
              />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
