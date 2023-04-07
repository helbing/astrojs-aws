import { Buffer } from "node:buffer"
import { URL } from "node:url"

import { polyfill } from "@astrojs/webapi"
import { App } from "astro/app"
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda"

import { parseContentType } from "../helpers"

polyfill(globalThis, {
  exclude: "window document",
})

export default function handler(
  app: App,
  knownBinaryMediaTypes: Set<string>,
): APIGatewayProxyHandlerV2 {
  return async function (event): Promise<APIGatewayProxyResultV2> {
    const {
      body,
      headers,
      rawPath,
      rawQueryString,
      requestContext,
      isBase64Encoded,
    } = event

    // convert aws apigateway event to node request
    const scheme = headers["x-forwarded-protocol"] || "https"
    const host = headers["x-forwarded-host"] || headers.host
    const qs = rawQueryString.length > 0 ? `?${rawQueryString}` : ""
    const url = new URL(`${rawPath}${qs}`, `${scheme}://${host}`)
    const encoding = isBase64Encoded ? "base64" : "utf8"
    const request = new Request(url.toString(), {
      method: requestContext.http.method,
      headers: new Headers(headers as HeadersInit),
      body: typeof body === "string" ? Buffer.from(body, encoding) : body,
    })

    const routeData = app.match(request, { matchNotFound: true })
    if (!routeData) {
      return {
        statusCode: 404,
        body: "Not found",
      }
    }

    // astro render
    const rendered = await app.render(request, routeData)

    // convert node response to apigateway response
    const contentType = parseContentType(rendered.headers.get("content-type"))
    const responseIsBase64Encoded = knownBinaryMediaTypes.has(contentType)
    return {
      statusCode: rendered.status,
      headers: Object.fromEntries(rendered.headers.entries()),
      cookies: Array.from(app.setCookieHeaders(rendered)),
      body: responseIsBase64Encoded
        ? Buffer.from(await rendered.arrayBuffer()).toString("base64")
        : await rendered.text(),
      isBase64Encoded: responseIsBase64Encoded,
    }
  }
}
