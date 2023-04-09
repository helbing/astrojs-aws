import * as path from "path"

import {
  IntegTest,
  IntegTestCaseStack,
  IntegTestCaseStackProps,
} from "@aws-cdk/integ-tests-alpha"
import { App, CfnOutput } from "aws-cdk-lib"
import { RequireApproval } from "aws-cdk-lib/cloud-assembly-schema"
import { Pinger } from "cdk-http-pinger"

import { LambdaAstroSite, StaticAstroSite } from "../lib"

class TestStaticStack extends IntegTestCaseStack {
  constructor(scope: App, id: string, props?: IntegTestCaseStackProps) {
    super(scope, id, props)

    const site = new StaticAstroSite(this, "TestStaticAstroSiteConstruct", {
      staticDir: path.join(__dirname, "./fixtures/static/dist"),
    })

    const indexPinger = new Pinger(this, "Pinger root index.html", {
      url: `https://${site.domainName}`,
    })

    const routePinger = new Pinger(this, "Pinger route index.html", {
      url: `https://${site.domainName}/route`,
    })

    // the pinger must wait for the site to be deployed.
    indexPinger.node.addDependency(site)
    routePinger.node.addDependency(site)

    new CfnOutput(this, "IndexResponseSuccess", {
      value: indexPinger.httpStatus,
    })

    new CfnOutput(this, "RouteResponseSuccess", {
      value: routePinger.httpStatus,
    })
  }
}

class TestLambdaStack extends IntegTestCaseStack {
  constructor(scope: App, id: string, props?: IntegTestCaseStackProps) {
    super(scope, id, props)

    const site = new LambdaAstroSite(this, "TestLambdaAstroSiteConstruct", {
      serverEntry: path.join(
        __dirname,
        "./fixtures/lambda/dist/server/entry.mjs",
      ),
      staticDir: path.join(__dirname, "./fixtures/lambda/dist/client"),
    })

    const indexPinger = new Pinger(this, "Pinger root index.html", {
      url: `https://${site.domainName}`,
    })

    const routePinger = new Pinger(this, "Pinger route index.html", {
      url: `https://${site.domainName}/route`,
    })

    // the pinger must wait for the site to be deployed.
    indexPinger.node.addDependency(site)
    routePinger.node.addDependency(site)

    new CfnOutput(this, "IndexResponseSuccess", {
      value: indexPinger.httpStatus,
    })

    new CfnOutput(this, "RouteResponseSuccess", {
      value: routePinger.httpStatus,
    })
  }
}

class TestEdgeStack extends IntegTestCaseStack {
  constructor(scope: App, id: string, props?: IntegTestCaseStackProps) {
    super(scope, id, props)

    const site = new LambdaAstroSite(this, "TestEdgeAstroSiteConstruct", {
      serverEntry: path.join(
        __dirname,
        "./fixtures/edge/dist/server/entry.mjs",
      ),
      staticDir: path.join(__dirname, "./fixtures/edge/dist/client"),
    })

    const indexPinger = new Pinger(this, "Pinger root index.html", {
      url: `https://${site.domainName}`,
    })

    const routePinger = new Pinger(this, "Pinger route index.html", {
      url: `https://${site.domainName}/route`,
    })

    // the pinger must wait for the site to be deployed.
    indexPinger.node.addDependency(site)
    routePinger.node.addDependency(site)

    new CfnOutput(this, "IndexResponseSuccess", {
      value: indexPinger.httpStatus,
    })

    new CfnOutput(this, "RouteResponseSuccess", {
      value: routePinger.httpStatus,
    })
  }
}

const app = new App()
const testStaticCase = new TestStaticStack(
  app,
  "test-static-site-is-deployed-success",
  {
    env: {
      account:
        process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
    },
  },
)
const testLambdaCase = new TestLambdaStack(
  app,
  "test-lambda-site-is-deployed-success",
  {
    env: {
      account:
        process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
    },
  },
)
const testEdgeCase = new TestEdgeStack(
  app,
  "test-edge-site-is-deployed-success",
  {
    env: {
      account:
        process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
    },
  },
)

new IntegTest(app, "IntegTest", {
  testCases: [testStaticCase, testLambdaCase, testEdgeCase],
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
