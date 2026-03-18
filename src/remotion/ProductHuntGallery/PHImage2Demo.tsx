import { AbsoluteFill } from "remotion";
import { TelegramDemo } from "../TelegramDemo";
import { COLORS } from "./shared/styles";
import { FONT_MONO } from "./shared/fonts";

export const PHImage2Demo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* Browser chrome frame */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 40,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            flexShrink: 0,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: "flex", gap: 7 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FF5F57",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#FEBC2E",
                opacity: 0.85,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#28C840",
                opacity: 0.85,
              }}
            />
          </div>

          {/* URL bar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 8,
                padding: "4px 20px",
                fontFamily: FONT_MONO,
                fontSize: 12,
                color: COLORS.textMuted,
              }}
            >
              web.telegram.org
            </div>
          </div>

          {/* Spacer to balance traffic lights */}
          <div style={{ width: 55 }} />
        </div>

        {/* Content area — renders TelegramDemo */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <TelegramDemo />
        </div>
      </div>
    </AbsoluteFill>
  );
};
