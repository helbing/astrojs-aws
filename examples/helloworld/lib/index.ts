import path from "path"

import { LambdaAstroSite } from "@astrojs-aws/constructs"
import { Stack, StackProps } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { Construct } from "constructs"

export default class ExampleStack extends Stack {
  public readonly site: LambdaAstroSite

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    this.site = new LambdaAstroSite(this, "AstroSite", {
      serverEntry: path.join(__dirname, "../dist/server/entry.mjs"),
      client: path.join(__dirname, "../dist/client/"),
    })
  }
}
