import path from "path"

import { StaticAstroSite } from "@astrojs-aws/construct"
import { App, Stack, StackProps } from "aws-cdk-lib"

export default class AppStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    new StaticAstroSite(this, "AstroSite", {
      staticDir: path.join(__dirname, "../dist"),
    })
  }
}
