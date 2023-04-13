import * as path from "path"

import {
  IntegTest,
  IntegTestCaseStack,
  IntegTestCaseStackProps,
} from "@aws-cdk/integ-tests-alpha"
import { App } from "aws-cdk-lib"

import { EdgeAstroSite } from "../lib"

class TestStack extends IntegTestCaseStack {
  constructor(scope: App, id: string, props?: IntegTestCaseStackProps) {
    super(scope, id, props)

    new EdgeAstroSite(this, "Website", {
      serverEntry: path.join(
        __dirname,
        "./fixtures/edge/dist/server/entry.mjs",
      ),
      staticDir: path.join(__dirname, "./fixtures/edge/dist/client"),
    })
  }
}

const app = new App()
const testcase = new TestStack(app, "EdageWebsite")
new IntegTest(app, "IntegTest", {
  testCases: [testcase],
})
app.synth()
