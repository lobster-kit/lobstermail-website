import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { TelegramWindow } from "./TelegramWindow";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { TypeWriter } from "./TypeWriter";
import { EndCard } from "./EndCard";
import { SCENES, MESSAGES } from "./constants";

/**
 * TelegramDemo — 15s (450 frames at 30fps), 1280x720
 *
 * Fake Telegram conversation showing Clawdia self-signing up for email.
 * Scene breakdown:
 *   1. Bot problem (0–3.5s)     — "I don't have an email address"
 *   2. User solution (3.5–5.5s) — "use lobstermail.ai/skill"
 *   3. Typing (5.5–6.5s)        — Clawdia typing...
 *   4. Bot signup (6.5–11s)     — "Done. clawdia@lobstermail.ai"
 *   5. Typing + complete (11–13s) — "GitHub account created"
 *   6. End card (13–15s)        — Branded bumper
 */
export const TelegramDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // End card transition: fade from chat to end card
  const endCardFadeStart = SCENES.endCard.start;
  const endCardOpacity = interpolate(
    frame,
    [endCardFadeStart, endCardFadeStart + 9], // 0.3s fade
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const showEndCard = frame >= endCardFadeStart;

  // --- Scene visibility ---

  // Scene 1: Bot problem message (fade in over 0.3s, visible from frame 0)
  const msg1Opacity = interpolate(frame, [0, 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showMsg1 = frame >= 0;

  // Scene 2: User message (type-in starts at frame 105)
  const showMsg2 = frame >= SCENES.userSolution.start;

  // Scene 3: First typing indicator (frames 165–195)
  const showTyping1 =
    frame >= SCENES.typing1.start && frame < SCENES.typing1.end;

  // Scene 4: Bot signup response (appears at frame 195)
  const showMsg3 = frame >= SCENES.botSignup.start;

  // Scene 5a: Second typing indicator (frames 330–345)
  const showTyping2 =
    frame >= SCENES.typing2.start && frame < SCENES.typing2.end;

  // Scene 5b: Bot complete message (appears at frame 345)
  const showMsg4 = frame >= SCENES.botComplete.start;

  return (
    <AbsoluteFill>
      {/* Chat layer */}
      <TelegramWindow>
        {/* Scene 1: Bot problem */}
        {showMsg1 && (
          <div style={{ opacity: msg1Opacity }}>
            <MessageBubble sender="bot" timestamp="12:34">
              {MESSAGES[0].text}
            </MessageBubble>
          </div>
        )}

        {/* Scene 2: User solution (type-in) */}
        {showMsg2 && (
          <MessageBubble sender="user" timestamp="12:35">
            <TypeWriter
              text={MESSAGES[1].text}
              startFrame={SCENES.userSolution.start}
              mode="char"
              speed={60}
            />
          </MessageBubble>
        )}

        {/* Scene 3: Typing indicator */}
        {showTyping1 && <TypingIndicator />}

        {/* Scene 4: Bot signup response */}
        {showMsg3 && (
          <MessageBubble sender="bot" timestamp="12:35">
            <TypeWriter
              segments={MESSAGES[2].segments}
              startFrame={SCENES.botSignup.start}
              mode="word"
              speed={14}
            />
          </MessageBubble>
        )}

        {/* Scene 5a: Second typing indicator */}
        {showTyping2 && <TypingIndicator />}

        {/* Scene 5b: Bot complete */}
        {showMsg4 && (
          <MessageBubble sender="bot" showAvatar={false} timestamp="12:36">
            <TypeWriter
              text={MESSAGES[3].text}
              startFrame={SCENES.botComplete.start}
              mode="word"
              speed={14}
            />
          </MessageBubble>
        )}
      </TelegramWindow>

      {/* End card overlay */}
      {showEndCard && (
        <AbsoluteFill style={{ opacity: endCardOpacity }}>
          <EndCard />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
