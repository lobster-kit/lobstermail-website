import { AbsoluteFill } from "remotion";
import { COLORS } from "./styles";

export const Background: React.FC = () => {
  // Subtle grid pattern like the website
  const gridSize = 40;
  const lines: React.ReactNode[] = [];

  for (let x = 0; x <= 1080; x += gridSize) {
    lines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={1920}
        stroke={COLORS.gridLine}
        strokeWidth={1}
      />
    );
  }
  for (let y = 0; y <= 1920; y += gridSize) {
    lines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={1080}
        y2={y}
        stroke={COLORS.gridLine}
        strokeWidth={1}
      />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.5 }}
      >
        {lines}
      </svg>
    </AbsoluteFill>
  );
};
