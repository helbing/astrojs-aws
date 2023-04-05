import react from "@astrojs/react"
import aws from "@astrojs-aws/adapter"
import unocss from "@unocss/astro"
import { defineConfig } from "astro/config"
import { presetAttributify, presetIcons, presetUno } from "unocss"

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [
    react(),
    unocss({
      presets: [presetAttributify(), presetIcons(), presetUno()],
    }),
  ],
})
