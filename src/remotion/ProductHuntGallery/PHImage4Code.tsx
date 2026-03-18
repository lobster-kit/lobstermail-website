import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "./shared/Background";
import { COLORS, GLASS_CARD } from "./shared/styles";
import { FONT_HEADING, FONT_MONO } from "./shared/fonts";

// Use case row component — pixel-art lobster image + text + email preview
const UseCaseRow: React.FC<{
  imageSrc: string;
  title: string;
  description: string;
  emailFrom: string;
  emailSubject: string;
}> = ({ imageSrc, title, description, emailFrom, emailSubject }) => (
  <div
    style={{
      ...GLASS_CARD,
      borderRadius: 20,
      padding: "12px 24px 12px 12px",
      display: "flex",
      alignItems: "center",
      gap: 16,
    }}
  >
    {/* Lobster image */}
    <Img
      src={staticFile(imageSrc)}
      style={{
        width: 90,
        height: 90,
        objectFit: "contain",
        flexShrink: 0,
      }}
    />

    {/* Text */}
    <div
      style={{
        flex: "0 0 38%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <h3
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 700,
          fontSize: 20,
          color: COLORS.textPrimary,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_HEADING,
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.5,
          color: COLORS.textSecondary,
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>

    {/* Right: mini email preview */}
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          From:
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: COLORS.textSecondary,
          }}
        >
          {emailFrom}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 11,
            color: COLORS.textMuted,
          }}
        >
          Subject:
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: 12,
            fontWeight: 500,
            color: COLORS.textPrimary,
          }}
        >
          {emailSubject}
        </span>
      </div>
    </div>
  </div>
);

export const PHImage4Code: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "50px 80px",
        }}
      >
        {/* Title */}
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
          What agents do with email
        </h2>

        {/* Use case rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
          }}
        >
          <UseCaseRow
            imageSrc="email for open claw.png"
            title="Email for OpenClaw"
            description="Install the skill. Every agent provisions its own inbox — no config, no OAuth."
            emailFrom="clawdia@lobstermail.ai"
            emailSubject="Your order has shipped"
          />
          <UseCaseRow
            imageSrc="customer support.png"
            title="Customer support autopilot"
            description="Your agent triages tickets, drafts replies, and escalates — all from its own address."
            emailFrom="support@acme.ai"
            emailSubject="Re: Where's my order?"
          />
          <UseCaseRow
            imageSrc="self signup data.png"
            title="Signups & verification"
            description="Agents sign up for services, receive verification codes, and complete onboarding by email."
            emailFrom="noreply@stripe.com"
            emailSubject="Verify your email address"
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
