import { useCurrentFrame, interpolate } from "remotion";
import { TG } from "./constants";

type Segment = {
  text: string;
  bold?: boolean;
  color?: string;
  glow?: boolean;
};

type TypeWriterProps = {
  /** Plain text — use for simple messages */
  text?: string;
  /** Rich text segments — use for messages with bold/colored parts */
  segments?: readonly Segment[];
  /** Frame when typing starts */
  startFrame: number;
  /** 'char' = character-by-character (user), 'word' = word-by-word (bot) */
  mode: "char" | "word";
  /** Characters per second (char mode) or words per second (word mode) */
  speed?: number;
};

/**
 * Animated text reveal for chat messages.
 * - char mode: reveals character by character (for user messages)
 * - word mode: reveals word by word (for bot messages)
 */
export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  segments,
  startFrame,
  mode,
  speed,
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);

  // Build full text from segments or plain text
  const fullText = segments
    ? segments.map((s) => s.text).join("")
    : text || "";

  if (mode === "char") {
    // Character-by-character reveal
    const charsPerFrame = (speed || 60) / 30; // default 60 chars/sec at 30fps
    const visibleChars = Math.min(
      Math.floor(elapsed * charsPerFrame),
      fullText.length
    );
    const visibleText = fullText.slice(0, visibleChars);

    return (
      <span>
        {visibleText}
        {visibleChars < fullText.length && (
          <span
            style={{
              opacity: Math.sin(frame * 0.4) > 0 ? 1 : 0,
              color: TG.timestamp,
            }}
          >
            |
          </span>
        )}
      </span>
    );
  }

  // Word-by-word reveal (for segments)
  if (segments) {
    const wordsPerFrame = (speed || 12) / 30; // default 12 words/sec at 30fps
    const totalWordsToShow = Math.floor(elapsed * wordsPerFrame);

    let wordCount = 0;

    return (
      <>
        {segments.map((segment, si) => {
          // Split segment into words (preserving newlines)
          const parts = segment.text.split(/(\s+)/);
          const renderedParts: React.ReactNode[] = [];

          for (let pi = 0; pi < parts.length; pi++) {
            const part = parts[pi];
            // Whitespace doesn't count as a word but follows the previous word
            if (/^\s+$/.test(part)) {
              if (wordCount <= totalWordsToShow) {
                renderedParts.push(part);
              }
              continue;
            }
            wordCount++;
            if (wordCount <= totalWordsToShow) {
              renderedParts.push(part);
            }
          }

          if (renderedParts.length === 0) return null;

          const glowIntensity =
            segment.glow
              ? Math.sin((frame - startFrame) * 0.15) * 0.3 + 0.7
              : 0;

          return (
            <span
              key={si}
              style={{
                fontWeight: segment.bold ? 700 : undefined,
                color: segment.color || undefined,
                textShadow: segment.glow
                  ? `0 0 ${8 * glowIntensity}px ${segment.color || TG.emailHighlight}, 0 0 ${20 * glowIntensity}px rgba(92, 160, 211, 0.3)`
                  : undefined,
              }}
            >
              {renderedParts.join("")}
            </span>
          );
        })}
      </>
    );
  }

  // Word-by-word for plain text
  const words = fullText.split(/(\s+)/);
  const wordsPerFrame = (speed || 12) / 30;
  const totalWordsToShow = Math.floor(elapsed * wordsPerFrame);
  let wordCount = 0;
  const visible: string[] = [];

  for (const part of words) {
    if (/^\s+$/.test(part)) {
      if (wordCount <= totalWordsToShow) visible.push(part);
      continue;
    }
    wordCount++;
    if (wordCount <= totalWordsToShow) visible.push(part);
  }

  return <span>{visible.join("")}</span>;
};
