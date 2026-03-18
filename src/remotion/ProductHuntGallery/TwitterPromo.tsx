import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { FONT_HEADING, FONT_MONO } from "./shared/fonts";

// Match website exactly: globals.css dark theme values
const C = {
  bg: "#0C0A09",
  foreground: "#FAFAF9",
  secondary: "#9A938E",
  muted: "#737373",
  accent: "#FB5705",
  edgeStrong: "rgba(128, 187, 255, 0.25)",
  dotPattern: "rgba(128, 187, 255, 0.15)",
} as const;

// Website .glass class: border-radius 50px, border 3px, bg same as page
const GLASS = {
  backgroundColor: C.bg,
  border: `3px solid ${C.edgeStrong}`,
  borderRadius: 50,
  boxShadow: "0 17px 35px 0 rgba(0, 80, 171, 0.15)",
} as const;

const SPRING_CONFIG = { damping: 20, stiffness: 80 };
const TRANSITION_FRAMES = 15;
const CONTENT_SCALE = 0.7;

function useFadeSlide(delay: number, direction: "up" | "right" = "up") {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: SPRING_CONFIG,
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const translate =
    direction === "up"
      ? `translateY(${interpolate(s, [0, 1], [20, 0])}px)`
      : `translateX(${interpolate(s, [0, 1], [20, 0])}px)`;
  return { opacity, transform: translate };
}

// Website-matching background
const WebsiteBackground: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${C.dotPattern} 1px, transparent 1px), linear-gradient(90deg, ${C.dotPattern} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage: `linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)`,
        WebkitMaskImage: `linear-gradient(90deg, rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.375) 100%)`,
      }}
    />
  </AbsoluteFill>
);

// ---------------------------------------------------------------------------
// Scene 1: Launch + Offer (combined)
// ---------------------------------------------------------------------------
const Scene1LaunchOffer: React.FC = () => {
  const lobster = useFadeSlide(0);
  const headline = useFadeSlide(10);
  const offer = useFadeSlide(24);
  const sub = useFadeSlide(36);
  const value = useFadeSlide(46);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          transform: `scale(${CONTENT_SCALE})`,
        }}
      >
        {/* Lobster */}
        <div style={lobster}>
          <Img
            src={staticFile("video/lobster-celebrating.png")}
            style={{
              width: 240,
              height: 240,
              imageRendering: "pixelated",
            }}
          />
        </div>

        {/* Text stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={headline}>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 52,
                fontWeight: 700,
                color: C.foreground,
                lineHeight: 1.1,
                textAlign: "center",
              }}
            >
              LobsterMail is live
            </div>
          </div>
          <div style={offer}>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 44,
                fontWeight: 700,
                color: C.accent,
                lineHeight: 1.1,
                textAlign: "center",
              }}
            >
              3 months free
            </div>
          </div>
          <div style={sub}>
            <div
              style={{
                fontFamily: FONT_HEADING,
                fontSize: 26,
                fontWeight: 400,
                color: C.secondary,
                lineHeight: 1.4,
                textAlign: "center",
              }}
            >
              for the first 1,000 agents
            </div>
          </div>
          <div style={value}>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                fontWeight: 400,
                color: C.muted,
                textAlign: "center",
              }}
            >
              Builder plan · $9/mo value
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene 2: Features
// ---------------------------------------------------------------------------
const FEATURES = [
  "10 inboxes",
  "500 emails / day",
  "5,000 emails / month",
  "Custom domains",
];

const Scene2Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Delay all animations past the transition overlap
  const d = TRANSITION_FRAMES;
  const title = useFadeSlide(d);
  const cardFade = useFadeSlide(d + 5);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${CONTENT_SCALE})`,
        }}
      >
        {/* Title */}
        <div style={title}>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 38,
              fontWeight: 700,
              color: C.foreground,
              textAlign: "center",
            }}
          >
            Builder plan includes
          </div>
        </div>

        {/* Features card */}
        <div
          style={{
            ...GLASS,
            padding: "40px 64px",
            ...cardFade,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            minWidth: 480,
          }}
        >
          {FEATURES.map((feature, i) => {
            const delay = d + 12 + i * 10;
            const s = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: SPRING_CONFIG,
            });
            const opacity = interpolate(s, [0, 1], [0, 1]);
            const tx = interpolate(s, [0, 1], [20, 0]);

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${tx}px)`,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 26,
                    color: C.accent,
                    fontWeight: 500,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: FONT_HEADING,
                    fontSize: 30,
                    fontWeight: 400,
                    color: C.foreground,
                  }}
                >
                  {feature}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Scene 3: CTA
// ---------------------------------------------------------------------------
const Scene3CTA: React.FC = () => {
  const d = TRANSITION_FRAMES;
  const logo = useFadeSlide(d);
  const prompt = useFadeSlide(d + 10);
  const url = useFadeSlide(d + 22);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${CONTENT_SCALE})`,
        }}
      >
        {/* Logo */}
        <div style={logo}>
          <Img
            src={staticFile("lobster-logo-800.png")}
            style={{ width: 80, height: 80 }}
          />
        </div>

        {/* Prompt */}
        <div style={prompt}>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 32,
              fontWeight: 400,
              color: C.secondary,
              textAlign: "center",
            }}
          >
            Tell your agent to get started
          </div>
        </div>

        {/* URL */}
        <div style={url}>
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 48,
              fontWeight: 700,
              color: C.foreground,
              textAlign: "center",
            }}
          >
            lobstermail<span style={{ color: C.accent }}>.ai</span>/skill
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Main composition
// ---------------------------------------------------------------------------
export const TwitterPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      <WebsiteBackground />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={170}>
          <Scene1LaunchOffer />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={160}>
          <Scene2Features />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene3CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
