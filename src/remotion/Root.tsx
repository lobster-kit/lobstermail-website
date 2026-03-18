import { Composition } from "remotion";
import { LobsterPromo } from "./LobsterPromo";
import {
  PHImage1Hero,
  PHImage2Demo,
  PHImage3Features,
  PHImage4Code,
} from "./ProductHuntGallery";
import { TwitterBanner } from "./ProductHuntGallery/TwitterBanner";
import { TwitterPromo } from "./ProductHuntGallery/TwitterPromo";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="LobsterMailPromo"
        component={LobsterPromo}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PHImage1Hero"
        component={PHImage1Hero}
        durationInFrames={1}
        fps={30}
        width={1270}
        height={760}
      />
      <Composition
        id="PHImage2Demo"
        component={PHImage2Demo}
        durationInFrames={450}
        fps={30}
        width={1270}
        height={760}
      />
      <Composition
        id="PHImage3Features"
        component={PHImage3Features}
        durationInFrames={1}
        fps={30}
        width={1270}
        height={760}
      />
      <Composition
        id="PHImage4Code"
        component={PHImage4Code}
        durationInFrames={1}
        fps={30}
        width={1270}
        height={760}
      />
      <Composition
        id="TwitterBanner"
        component={TwitterBanner}
        durationInFrames={1}
        fps={30}
        width={1500}
        height={500}
      />
      <Composition
        id="TwitterPromo"
        component={TwitterPromo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
