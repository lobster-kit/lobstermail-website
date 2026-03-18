import { loadFont as loadLora } from "@remotion/google-fonts/Lora";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

const lora = loadLora("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = loadGeistMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const FONT_HEADING = lora.fontFamily;
export const FONT_MONO = geistMono.fontFamily;
