import { useCurrentFrame } from "remotion";
import { Img, staticFile } from "remotion";
import { TG, FONT, LAYOUT } from "./constants";

/**
 * Telegram-style typing indicator: avatar + bubble with three bouncing dots
 */
export const TypingIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        paddingLeft: LAYOUT.sidePadding,
        paddingRight: LAYOUT.sidePadding,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: LAYOUT.avatarSize,
          height: LAYOUT.avatarSize,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: TG.incomingBubble,
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile("video/clawdia-avatar.png")}
          style={{
            width: LAYOUT.avatarSize,
            height: LAYOUT.avatarSize,
            objectFit: "cover",
          }}
        />
      </div>

      {/* Typing bubble */}
      <div
        style={{
          backgroundColor: TG.incomingBubble,
          borderRadius: LAYOUT.bubbleRadius,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => {
          const bounce = Math.sin((frame - i * 4.5) * 0.3) * 3;
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: TG.typingDots,
                transform: `translateY(${Math.min(0, bounce)}px)`,
                opacity: 0.6 + Math.max(0, -bounce / 3) * 0.4,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
