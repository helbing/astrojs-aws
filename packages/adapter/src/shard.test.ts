import { URL } from "url"
import { Headers } from "node-fetch"
import { describe, test, expect } from "vitest"
import { createURL } from "./shared"

describe("Test createURL", () => {
  test("Expect success", () => {
    const headers = new Headers({
      "x-forwarded-protocol": "https",
      "x-forwarded-host": "www.google.com",
    })
    const rawPath = "/path/to"
    const rawQueryString = ""
    const url = new URL(rawPath, "https://www.google.com")
    expect(createURL(headers, rawPath, rawQueryString)).toStrictEqual(url)
  })
})
