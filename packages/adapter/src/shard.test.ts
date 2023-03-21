import { Buffer } from "buffer"
import fs from "fs"
import path from "path"
import { URL, fileURLToPath } from "url"

import { Headers } from "node-fetch"
import { describe, expect, test } from "vitest"

import { createBody, createURL } from "./shared"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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

describe("Test createBody", () => {
  test("Expect undefined with method GET", () => {
    expect(createBody("GET", true, undefined)).toBeUndefined()
  })

  test("Expect success with text", () => {
    const text = "test data"
    expect(createBody("POST", false, text)).toEqual(Buffer.from(text, "utf-8"))
  })

  test("Expect succes with buffer", () => {
    const image = fs.readFileSync(
      path.join(__dirname, "../tests/testdata/test.png"),
    )
    expect(createBody("POST", true, image.toString("base64"))).toEqual(image)
  })
})
