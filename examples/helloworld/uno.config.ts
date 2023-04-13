import { defineConfig } from "@unocss/vite"
import { presetAttributify, presetIcons, presetUno } from "unocss"

export default defineConfig({
  presets: [presetAttributify(), presetIcons(), presetUno()],
})
