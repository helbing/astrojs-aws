import { URL } from "url"

import { Headers } from "node-fetch"
import { describe, expect, test } from "vitest"

import { createBody, createURL } from "./shared"

describe("Test createURL", () => {
  test("Expect success without rawQueryString", () => {
    const headers = new Headers({
      "x-forwarded-protocol": "https",
      "x-forwarded-host": "www.google.com",
    })
    const rawPath = "/path/to"
    const rawQueryString = ""
    const url = new URL(rawPath, "https://www.google.com")
    expect(createURL(headers, rawPath, rawQueryString)).toStrictEqual(url)
  })

  test("Expect success with rawQueryString", () => {
    const headers = new Headers({
      "x-forwarded-protocol": "https",
      "x-forwarded-host": "www.google.com",
    })
    const rawPath = "/path/to"
    const rawQueryString = "foo1=bar1&foo2=bar2"
    const url = new URL(
      `${rawPath}?${rawQueryString}`,
      "https://www.google.com",
    )
    expect(createURL(headers, rawPath, rawQueryString)).toStrictEqual(url)
  })
})
