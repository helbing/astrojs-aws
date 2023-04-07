import { Buffer } from "node:buffer"
import { URL } from "node:url"

import { polyfill } from "@astrojs/webapi"
import { App } from "astro/app"
import {
  CloudFrontHeaders,
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

    const { uri, method, headers, querystring, body } =
      event.Records[0].cf.request

    // build request header
    const requestHeaders = new Headers()
    for (const [key, values] of Object.entries(headers)) {
      for (const { value } of values) {
        if (value) {
          requestHeaders.append(key, value)
        }
      }
    }

    // convert aws cloudfront event to node request
    const host = (headers["x-forwarded-host"] || headers["host"])[0].value
    const qs = querystring.length > 0 ? `?${querystring}` : ""
    const url = new URL(`${uri}${qs}`, `https://${host}`)
    const request = new Request(url.toString(), {
      method,
      headers: requestHeaders,
      body: body?.data
        ? body.encoding === "base64"
          ? Buffer.from(body.data, "base64").toString()
          : body.data
        : undefined,
    })

    const routeData = app.match(request, { matchNotFound: true })
    if (!routeData) {
      return event.Records[0].cf.request
    }

    // astro render
    const rendered = await app.render(request, routeData)

    // build response headers
    const responseHeaders: CloudFrontHeaders = {}
    for (const [key, value] of rendered.headers.entries()) {
      responseHeaders[key] = [...(responseHeaders[key] ?? []), { key, value }]
    }

    // convert node response to cloudfront response
    const contentType = parseContentType(rendered.headers.get("content-type"))
    const responseIsBase64Encoded = knownBinaryMediaTypes.has(contentType)
    return {
      status: rendered.status.toString(),
      statusDescription: "OK",
      headers: responseHeaders,
      bodyEncoding: responseIsBase64Encoded ? "base64" : "text",
      body: await rendered.text(),
    }
  }
}
