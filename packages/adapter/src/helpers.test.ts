import { describe, expect, test } from "vitest"

import { parseContentType } from "./helpers"

describe("Test parseContentType", () => {
  test("Expect to return empty string by default", () => {
    expect(parseContentType()).toBe("")
  })

  test("Expect to return empty string when null", () => {
    expect(parseContentType(null)).toBe("")
  })

  test("Expect to return text/html", () => {
    expect(parseContentType("text/html")).toBe("text/html")
  })

  test("Expect to return text/html with separator", () => {
    expect(parseContentType("text/html; charset=utf-8")).toBe("text/html")
  })
})
