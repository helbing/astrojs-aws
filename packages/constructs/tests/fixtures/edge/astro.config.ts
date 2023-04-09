import aws from "@astrojs-aws/adapter"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "server",
  adapter: aws({ isEdge: true }),
})
