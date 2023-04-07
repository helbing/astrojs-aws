import {
  APIGatewayEventRequestContextV2,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda"
import { describe, expect, test } from "vitest"
import { mock } from "vitest-mock-extended"

import { transformRequest, transformResponse } from "./lambda"

describe("Test transformRequest", () => {
  test("Expect tranform event success", () => {
    const event = Object.assign(mock<APIGatewayProxyEventV2>(), {
      body: undefined,
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      } as APIGatewayProxyEventHeaders,
      rawPath: "/",
      rawQueryString: "",
      requestContext: {
        http: { method: "GET" },
      } as APIGatewayEventRequestContextV2,
      isBase64Encoded: false,
    } as APIGatewayProxyEventV2)
    const expectRequest = new Request(new URL("https://example.com/"), {
      method: "GET",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
      body: undefined,
    })

    expect(transformRequest(event)).toMatchObject(expectRequest)
  })

  test("Expect tranform event success with body", () => {
    const event = Object.assign(mock<APIGatewayProxyEventV2>(), {
      body: "Hello World",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      } as APIGatewayProxyEventHeaders,
      rawPath: "/",
      rawQueryString: "",
      requestContext: {
        http: { method: "POST" },
      } as APIGatewayEventRequestContextV2,
      isBase64Encoded: false,
    } as APIGatewayProxyEventV2)
    const expectRequest = new Request(new URL("https://example.com/"), {
      method: "POST",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
      body: "Hello World",
    })

    expect(transformRequest(event)).toMatchObject(expectRequest)
  })

  test("Expect tranform event success with base64 body", () => {
    const event = Object.assign(mock<APIGatewayProxyEventV2>(), {
      body: "SGVsbG8gV29ybGQ=",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      } as APIGatewayProxyEventHeaders,
      rawPath: "/",
      rawQueryString: "",
      requestContext: {
        http: { method: "POST" },
      } as APIGatewayEventRequestContextV2,
      isBase64Encoded: true,
    } as APIGatewayProxyEventV2)
    const expectRequest = new Request(new URL("https://example.com/"), {
      method: "POST",
      headers: {
        "x-forwarded-protocol": "https",
        "x-forwarded-host": "example.com",
      },
      body: "SGVsbG8gV29ybGQ=",
    })

    expect(transformRequest(event)).toMatchObject(expectRequest)
  })
})

describe("Test transformResponse", () => {
  test("Expect tranform response success", async () => {
    const response = new Response("Hello World", {
      status: 200,
      headers: {
        "content-type": "text/html",
      },
    })
    const expectResponse: APIGatewayProxyResultV2 = {
      statusCode: 200,
      body: "Hello World",
      headers: {
        "content-type": "text/html",
      },
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
    const expectResponse: APIGatewayProxyResultV2 = {
      statusCode: 200,
      body: "SGVsbG8gV29ybGQ=",
      headers: {
        "content-type": "text/html",
      },
      isBase64Encoded: true,
    }

    await expect(
      transformResponse(response, new Set(["text/html"])),
    ).resolves.toMatchObject(expectResponse)
  })
})
