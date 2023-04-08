// import * as path from "path"

import { IntegTest, IntegTestCaseStack } from "@aws-cdk/integ-tests-alpha"
import { App } from "aws-cdk-lib"
import { RequireApproval } from "aws-cdk-lib/cloud-assembly-schema"

// import { StaticAstroSite } from "../lib"

const app = new App()
const testCase = new IntegTestCaseStack(app, "IntegTestCaseStack", {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
})

// new StaticAstroSite(testCase, "TestStaticAstroSiteConstruct", {
//   staticDir: path.join(__dirname, "./fixures/static/dist"),
// })

new IntegTest(app, "IntegTest", {
  testCases: [testCase],
  cdkCommandOptions: {
    deploy: {
      args: {
        all: true,
        requireApproval: RequireApproval.NEVER,
        json: true,
      },
    },
    destroy: {
      args: { force: true },
    },
  },
})

app.synth()
