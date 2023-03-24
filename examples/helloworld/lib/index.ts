import path from "path"

import { LambdaAstroSite } from "@astrojs-aws/constructs"
import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"

export default class ExampleStack extends Stack {
  public readonly site: LambdaAstroSite

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.site = new LambdaAstroSite(this, "AstroSite", {
      entry: path.join(__dirname, "../dist/server/entry.mjs"),
    })
  }
}
