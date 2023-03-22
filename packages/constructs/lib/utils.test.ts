import { Runtime } from "aws-cdk-lib/aws-lambda"
import { describe, expect, test } from "vitest"

import Utils from "./utils"

describe("Test stringToRuntime", () => {
  const utils = new Utils()

  test("Expect return NODEJS_14_X", () => {
    expect(utils.stringToRuntime("nodejs14.x")).toBe(Runtime.NODEJS_14_X)
  })

  test("Expect return NODEJS_16_X", () => {
    expect(utils.stringToRuntime("nodejs16.x")).toBe(Runtime.NODEJS_16_X)
  })

  test("Expect return NODEJS_18_X", () => {
    expect(utils.stringToRuntime("nodejs18.x")).toBe(Runtime.NODEJS_18_X)
    expect(utils.stringToRuntime("")).toBe(Runtime.NODEJS_18_X)
  })
})
