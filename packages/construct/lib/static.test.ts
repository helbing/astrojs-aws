import { fileURLToPath } from "node:url"
import path from "path"

import { Stack } from "aws-cdk-lib"
import { Template } from "aws-cdk-lib/assertions"
import { describe, expect, test } from "vitest"

import { StaticAstroSite } from "./static"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test StaticAstroSite", () => {
  test("Expect match snapshot without CloudFront", () => {
    const stack = new Stack()
    new StaticAstroSite(new Stack(), "TestSite", {
      siteDir: path.join(__dirname, "../tests/testdata/fakestatic"),
    })
    const template = Template.fromStack(stack)
    expect(template).toMatchSnapshot()
  })
})
