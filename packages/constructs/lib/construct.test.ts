import path from "path"
import { fileURLToPath } from "url"

import { App, Stack } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { describe, expect, test } from "vitest"

import { AstroSiteConstruct } from "./construct"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test createNodejsFunction", () => {
  test("Expect runtime is NODEJS_18_X by default", () => {
    const cst = new AstroSiteConstruct(
      new Stack(new App(), "TestStack"),
      "TestConstruct",
      {
        serverEntry: path.join(__dirname, "../tests/testdata/fake-entry.mjs"),
        client: "",
      },
    )
    expect(cst.createNodejsFunction().runtime).toBe(Runtime.NODEJS_18_X)
  })

  test("Expect runtime is NODEJS_16_X", () => {
    const cst = new AstroSiteConstruct(
      new Stack(new App(), "TestStack"),
      "TestConstruct",
      {
        serverEntry: path.join(__dirname, "../tests/testdata/fake-entry.mjs"),
        client: "",
        serverOptions: {
          runtime: "nodejs16.x",
        },
      },
    )
    expect(cst.createNodejsFunction().runtime).toBe(Runtime.NODEJS_16_X)
  })
})

describe("Test strToRuntime", () => {
  const cst = new AstroSiteConstruct(
    new Stack(new App(), "TestStack"),
    "TestConstruct",
    {
      serverEntry: path.join(__dirname, "../tests/testdata/fake-entry.mjs"),
      client: "",
    },
  )

  test("Expect returns NODEJS_18_X by default", () => {
    expect(cst["strToRuntime"]()).toBe(Runtime.NODEJS_18_X)
  })

  test("Expect returns NODEJS_18_X when input is nodejs18.x", () => {
    expect(cst["strToRuntime"]("nodejs18.x")).toBe(Runtime.NODEJS_18_X)
  })

  test("Expect returns NODEJS_16_X when input is nodejs16.x", () => {
    expect(cst["strToRuntime"]("nodejs16.x")).toBe(Runtime.NODEJS_16_X)
  })
})
