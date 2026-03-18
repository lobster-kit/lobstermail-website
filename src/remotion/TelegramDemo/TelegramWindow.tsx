import { AbsoluteFill } from "remotion";
import { TG } from "./constants";
import { ChatHeader } from "./ChatHeader";

type TelegramWindowProps = {
  children: React.ReactNode;
};

/**
 * Telegram desktop chat window container (dark theme).
 * Full-frame — no sidebar, just header + scrollable message area.
 */
export const TelegramWindow: React.FC<TelegramWindowProps> = ({ children }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: TG.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader />

      {/* Message area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: 32,
          gap: 8,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
