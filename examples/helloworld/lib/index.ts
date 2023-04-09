import path from "path"

import { StaticAstroSite } from "@astrojs-aws/constructs"
import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

export default class ExampleStack extends Stack {
  public readonly site: StaticAstroSite

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.site = new StaticAstroSite(this, "AstroSite", {
      staticDir: path.join(__dirname, "../dist"),
    })
  }
}
