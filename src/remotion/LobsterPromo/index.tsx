import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Background } from "./Background";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Pain } from "./Scene2Pain";
import { Scene3Freedom } from "./Scene3Freedom";
import { Scene4ValueProps } from "./Scene4ValueProps";
import { Scene5CTA } from "./Scene5CTA";

export const LobsterPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Persistent dark grid background */}
      <Background />

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Hook — "Your agent needs email." (3s) */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        {/* Hard cut to pain points */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />

        {/* Scene 2: Pain points (3s) */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene2Pain />
        </TransitionSeries.Sequence>

        {/* Slide up from bottom — liberation energy */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 3: Freedom (3s) */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene3Freedom />
        </TransitionSeries.Sequence>

        {/* Fade to value props */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 15 })}
        />

        {/* Scene 4: Value Props (5s) */}
        <TransitionSeries.Sequence durationInFrames={160}>
          <Scene4ValueProps />
        </TransitionSeries.Sequence>

        {/* Fade to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 5: CTA (4s) */}
        <TransitionSeries.Sequence durationInFrames={125}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
