import {
  AbsoluteFill,
  Img,
  staticFile,
  Sequence,
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

const ValuePropCard: React.FC<{
  image: string;
  headline: string;
  subtext: string;
}> = ({ image, headline, subtext }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const y = interpolate(entrance, [0, 1], [200, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      <Img
        src={staticFile(image)}
        style={{
          width: 380,
          height: 380,
          imageRendering: "pixelated",
          marginBottom: 40,
        }}
      />

      <div
        style={{
          textAlign: "center",
          padding: "0 70px",
        }}
      >
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.textPrimary,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: loraFamily,
            fontSize: 38,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.4,
          }}
        >
          {subtext}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene4ValueProps: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Value Prop 1: Zero human signup (0-75 frames / 0-2.5s) */}
      <Sequence from={0} durationInFrames={75} premountFor={fps}>
        <ValuePropCard
          image="video/lobster-self-signup.png"
          headline="Zero human signup."
          subtext="Your agent hatches its own inbox. No API keys. No config."
        />
      </Sequence>

      {/* Value Prop 2: Prompt injection security (75-150 frames / 2.5-5s) */}
      <Sequence from={75} durationInFrames={75} premountFor={fps}>
        <ValuePropCard
          image="video/lobster-security-shield.png"
          headline="Built-in prompt injection security."
          subtext="6-layer threat detection. Every email scanned."
        />
      </Sequence>
    </AbsoluteFill>
  );
};
