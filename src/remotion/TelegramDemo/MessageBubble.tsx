import { Img, staticFile } from "remotion";
import { TG, FONT, LAYOUT } from "./constants";

type MessageBubbleProps = {
  sender: "user" | "bot";
  children: React.ReactNode;
  showAvatar?: boolean;
  timestamp?: string;
};

/**
 * Telegram-style message bubble.
 * Bot messages: left-aligned, dark grey, with avatar.
 * User messages: right-aligned, blue, no avatar.
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  children,
  showAvatar = true,
  timestamp,
}) => {
  const isBot = sender === "bot";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
        paddingLeft: LAYOUT.sidePadding,
        paddingRight: LAYOUT.sidePadding,
        justifyContent: isBot ? "flex-start" : "flex-end",
      }}
    >
      {/* Bot avatar (left side) */}
      {isBot && showAvatar && (
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
      )}

      {/* Spacer when bot but no avatar shown (keeps alignment) */}
      {isBot && !showAvatar && (
        <div style={{ width: LAYOUT.avatarSize, flexShrink: 0 }} />
      )}

      {/* Bubble */}
      <div
        style={{
          backgroundColor: isBot ? TG.incomingBubble : TG.outgoingBubble,
          borderRadius: LAYOUT.bubbleRadius,
          padding: `${LAYOUT.bubblePadding}px ${LAYOUT.bubblePadding + 4}px`,
          maxWidth: LAYOUT.bubbleMaxWidth,
          position: "relative",
        }}
      >
        {/* Bot name */}
        {isBot && showAvatar && (
          <div
            style={{
              fontFamily: FONT.family,
              fontSize: FONT.sizeBadge,
              fontWeight: 600,
              color: TG.botBadge,
              marginBottom: 4,
            }}
          >
            Clawdia
          </div>
        )}

        {/* Message content */}
        <div
          style={{
            fontFamily: FONT.family,
            fontSize: FONT.sizeBody,
            color: TG.text,
            lineHeight: 1.45,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {children}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div
            style={{
              fontFamily: FONT.family,
              fontSize: FONT.sizeTimestamp,
              color: TG.timestamp,
              textAlign: "right",
              marginTop: 4,
            }}
          >
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};
