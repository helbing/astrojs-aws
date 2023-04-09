import react from "@astrojs/react"
import unocss from "@unocss/astro"
import { defineConfig } from "astro/config"
import { presetAttributify, presetIcons, presetUno } from "unocss"

export default defineConfig({
  output: "static",
  integrations: [
    react(),
    unocss({
      presets: [presetAttributify(), presetIcons(), presetUno()],
    }),
  ],
})
