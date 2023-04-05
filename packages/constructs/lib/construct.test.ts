import path from "path"
import { fileURLToPath } from "url"

import { App, Stack } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { describe, expect, test } from "vitest"

import { AstroSiteConstruct } from "./construct"

describe("Test strToRuntime", () => {
  const cst = new AstroSiteConstruct(
    new Stack(new App(), "TestStack"),
    "TestConstruct",
  )

  test("Expect returns NODEJS_18_X by default", () => {
    expect(cst.strToRuntime()).toBe(Runtime.NODEJS_18_X)
  })

  test("Expect returns NODEJS_18_X when input is nodejs18.x", () => {
    expect(cst.strToRuntime()).toBe(Runtime.NODEJS_18_X)
  })

  test("Expect returns NODEJS_16_X when input is nodejs16.x", () => {
    expect(cst.strToRuntime("nodejs16.x")).toBe(Runtime.NODEJS_16_X)
  })
})
