import * as path from "path"

import {
  IntegTest,
  IntegTestCaseStack,
  IntegTestCaseStackProps,
} from "@aws-cdk/integ-tests-alpha"
import { App } from "aws-cdk-lib"

import { StaticAstroSite } from "../lib"

class TestStack extends IntegTestCaseStack {
  constructor(scope: App, id: string, props?: IntegTestCaseStackProps) {
    super(scope, id, props)

    new StaticAstroSite(this, "Website", {
      staticDir: path.join(__dirname, "./fixtures/static/dist"),
    })
  }
}

const app = new App()
const testcase = new TestStack(app, "StaticWebsite")
new IntegTest(app, "IntegTest", {
  testCases: [testcase],
})
app.synth()
