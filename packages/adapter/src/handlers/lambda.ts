import { Buffer } from "node:buffer"
import { URL } from "node:url"

import { polyfill } from "@astrojs/webapi"
import { App } from "astro/app"
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
} from "aws-lambda"

import { parseContentType } from "../helpers"

polyfill(globalThis, {
  exclude: "window document",
})

export default function handler(
  app: App,
  knownBinaryMediaTypes: Set<string>,
): APIGatewayProxyHandlerV2 {
  return async function (event): Promise<APIGatewayProxyResultV2> {
    const request = transformRequest(event)

    const routeData = app.match(request, { matchNotFound: true })
    if (!routeData) {
      return {
        statusCode: 404,
        body: "Not found",
      }
    }
    // astro render
    const rendered = await app.render(request, routeData)

    return transformResponse(rendered, knownBinaryMediaTypes)
  }
}

/**
 * Transform APIGatewayProxyEventV2 to Request
 *
 * @param event
 * @returns
 */
export function transformRequest(event: APIGatewayProxyEventV2): Request {
  const {
    body,
    headers,
    rawPath,
    rawQueryString,
    requestContext,
    isBase64Encoded,
  } = event

  const scheme = headers["x-forwarded-protocol"] || "https"
  const host = headers["x-forwarded-host"] || headers.host
  const qs = rawQueryString.length > 0 ? `?${rawQueryString}` : ""
  const url = new URL(`${rawPath}${qs}`, `${scheme}://${host}`)
  const encoding = isBase64Encoded ? "base64" : "utf8"

  return new Request(url, {
    method: requestContext.http.method,
    headers: new Headers(headers as HeadersInit),
    body: typeof body === "string" ? Buffer.from(body, encoding) : body,
  })
}

/**
 * Transform Response to APIGatewayProxyResultV2
 *
 * @param response
 * @param knownBinaryMediaTypes
 * @returns
 */
export async function transformResponse(
  response: Response,
  knownBinaryMediaTypes: Set<string>,
): Promise<APIGatewayProxyResultV2> {
  const contentType = parseContentType(response.headers.get("content-type"))
  const responseIsBase64Encoded = knownBinaryMediaTypes.has(contentType)
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: responseIsBase64Encoded
      ? Buffer.from(await response.arrayBuffer()).toString("base64")
      : await response.text(),
    isBase64Encoded: responseIsBase64Encoded,
  }
}
