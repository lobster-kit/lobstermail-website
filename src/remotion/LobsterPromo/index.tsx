import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Background } from "./Background";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Tagline } from "./Scene2Tagline";
import { Scene3SelfSignup } from "./Scene3SelfSignup";
import { Scene4Security } from "./Scene4Security";
import { Scene5CTA } from "./Scene5CTA";

/**
 * LobsterMail Promo — 18s vertical (1080x1920) at 30fps
 *
 * New 5-scene value-forward structure:
 *   1. Hook (0-3s)     — Cage → break free, fast + punchy
 *   2. Tagline (3-5s)  — Logo + "Instant email for your agent."
 *   3. Self-signup (5-9s)  — Value prop: zero human signup
 *   4. Security (9-13s)    — Value prop: prompt injection security
 *   5. CTA (13-18s)        — lobstermail.ai + "Hatch an inbox →"
 */
export const LobsterPromo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Persistent dark grid background with 4x dense dot pattern */}
      <Background />

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Hook — cage → break free (3s) */}
        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        {/* Orange burst → tagline (longer overlap so the warm wash bridges both scenes) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        {/* Scene 2: Tagline — brand moment (2s) */}
        <TransitionSeries.Sequence durationInFrames={70}>
          <Scene2Tagline />
        </TransitionSeries.Sequence>

        {/* Slide from right — energy into value props */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 3: Self-signup value prop (4s) */}
        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene3SelfSignup />
        </TransitionSeries.Sequence>

        {/* Fade between value props */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 4: Security value prop (4s) */}
        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene4Security />
        </TransitionSeries.Sequence>

        {/* Fade to CTA */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 5: CTA — lobstermail.ai (5s) */}
        <TransitionSeries.Sequence durationInFrames={160}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
