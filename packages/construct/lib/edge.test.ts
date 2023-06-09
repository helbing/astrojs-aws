import path from "path"
import { fileURLToPath } from "url"

import { Stack } from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { describe, expect, test } from "vitest"

import { EdgeAstroSite } from "./edge"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test EdgeAstroSite", () => {
  test("Expect match snapshot when onlylambda", () => {
    const stack = new Stack()
    new EdgeAstroSite(stack, "TestSite", {
      serverEntry: path.join(__dirname, "../tests/testdata/fake-entry.mjs"),
      staticDir: path.join(__dirname, "../tests/testdata/fakestatic"),
      onlyLambda: true,
    })
    const template = Template.fromStack(stack)
    expect(template).toMatchSnapshot()
  })
})
