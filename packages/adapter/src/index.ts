import { AstroAdapter, AstroIntegration } from "astro"

import { Options } from "./exports"

export const getAdapter = (args?: Options): AstroAdapter => ({
  name: "@astrojs-aws/adapter",
  serverEntrypoint: "@astrojs-aws/adapter/exports",
  exports: ["handler"],
  // Options
  args,
})

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

        setAdapter(getAdapter(args))
      },
    },
  }
}
