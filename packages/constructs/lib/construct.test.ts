import { App } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { describe, expect, test } from "vitest"

import AstroSiteConstruct from "./construct"

describe("Test strToRuntime", () => {
  const cst = new AstroSiteConstruct(new App(), "TestConstruct", {
    serverEntry: "",
    client: "",
  })

  test("Expect returns NODEJS_18_X by default", () => {
    expect(cst["strToRuntime"]()).toBe(Runtime.NODEJS_18_X)
  })
})
