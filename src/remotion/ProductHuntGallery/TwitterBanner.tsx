import { AbsoluteFill } from "remotion";
import { COLORS } from "./shared/styles";
import { FONT_HEADING, FONT_MONO } from "./shared/fonts";

export const TwitterBanner: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Custom background with stronger grid */}
      <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(128, 187, 255, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 187, 255, 0.18) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.85,
            maskImage: `linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, rgba(0,0,0,0.2) 100%)`,
            WebkitMaskImage: `linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.8) 90%, rgba(0,0,0,0.2) 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 50% at 50% 45%, rgba(251, 87, 5, 0.08), transparent 70%)`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0px 80px 0px 420px",
          gap: 12,
        }}
      >
        <h1
          style={{
            fontFamily: FONT_HEADING,
            fontWeight: 700,
            fontSize: 48,
            lineHeight: 1.15,
            color: COLORS.textPrimary,
            margin: 0,
          }}
        >
          Email infrastructure
          <br />
          for agents
        </h1>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: 16,
            lineHeight: 1.5,
            color: COLORS.textSecondary,
            margin: 0,
          }}
        >
          Tell your agent to get his email instantly at{" "}
          <span style={{ color: COLORS.accent, fontWeight: 500 }}>
            lobstermail.ai/skill
          </span>
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
