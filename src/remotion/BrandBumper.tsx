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

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const COLORS = {
  bg: "#0C0A09",
  textPrimary: "#ffffff",
  textSecondary: "#a3a3a3",
  accent: "#FB5705",
  gridLine: "rgba(128, 187, 255, 0.15)",
  glassShadow: "0 17px 35px 0 rgba(0, 80, 171, 0.15)",
  accentGlow: "rgba(251, 87, 5, 0.15)",
};

/**
 * BrandBumper — 4s (120 frames at 30fps), 1280x720
 *
 * Short brand sting: canvas grid bg → logo bounce → tagline → subtitle → hold.
 * Matches the lobstermail.ai hero section visual style.
 */
export const BrandBumper: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Background grid breathing ---
  const gridOpacity = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.6, 0.85]
  );

  // --- Logo entrance: fade in from bottom (frames 5–30) ---
  const logoEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 70 },
  });
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);
  const logoSlideY = interpolate(logoEntrance, [0, 1], [60, 0]);

  // --- Logo idle float: gentle up/down bob after entrance settles ---
  const floatY = frame > 30 ? Math.sin((frame - 30) * 0.08) * 5 : 0;

  // --- Tagline entrance (frames 28–45) ---
  const taglineOpacity = interpolate(frame, [28, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [28, 40], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Subtitle entrance (frames 40–55) ---
  const subtitleOpacity = interpolate(frame, [40, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [40, 52], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Banner entrance: slide down from top (frames 50–65) ---
  const bannerOpacity = interpolate(frame, [50, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bannerY = interpolate(frame, [50, 60], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Banner shimmer sweep (starts after banner is visible) ---
  const shimmerX = interpolate(frame, [65, 95], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Subtle glow pulse (after everything appears) ---
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  // --- Slow shadow flicker (matches the gentle float bob rhythm) ---
  const flicker =
    Math.sin(frame * 0.08) * 0.2 +
    Math.sin(frame * 0.05) * 0.1 +
    0.7; // range ≈ 0.4–1.0

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Canvas square grid (matches website) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.gridLine} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: gridOpacity,
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)",
        }}
      />

      {/* Radial orange glow (hero section style) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 50% at 50% 40%, rgba(251, 87, 5, ${0.08 * glowPulse}), transparent 70%)`,
        }}
      />

      {/* Orange launch banner (matches website) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          opacity: bannerOpacity,
          transform: `translateY(${bannerY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.accent,
            padding: "10px 24px",
            textAlign: "center",
            fontFamily,
            fontSize: 18,
            fontWeight: 700,
            color: "#000000",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer sweep */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)`,
              transform: `translateX(${shimmerX}%)`,
            }}
          />
          <span style={{ position: "relative" }}>
            First 1,000 agents get Builder plan 3 months free
          </span>
        </div>
      </div>

      {/* Content stack */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            maxWidth: 900,
            padding: "0 40px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoSlideY + floatY}px)`,
              marginBottom: 20,
              filter: `drop-shadow(0 17px 35px rgba(0, 80, 171, 0.15)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))`,
            }}
          >
            <Img
              src={staticFile("lobstermail-logo-big.png")}
              style={{
                width: 300,
                height: "auto",
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
              marginBottom: 15,
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 70,
                fontWeight: 700,
                color: COLORS.textPrimary,
                textAlign: "center",
                lineHeight: 1.15,
                textShadow: `0 2px 12px rgba(0, 0, 0, 0.5), 0 0 ${30 * flicker}px rgba(251, 87, 5, ${0.45 * flicker}), 0 0 ${60 * flicker}px rgba(251, 87, 5, ${0.2 * flicker})`,
              }}
            >
              Instant email for
              <br />
              your agent.
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
            }}
          >
            <div
              style={{
                fontFamily,
                fontSize: 28,
                fontWeight: 400,
                color: COLORS.textSecondary,
                textAlign: "center",
                lineHeight: 1.5,
                textShadow: `0 2px 8px rgba(0, 0, 0, 0.4), 0 0 ${20 * flicker}px rgba(251, 87, 5, ${0.3 * flicker}), 0 0 ${40 * flicker}px rgba(251, 87, 5, ${0.12 * flicker})`,
              }}
            >
              No API keys. No human signup. Your agent pinches
              <br />
              its own email.
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
