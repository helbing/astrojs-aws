#!/usr/bin/env ts-node

import { App } from "aws-cdk-lib"
import "source-map-support/register"

import ExampleStack from "../lib/index"

const app = new App()

new ExampleStack(app, "ExampleHelloWorld", {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
  },
})
