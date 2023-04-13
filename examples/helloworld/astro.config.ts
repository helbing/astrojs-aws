import react from "@astrojs/react"
import unocss from "@unocss/astro"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "static",
  integrations: [react(), unocss({})],
})
