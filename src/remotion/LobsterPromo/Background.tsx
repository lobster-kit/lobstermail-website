import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "./styles";

/**
 * Background — matches the LobsterMail website's dark canvas.
 * Uses CSS radial-gradient dot pattern (same technique as the site)
 * at 4x density (12px grid vs website's 48px).
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle grid pulse — breathes slightly over time
  const gridOpacity = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.6, 0.85]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Square grid lines — same technique as the website (two perpendicular linear-gradients) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(128, 187, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(128, 187, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: gridOpacity,
          maskImage: `linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)`,
          WebkitMaskImage: `linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)`,
        }}
      />

      {/* Radial accent glow — like the hero section on the website */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 40% at 50% 45%, rgba(251, 87, 5, 0.1), transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
