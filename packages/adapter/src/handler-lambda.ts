import { STATUS_CODES } from "http"
import {
  Request,
  Response,
  RequestInit,
  Headers,
  HeadersInit,
} from "node-fetch"
import { polyfill } from "@astrojs/webapi"
import { App } from "astro/app"
import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda"
import { StatusCodes } from "http-status-codes"
import { createURL, createBody } from "./shared"

polyfill(globalThis, {
  exclude: "window document",
})

export default function handler(
  app: App,
  knownBinaryMediaTypes: Set<string>,
): APIGatewayProxyHandlerV2 {
  return async function (event): Promise<APIGatewayProxyResultV2> {
    // 1. aws event -> astro request
    const request = createRequest(event)
    const routeData = app.match(request, { matchNotFound: true })

    if (!routeData) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: STATUS_CODES[StatusCodes.NOT_FOUND],
      }
    }

    // 2. astro render
    const response = await app.render(request, routeData)

    // 3. aws response -> astro response
    return createResponse(app, response, knownBinaryMediaTypes)
  }
}

/**
 * Create Request from lambda APIGatewayProxyEventV2
 *
 * @param event
 * @returns
 */
export function createRequest(event: APIGatewayProxyEventV2) {
  const {
    rawPath,
    rawQueryString,
    headers: eventHeaders,
    body: requestBody,
    isBase64Encoded,
    requestContext: {
      http: { method },
    },
  } = event

  const headers = new Headers(eventHeaders as HeadersInit)
  const url = createURL(headers, rawPath, rawQueryString)
  const body = createBody(method, isBase64Encoded, requestBody)
  const init: RequestInit = {
    body,
    headers,
    method,
  }

  return new Request(url, init)
}

/**
 *
 * @param app astro app
 * @param response astro response
 * @param knownBinaryMediaTypes
 * @returns
 */
export async function createResponse(
  app: App,
  response: Response,
  knownBinaryMediaTypes: Set<string>,
): Promise<APIGatewayProxyResultV2> {
  for (const setCookieHeader of app.setCookieHeaders(response)) {
    response.headers.append("set-cookie", setCookieHeader)
  }
  const headers = Object.fromEntries(response.headers.entries())
  const isBase64Encoded = knownBinaryMediaTypes.has(headers["content-type"])
  const body = isBase64Encoded
    ? Buffer.from(await response.arrayBuffer()).toString("base64")
    : await response.text()

  return {
    statusCode: response.status,
    headers,
    body,
    isBase64Encoded,
  }
}
