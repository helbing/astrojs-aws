import path from "path"
import { fileURLToPath } from "url"

import { App, Stack } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { describe, expect, test } from "vitest"

import { AstroSiteConstruct } from "./construct"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

describe("Test parseRoutesFromDir", () => {
  const cst = new AstroSiteConstruct(
    new Stack(new App(), "TestStack"),
    "TestConstruct",
  )

  test("Expect throw Error when path not exists", () => {
    expect(() => {
      cst.parseRoutesFromDir("pathNotExists")
    }).toThrowError()
  })

  test("Expect parse HttpApi Gateway routes success", () => {
    expect(
      cst.parseRoutesFromDir(
        path.join(__dirname, "../tests/fixtures/testdirs/"),
      ),
    ).toContain({
      "/test.txt": "/test.txt",
      "/route1/{proxy+}": "/route1/{proxy}",
      "/route2/{proxy+}": "/route2/{proxy}",
    })

    test("Expect parse CloudFront routes success", () => {
      expect(
        cst.parseRoutesFromDir(
          path.join(__dirname, "../tests/fixtures/testdirs/"),
          true,
        ),
      ).toContain({
        "/test.txt": "/test.txt",
        "/route1/*": "/route1/*",
        "/route2/*": "/route2/*",
      })
    })
  })
})
