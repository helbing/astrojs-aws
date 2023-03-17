import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { nodePolyfills } from "vite-plugin-node-polyfills"

export default defineConfig({
  build: {
    lib: {
      entry: ["./src/index.ts", "./src/exports.ts"],
      formats: ["es"],
    },
    outDir: "dist",
    minify: "terser",
    emptyOutDir: true,
  },
  plugins: [
    dts({ tsConfigFilePath: "tsconfig.build.json" }),
    nodePolyfills({ protocolImports: true }),
  ],
})
