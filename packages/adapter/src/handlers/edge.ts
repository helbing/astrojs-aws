import { Buffer } from "node:buffer"
import { URL } from "node:url"

import { polyfill } from "@astrojs/webapi"
import { App } from "astro/app"
import {
  CloudFrontHeaders,
  CloudFrontRequest,
  CloudFrontRequestHandler,
  CloudFrontRequestResult,
} from "aws-lambda"

import { parseContentType } from "../helpers"

polyfill(globalThis, {
  exclude: "window document",
})

export default function handler(
  app: App,
  knownBinaryMediaTypes: Set<string>,
): CloudFrontRequestHandler {
  return async function (event): Promise<CloudFrontRequestResult> {
    if (event.Records.length != 1) {
      throw new Error(
        "Illegal record size, cloudfront event records not equal 1",
      )
    }

    const request = transformRequest(event.Records[0].cf.request)

    const routeData = app.match(request, { matchNotFound: true })
    if (!routeData) {
      return event.Records[0].cf.request
    }
    // astro render
    const rendered = await app.render(request, routeData)

    return transformResponse(rendered, knownBinaryMediaTypes)
  }
}

/**
 * Transform CloudFrontHeaders to Headers
 *
 * @param headers
 * @returns
 */
export function transformRequestHeaders(headers: CloudFrontHeaders): Headers {
  const requestHeaders = new Headers()
  for (const [key, values] of Object.entries(headers)) {
    for (const { value } of values) {
      if (value) {
        requestHeaders.append(key, value)
      }
    }
  }
  return requestHeaders
}

/**
 * Transform CloudFrontRequest to Request
 *
 * @param cfRequest
 * @returns
 */
export function transformRequest(cfRequest: CloudFrontRequest): Request {
  const { uri, method, headers, querystring, body } = cfRequest
  const requestHeaders = transformRequestHeaders(headers)
  const scheme = headers["x-forwarded-protocol"][0].value || "https"
  const host = (headers["x-forwarded-host"] || headers["host"])[0].value
  const qs = querystring.length > 0 ? `?${querystring}` : ""
  const url = new URL(`${uri}${qs}`, `${scheme}://${host}`)

  return new Request(url, {
    method,
    headers: requestHeaders,
    body: body?.data
      ? body.encoding === "base64"
        ? Buffer.from(body.data, "base64").toString()
        : body.data
      : undefined,
  })
}

/**
 * Transform Headers to CloudFrontHeaders
 *
 * @param headers
 * @returns
 */
export function transformResponseHeaders(headers: Headers): CloudFrontHeaders {
  const responseHeaders: CloudFrontHeaders = {}
  for (const [key, multiValues] of headers.entries()) {
    const values = multiValues.split(",").map((v) => v.trim())
    for (const value of values) {
      responseHeaders[key] = [...(responseHeaders[key] ?? []), { key, value }]
    }
  }
  return responseHeaders
}

/**
 * Transform Response to CloudFrontRequestResult
 *
 * @param response
 * @param knownBinaryMediaTypes
 * @returns
 */
export async function transformResponse(
  response: Response,
  knownBinaryMediaTypes: Set<string>,
): Promise<CloudFrontRequestResult> {
  const responseHeaders = transformResponseHeaders(response.headers)
  const contentType = parseContentType(response.headers.get("content-type"))
  const responseIsBase64Encoded = knownBinaryMediaTypes.has(contentType)

  return {
    status: response.status.toString(),
    statusDescription: "OK",
    headers: responseHeaders,
    bodyEncoding: responseIsBase64Encoded ? "base64" : "text",
    body: responseIsBase64Encoded
      ? Buffer.from(await response.arrayBuffer()).toString("base64")
      : await response.text(),
  }
}
