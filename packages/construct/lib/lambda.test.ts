import path from "path"
import { fileURLToPath } from "url"

import { Stack } from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { describe, expect, test } from "vitest"

import { LambdaAstroSite } from "./lambda"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test LambdaAstroSite", () => {
  test("Expect match snapshot without CloudFront", () => {
    const stack = new Stack()
    new LambdaAstroSite(stack, "TestSite", {
      serverEntry: path.join(__dirname, "../tests/testdata/fake-entry.mjs"),
      staticDir: path.join(__dirname, "../tests/testdata/fakestatic"),
    })
    const template = Template.fromStack(stack)
    expect(template).toMatchSnapshot()
  })
})
