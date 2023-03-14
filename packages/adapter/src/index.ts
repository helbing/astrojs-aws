import { Options } from "./exports"

import type { AstroIntegration } from "astro"

export default function createIntegration(args?: Options): AstroIntegration {
  return {
    name: "@astrojs-aws/adapter",
    hooks: {
      "astro:config:done": ({ config, setAdapter }) => {
        if (config.output != "server") {
          console.warn(
            '[@astrojs-aws/adapter] `output: "server"` is required to use this adapter',
          )
        }

        setAdapter({
          name: "@astrojs-aws/adapter",
          serverEntrypoint: "@astrojs-aws/adapter/exports.js",
          exports: ["handler"],
          // Options
          args,
        })
      },
    },
  }
}
