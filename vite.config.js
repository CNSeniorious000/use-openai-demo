import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Uno from "unocss/vite";
import { extractorSvelte, presetUno, presetIcons, presetTypography } from "unocss";

export default defineConfig({
  plugins: [
    Uno({
      extractors: [extractorSvelte],
      presets: [presetIcons(), presetUno(), presetTypography()],
    }),
    sveltekit(),
  ],
});
