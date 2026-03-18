import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "./shared/Background";
import { COLORS, GLASS_CARD } from "./shared/styles";
import { FONT_HEADING } from "./shared/fonts";

const FeatureCard: React.FC<{
  imageSrc: string;
  title: string;
  description: string;
}> = ({ imageSrc, title, description }) => (
  <div
    style={{
      ...GLASS_CARD,
      borderRadius: 28,
      padding: "12px 28px 28px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
    }}
  >
    <Img
      src={staticFile(imageSrc)}
      style={{
        width: 236,
        height: 236,
        objectFit: "contain",
      }}
    />
    <h3
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: 700,
        fontSize: 24,
        color: COLORS.textPrimary,
        margin: 0,
        lineHeight: 1.2,
        textAlign: "center" as const,
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontFamily: FONT_HEADING,
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1.55,
        color: COLORS.textSecondary,
        margin: 0,
        textAlign: "center" as const,
      }}
    >
      {description}
    </p>
  </div>
);

export const PHImage3Features: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "50px 80px 80px",
        }}
      >
        <h2
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.textPrimary,
            margin: 0,
            textAlign: "center",
          }}
        >
          How it works
        </h2>

        <div
          style={{
            display: "flex",
            gap: 24,
            width: "100%",
          }}
        >
          <FeatureCard
            imageSrc="self signup.png"
            title="Agent self-signup"
            description="Your agent provisions its own inbox with one API call. No human config needed."
          />
          <FeatureCard
            imageSrc="security check.png"
            title="Prompt injection scanning"
            description="Every inbound email is scanned for prompt injection before it reaches your agent."
          />
          <FeatureCard
            imageSrc="reputation.png"
            title="Isolated reputation"
            description="Each agent gets its own IP and sending reputation. One bad agent can't spoil the rest."
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
