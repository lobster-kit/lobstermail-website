import { AbsoluteFill } from "remotion";
import { COLORS } from "./styles";

export const Background: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(rgba(128, 187, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 187, 255, 0.12) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        opacity: 0.6,
        maskImage: `linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.3) 100%)`,
        WebkitMaskImage: `linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.3) 100%)`,
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
);
