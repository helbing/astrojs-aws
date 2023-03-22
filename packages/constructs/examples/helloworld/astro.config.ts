import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import aws from "@astrojs-aws/adapter"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "server",
  adapter: aws(),
  integrations: [react(), tailwind()],
})
