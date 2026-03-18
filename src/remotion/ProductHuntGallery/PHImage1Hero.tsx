import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "./shared/Background";
import { COLORS, GLASS_CARD } from "./shared/styles";
import { FONT_HEADING, FONT_MONO } from "./shared/fonts";

// Inline SVG icons (Phosphor Robot & User, filled, matching website)
const RobotIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor">
    <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,120a12,12,0,1,1-12,12A12,12,0,0,1,172,120Zm-88,0a12,12,0,1,1-12,12A12,12,0,0,1,84,120Zm100,72H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z" />
  </svg>
);

const UserIcon: React.FC = () => (
  <svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor">
    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8C55.71,192.94,90.13,176,128,176s72.29,16.94,89.07,44a8,8,0,1,0,13.85-8Z" />
  </svg>
);

// Avatar component matching website's AgentAvatar/HumanAvatar
const Avatar: React.FC<{
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
}> = ({ icon, label, color, bgColor }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: 9,
        fontWeight: 600,
        textTransform: "uppercase" as const,
        letterSpacing: 0.8,
        color: color,
        opacity: 0.6,
      }}
    >
      {label}
    </span>
  </div>
);

export const PHImage1Hero: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "60px 100px",
          gap: 40,
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <Img
            src={staticFile("lobster-logo-800.png")}
            style={{
              width: 172,
              filter: "drop-shadow(0 0 20px rgba(251, 87, 5, 0.25))",
            }}
          />
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 700,
              fontSize: 65,
              lineHeight: 1.1,
              color: COLORS.textPrimary,
              margin: 0,
            }}
          >
            Email infrastructure
            <br />
            for AI agents
          </h1>
          <p
            style={{
              fontFamily: FONT_HEADING,
              fontWeight: 400,
              fontSize: 26,
              lineHeight: 1.5,
              color: COLORS.textSecondary,
              margin: 0,
            }}
          >
            One API call. Own inbox.
            <br />
            No human setup.
          </p>
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              fontWeight: 500,
              color: COLORS.accent,
            }}
          >
            lobstermail.ai
          </span>
        </div>

        {/* Right column — chat card (matches website CodeSnippet.tsx) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {/* Outer glass card */}
          <div
            style={{
              ...GLASS_CARD,
              padding: "24px 28px",
              width: "100%",
              maxWidth: 520,
            }}
          >
            {/* Inner dark container (bg-glass-strong-bg) */}
            <div
              style={{
                backgroundColor: "#000000",
                borderRadius: 12,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 35,
              }}
            >
              {/* Message 1: Agent says it needs an email */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <Avatar
                  icon={<RobotIcon />}
                  label="Agent"
                  color={COLORS.accent}
                  bgColor="rgba(251, 87, 5, 0.2)"
                />
                <div
                  style={{
                    backgroundColor: "rgba(251, 87, 5, 0.08)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "10px 16px",
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: COLORS.textPrimary,
                  }}
                >
                  I need an email address to continue, but I don&apos;t have
                  one.
                </div>
              </div>

              {/* Message 2: Human gives the setup link */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.10)",
                      borderRadius: "16px 4px 16px 16px",
                      padding: "10px 16px",
                      fontFamily: FONT_MONO,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: COLORS.textPrimary,
                    }}
                  >
                    Here, use 🦞 LobsterMail:
                  </div>
                  <Avatar
                    icon={<UserIcon />}
                    label="You"
                    color={COLORS.textSecondary}
                    bgColor="rgba(154, 147, 142, 0.2)"
                  />
                </div>

                {/* CopySnippetBlock (matching website) */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: 12,
                    border: "2px solid #FB5705",
                    backgroundColor: "#0A0A0A",
                    boxShadow: "0 0 20px -4px rgba(251, 87, 5, 0.3)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "12px 18px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 14,
                        color: COLORS.accent,
                      }}
                    >
                      lobstermail.ai/skill
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 6,
                        border: "2px solid " + COLORS.accent,
                        backgroundColor: "rgba(251, 87, 5, 0.1)",
                        padding: "4px 10px",
                        fontFamily: FONT_MONO,
                        fontSize: 12,
                        color: COLORS.accent,
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                      >
                        <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                      </svg>
                      Copy
                    </span>
                  </div>
                </div>
              </div>

              {/* Message 3: Agent confirms */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <Avatar
                  icon={<RobotIcon />}
                  label="Agent"
                  color={COLORS.accent}
                  bgColor="rgba(251, 87, 5, 0.2)"
                />
                <div
                  style={{
                    backgroundColor: "rgba(251, 87, 5, 0.08)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "10px 16px",
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: COLORS.textPrimary,
                  }}
                >
                  <span>Done. I&apos;m now at </span>
                  <span
                    style={{
                      color: COLORS.accent,
                      fontWeight: 500,
                    }}
                  >
                    crustacean@lobstermail.ai
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
