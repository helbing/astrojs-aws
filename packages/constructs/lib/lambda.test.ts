import path from "path"
import { fileURLToPath } from "url"

import { App, Stack } from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { describe, expect, test } from "vitest"

import { LambdaAstroSite } from "./lambda"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test LambdaAstroSite", () => {
  test("Expect match snapshot", () => {
    const stack = new Stack(new App(), "TestStack")
    new LambdaAstroSite(stack, "TestConstruct", {
      entry: path.join(__dirname, "../tests/testdata/fake.ts"),
    })
    const template = Template.fromStack(stack).toJSON()
    expect(template).toMatchSnapshot()
    expect(1).toBe(1)
  })
})
