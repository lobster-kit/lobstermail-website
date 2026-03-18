import { Img, staticFile } from "remotion";
import { TG, FONT, LAYOUT } from "./constants";

/**
 * Telegram-style chat header: avatar + "Clawdia" + "bot" badge + green dot
 */
export const ChatHeader: React.FC = () => {
  return (
    <div
      style={{
        height: LAYOUT.headerHeight,
        backgroundColor: TG.headerBg,
        borderBottom: `1px solid ${TG.headerBorder}`,
        display: "flex",
        alignItems: "center",
        padding: `0 ${LAYOUT.sidePadding}px`,
        gap: 12,
        flexShrink: 0,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: TG.incomingBubble,
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile("video/clawdia-avatar.png")}
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
          }}
        />
      </div>

      {/* Name + subtitle */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontFamily: FONT.family,
              fontSize: FONT.sizeName,
              fontWeight: 600,
              color: TG.text,
            }}
          >
            Clawdia
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: TG.onlineDot,
            }}
          />
          <span
            style={{
              fontFamily: FONT.family,
              fontSize: FONT.sizeBadge,
              color: TG.timestamp,
            }}
          >
            bot
          </span>
        </div>
      </div>
    </div>
  );
};
