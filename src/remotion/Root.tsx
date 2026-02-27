import { Composition } from "remotion";
import { LobsterPromo } from "./LobsterPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="LobsterMailPromo"
      component={LobsterPromo}
      durationInFrames={540}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
