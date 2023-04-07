import {
  CloudFrontHeaders,
  CloudFrontRequest,
  CloudFrontRequestResult,
} from "aws-lambda"
import { describe, expect, test } from "vitest"

import {
  transformRequest,
  transformRequestHeaders,
  transformResponse,
  transformResponseHeaders,
} from "./edge"

describe("Test transformRequestHeaders", () => {
  test("Expect transform success", () => {
    const cfHeaders: CloudFrontHeaders = {
      "content-type": [
        {
          key: "content-type",
          value: "text/html",
        },
      ],
    }
    const expectHeaders = new Headers({
      "content-type": "text/html",
    })

    expect(transformRequestHeaders(cfHeaders)).toEqual(expectHeaders)
  })

  test("Expect transform success with empty", () => {
    const cfHeaders: CloudFrontHeaders = {}
    const expectHeaders = new Headers()

    expect(transformRequestHeaders(cfHeaders)).toEqual(expectHeaders)
  })

  test("Expect transform success with multiple values", () => {
    const cfHeaders: CloudFrontHeaders = {
      "multi-key": [
        {
          key: "multi-key",
          value: "value1",
        },
        {
          key: "multi-key",
          value: "value2",
        },
      ],
    }
    const expectHeaders = new Headers({
      "multi-key": "value1, value2",
    })

    expect(transformRequestHeaders(cfHeaders)).toEqual(expectHeaders)
  })
})

describe("Test transformRequest", () => {
  test("Expect transform success", () => {
    const cfRequest: CloudFrontRequest = {
      uri: "/",
      method: "GET",
      headers: {
        "x-forwarded-protocol": [
          {
            key: "x-forwarded-protocol",
            value: "https",
          },
        ],
        "x-forwarded-host": [
          {
            key: "x-forwarded-host",
            value: "example.com",
          },
        ],
      },
      querystring: "",
      body: undefined,
      clientIp: "",
    }
    const expectRequest = new Request("https://example.com", {
      method: "GET",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
    })

    expect(transformRequest(cfRequest)).toMatchObject(expectRequest)
  })

  test("Expect transform success with querystring", () => {
    const cfRequest: CloudFrontRequest = {
      uri: "/",
      method: "GET",
      headers: {
        "x-forwarded-protocol": [
          {
            key: "x-forwarded-protocol",
            value: "https",
          },
        ],
        "x-forwarded-host": [
          {
            key: "x-forwarded-host",
            value: "example.com",
          },
        ],
      },
      querystring: "key=value",
      body: undefined,
      clientIp: "",
    }
    const expectRequest = new Request("https://example.com?key=value", {
      method: "GET",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
    })

    expect(transformRequest(cfRequest)).toMatchObject(expectRequest)
  })

  test("Expect transform success with body", () => {
    const cfRequest: CloudFrontRequest = {
      uri: "/",
      method: "POST",
      headers: {
        "x-forwarded-protocol": [
          {
            key: "x-forwarded-protocol",
            value: "https",
          },
        ],
        "x-forwarded-host": [
          {
            key: "x-forwarded-host",
            value: "example.com",
          },
        ],
      },
      querystring: "",
      body: {
        action: "read-only",
        data: "Hello World",
        encoding: "text",
        inputTruncated: false,
      },
      clientIp: "",
    }
    const expectRequest = new Request("https://example.com", {
      method: "POST",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
      body: "Hello World",
    })

    expect(transformRequest(cfRequest)).toMatchObject(expectRequest)
  })

  test("Expect transform success with base64 body", () => {
    const cfRequest: CloudFrontRequest = {
      uri: "/",
      method: "POST",
      headers: {
        "x-forwarded-protocol": [
          {
            key: "x-forwarded-protocol",
            value: "https",
          },
        ],
        "x-forwarded-host": [
          {
            key: "x-forwarded-host",
            value: "example.com",
          },
        ],
      },
      querystring: "",
      body: {
        action: "read-only",
        data: "SGVsbG8gV29ybGQ=",
        encoding: "base64",
        inputTruncated: false,
      },
      clientIp: "",
    }
    const expectRequest = new Request("https://example.com", {
      method: "POST",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
      body: "SGVsbG8gV29ybGQ=",
    })

    expect(transformRequest(cfRequest)).toMatchObject(expectRequest)
  })
})

describe("Test transformResponseHeaders", () => {
  test("Expect transform success", () => {
    const headers = new Headers({
      "content-type": "text/html",
    })
    const expectHeaders: CloudFrontHeaders = {
      "content-type": [
        {
          key: "content-type",
          value: "text/html",
        },
      ],
    }

    expect(transformResponseHeaders(headers)).toEqual(expectHeaders)
  })

  test("Expect transform success with empty", () => {
    const headers = new Headers()
    const expectHeaders: CloudFrontHeaders = {}

    expect(transformResponseHeaders(headers)).toEqual(expectHeaders)
  })

  test("Expect transform success with multiple values", () => {
    const headers = new Headers({
      "multi-key": "value1, value2",
    })
    const expectHeaders: CloudFrontHeaders = {
      "multi-key": [
        {
          key: "multi-key",
          value: "value1",
        },
        {
          key: "multi-key",
          value: "value2",
        },
      ],
    }

    expect(transformResponseHeaders(headers)).toEqual(expectHeaders)
  })
})

describe("Test transformResponse", () => {
  test("Expect transform response success", async () => {
    const response = new Response("Hello World", {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    })
    const expectResponse: CloudFrontRequestResult = {
      status: "200",
      statusDescription: "OK",
      headers: {
        "content-type": [
          {
            key: "content-type",
            value: "text/html",
          },
        ],
      },
      bodyEncoding: "text",
      body: "Hello World",
    }

    await expect(transformResponse(response, new Set())).resolves.toMatchObject(
      expectResponse,
    )
  })

  test("Expect tranform response with base64 body success", async () => {
    const response = new Response("Hello World", {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    })
    const expectResponse: CloudFrontRequestResult = {
      status: "200",
      statusDescription: "OK",
      headers: {
        "content-type": [
          {
            key: "content-type",
            value: "text/html",
          },
        ],
      },
      bodyEncoding: "base64",
      body: "SGVsbG8gV29ybGQ=",
    }

    await expect(
      transformResponse(response, new Set(["text/html"])),
    ).resolves.toMatchObject(expectResponse)
  })
})
