import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Uno from "unocss/vite";
import { extractorSvelte, presetUno } from "unocss";

export default defineConfig({
  plugins: [
    Uno({
      extractors: [extractorSvelte],
      presets: [presetUno()],
    }),
    sveltekit(),
  ],
});
