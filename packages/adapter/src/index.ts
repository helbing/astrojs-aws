import { AstroIntegration } from "astro"

import { Options } from "./exports"

export default function createIntegration(args?: Options): AstroIntegration {
  return {
    name: "@astrojs-aws/adapter",
    hooks: {
      "astro:config:done": ({ config, setAdapter }) => {
        if (config.output != "server") {
          throw new Error(
            '[@astrojs-aws/adapter] `output: "server"` is required to use this adapter',
          )
        }

        setAdapter({
          name: "@astrojs-aws/adapter",
          serverEntrypoint: "@astrojs-aws/adapter/exports",
          exports: ["handler"],
          supportedAstroFeatures: {
            serverOutput: 'stable'
          },
          // Options
          args,
        })
      },
    },
  }
}
