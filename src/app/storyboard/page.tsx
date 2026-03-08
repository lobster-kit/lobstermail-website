import Image from "next/image";

const scenes = [
  {
    id: 1,
    title: "HOOK: PROBLEM",
    time: "0–1.5s",
    frames: "0–44",
    images: [
      { src: "/video/lobster-in-cage-v2.png", w: 160, h: 160, label: "" },
    ],
    copy: '"Your agent needs email."',
    animation:
      "Cage drops in from top with spring bounce + shake. Text fades in below. Cage rattles with frustration.",
    transition: "→ Cage fades out",
    accentColor: "#FB5705",
  },
  {
    id: 2,
    title: "HOOK: BREAK FREE",
    time: "1.5–3s",
    frames: "44–90",
    images: [
      { src: "/lobster-out-of-cage.png", w: 180, h: 110, label: "" },
    ],
    copy: '"Not anymore."',
    animation:
      "Lobster smashes up from bottom with spring. Text scales up in accent orange. Orange burst outro bridges to next scene.",
    transition: "→ Orange burst / Fade (18 frames)",
    accentColor: "#FB5705",
  },
  {
    id: 3,
    title: "TAGLINE",
    time: "3–5s",
    frames: "90–150",
    images: null,
    copy: '"Instant email for your agent."',
    animation:
      "Logo scales in with spring. Tagline fades up below. Subtle orange radial glow behind text.",
    transition: "→ Slide from right (12 frames)",
    accentColor: "#FB5705",
  },
  {
    id: 4,
    title: "VALUE: SELF-SIGNUP",
    time: "5–9s",
    frames: "150–270",
    images: [
      { src: "/video/lobster-self-signup.png", w: 160, h: 160, label: "" },
    ],
    copy: '"Zero human signup." + "Your agent hatches its own inbox. No API keys. No config."',
    animation:
      "Lobster + glassmorphic card slide up together with spring. Orange glow behind the card.",
    transition: "→ Fade (12 frames)",
    accentColor: "#FB5705",
  },
  {
    id: 5,
    title: "VALUE: SECURITY",
    time: "9–13s",
    frames: "270–390",
    images: [
      {
        src: "/video/lobster-security-shield.png",
        w: 160,
        h: 160,
        label: "",
      },
    ],
    copy: '"Built-in prompt injection security." + "6-layer threat detection. Every email scanned."',
    animation:
      "Same entrance pattern. Shield lobster center stage. Glassmorphic card with blue-tinted border.",
    transition: "→ Fade (12 frames)",
    accentColor: "#FB5705",
  },
  {
    id: 6,
    title: "CTA",
    time: "13–18s",
    frames: "390–540",
    images: [
      { src: "/video/lobster-celebrating.png", w: 160, h: 160, label: "" },
    ],
    copy: '"lobstermail.ai" + "Hatch an inbox →"',
    animation:
      'Celebrating lobster scales in. URL appears with orange glow pulse. CTA badge springs in as glassmorphic button with orange border.',
    transition: "END",
    accentColor: "#FB5705",
  },
];

const DESIGN = {
  bg: "#0C0A09",
  surface: "rgba(255, 255, 255, 0.04)",
  surfaceHover: "rgba(255, 255, 255, 0.08)",
  accent: "#FB5705",
  accentGlow: "rgba(251, 87, 5, 0.15)",
  accentGlowSubtle: "rgba(251, 87, 5, 0.06)",
  edgeStrong: "rgba(128, 187, 255, 0.25)",
  edgeMedium: "rgba(128, 187, 255, 0.15)",
  edgeSubtle: "rgba(128, 187, 255, 0.08)",
  textPrimary: "#f5f5f5",
  textSecondary: "#a3a3a3",
  textMuted: "#737373",
  glassShadow: "0 17px 35px 0 rgba(0, 80, 171, 0.15)",
  orangeShadow: "0 4px 8px 3px rgba(251, 87, 5, 0.15)",
};

export default function StoryboardPage() {
  return (
    <div
      style={{
        backgroundColor: DESIGN.bg,
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
      }}
    >
      {/* 4x dense grid background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(128, 187, 255, 0.12) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          opacity: 0.6,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Edge fade mask */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, #0C0A09 85%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <h1
              style={{
                color: DESIGN.accent,
                fontSize: "32px",
                fontWeight: 700,
                margin: 0,
              }}
            >
              LobsterMail Promo
            </h1>
            <span
              style={{
                color: DESIGN.textMuted,
                fontSize: "14px",
                backgroundColor: DESIGN.surface,
                border: `1px solid ${DESIGN.edgeSubtle}`,
                borderRadius: "50px",
                padding: "4px 14px",
              }}
            >
              Storyboard v2
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "1080 x 1920",
              "18 seconds",
              "30 fps",
              "6 scenes",
              "Value-forward",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  color: DESIGN.textSecondary,
                  fontSize: "13px",
                  backgroundColor: DESIGN.surface,
                  border: `1px solid ${DESIGN.edgeSubtle}`,
                  borderRadius: "50px",
                  padding: "4px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scene timeline bar */}
        <div
          style={{
            display: "flex",
            marginBottom: "32px",
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${DESIGN.edgeMedium}`,
            backgroundColor: DESIGN.surface,
          }}
        >
          {scenes.map((scene, i) => {
            const widths = [8.3, 8.4, 11.1, 22.2, 22.2, 27.8]; // proportional to duration
            return (
              <div
                key={scene.id}
                style={{
                  flex: `0 0 ${widths[i]}%`,
                  padding: "10px 12px",
                  borderRight:
                    i < scenes.length - 1
                      ? `1px solid ${DESIGN.edgeMedium}`
                      : "none",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    color: DESIGN.accent,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  {scene.title}
                </div>
                <div style={{ color: DESIGN.textMuted, fontSize: "10px" }}>
                  {scene.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scene cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            paddingBottom: "80px",
          }}
        >
          {scenes.map((scene) => (
            <div
              key={scene.id}
              style={{
                backgroundColor: DESIGN.surface,
                borderRadius: "16px",
                overflow: "hidden",
                border: `1px solid ${DESIGN.edgeMedium}`,
                boxShadow: DESIGN.glassShadow,
              }}
            >
              {/* Scene header */}
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderBottom: `1px solid ${DESIGN.edgeSubtle}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      color: DESIGN.bg,
                      backgroundColor: DESIGN.accent,
                      fontSize: "10px",
                      fontWeight: 800,
                      borderRadius: "50px",
                      padding: "2px 8px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {scene.id}
                  </span>
                  <span
                    style={{
                      color: DESIGN.accent,
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {scene.title}
                  </span>
                </div>
                <span style={{ color: DESIGN.textMuted, fontSize: "12px" }}>
                  {scene.time} ({scene.frames})
                </span>
              </div>

              {/* Preview area */}
              <div
                style={{
                  backgroundColor: DESIGN.bg,
                  height: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 4x dense grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, rgba(128, 187, 255, 0.12) 1px, transparent 1px)`,
                    backgroundSize: "12px 12px",
                    opacity: 0.5,
                  }}
                />

                {/* Radial accent glow */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at center, ${DESIGN.accentGlowSubtle}, transparent 70%)`,
                  }}
                />

                {/* Edge fade */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(ellipse at center, transparent 30%, ${DESIGN.bg} 90%)`,
                  }}
                />

                {scene.images ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      position: "relative",
                      zIndex: 1,
                      marginBottom: "16px",
                    }}
                  >
                    {scene.images.map((img, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${img.src}?v=${Date.now()}`}
                          alt={scene.title}
                          width={img.w}
                          height={img.h}
                          style={{
                            imageRendering: "pixelated",
                            objectFit: "contain",
                          }}
                        />
                        {img.label && (
                          <span
                            style={{
                              color: DESIGN.accent,
                              fontSize: "24px",
                              fontWeight: 700,
                            }}
                          >
                            {img.label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      marginBottom: "16px",
                      padding: "16px 24px",
                      borderRadius: "16px",
                      border: `1px solid ${DESIGN.edgeMedium}`,
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      boxShadow: DESIGN.orangeShadow,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: DESIGN.textPrimary,
                        fontFamily: "Georgia, serif",
                        textAlign: "center",
                      }}
                    >
                      lobstermail
                      <span style={{ color: DESIGN.accent }}>.ai</span>
                    </div>
                  </div>
                )}

                <p
                  style={{
                    color: DESIGN.textPrimary,
                    fontSize: "14px",
                    fontWeight: 700,
                    textAlign: "center",
                    fontFamily: "Georgia, serif",
                    position: "relative",
                    zIndex: 1,
                    margin: 0,
                  }}
                >
                  {scene.copy.split(" + ")[0]}
                </p>
              </div>

              {/* Details */}
              <div style={{ padding: "16px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      color: DESIGN.textMuted,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Copy
                  </div>
                  <div
                    style={{
                      color: DESIGN.textSecondary,
                      fontSize: "13px",
                      lineHeight: 1.5,
                    }}
                  >
                    {scene.copy}
                  </div>
                </div>

                <div style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      color: DESIGN.textMuted,
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      fontWeight: 600,
                    }}
                  >
                    Animation
                  </div>
                  <div
                    style={{
                      color: "rgba(128, 187, 255, 0.7)",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {scene.animation}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    borderTop: `1px solid ${DESIGN.edgeSubtle}`,
                    paddingTop: "10px",
                  }}
                >
                  <span
                    style={{
                      color: DESIGN.accent,
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {scene.transition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design notes footer */}
        <div
          style={{
            backgroundColor: DESIGN.surface,
            border: `1px solid ${DESIGN.edgeMedium}`,
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "40px",
            boxShadow: DESIGN.glassShadow,
          }}
        >
          <h2
            style={{
              color: DESIGN.accent,
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "16px",
              marginTop: 0,
            }}
          >
            Design System Notes
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {[
              {
                label: "Background",
                value: "#0C0A09 + 12px dot grid (4x website density)",
              },
              { label: "Accent", value: "#FB5705 with glow halos" },
              {
                label: "Edges",
                value: "Blue-tinted rgba(128,187,255,0.15)",
              },
              {
                label: "Glass cards",
                value: "50px radius, blue shadow, surface fill",
              },
              {
                label: "Typography",
                value: 'Lora (serif headings), "Geist Mono" (code)',
              },
              {
                label: "Grid fade",
                value: "Radial mask fading grid at edges",
              },
            ].map((note) => (
              <div key={note.label}>
                <div
                  style={{
                    color: DESIGN.textMuted,
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                    fontWeight: 600,
                  }}
                >
                  {note.label}
                </div>
                <div
                  style={{
                    color: DESIGN.textSecondary,
                    fontSize: "12px",
                    lineHeight: 1.4,
                  }}
                >
                  {note.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
