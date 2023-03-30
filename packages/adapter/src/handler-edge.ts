import { STATUS_CODES } from "http"

import { App } from "astro/app"
import {
  CloudFrontHeaders,
  CloudFrontRequest,
  CloudFrontRequestHandler,
  CloudFrontRequestResult,
} from "aws-lambda"
import { StatusCodes } from "http-status-codes"

import { createBody, createURL } from "./utils"

export default function handler(
  app: App,
  knownBinaryMediaTypes: Set<string>,
): CloudFrontRequestHandler {
  return async function (event): Promise<CloudFrontRequestResult> {
    // 1. aws event -> astro request
    if (event.Records.length == 0 || event.Records.length > 1) {
      throw new Error(
        "Illegal record size, cloudfront event records equal 0 or records greater than 1",
      )
    }

    const cloudFrontRequest = event.Records[0].cf.request
    const request = createRequest(cloudFrontRequest)
    const routeData = app.match(request, { matchNotFound: true })

    if (!routeData) {
      return {
        status: StatusCodes.NOT_FOUND.toString(),
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
 * Create Request from lambda CloudFrontRequest
 *
 * @param event
 * @returns
 */
export function createRequest(request: CloudFrontRequest) {
  const {
    body: requestBody,
    method,
    uri,
    querystring,
    headers: eventHeaders,
  } = request

  const headers = new Headers(
    Object.fromEntries(
      Object.entries(eventHeaders).map(([key, value]) => [
        value[0]?.key ?? key,
        value[0]?.value,
      ]),
    ) as HeadersInit,
  )
  const url = createURL(headers, uri, querystring)
  const body = createBody(
    method,
    requestBody?.encoding == "base64",
    requestBody?.data,
  )
  const init: RequestInit = {
    body,
    headers,
    method,
  }

  return new Request(url, init)
}

/**
 * @param app astro app
 * @param response astro response
 * @param knownBinaryMediaTypes
 * @returns
 */
export async function createResponse(
  app: App,
  response: Response,
  knownBinaryMediaTypes: Set<string>,
): Promise<CloudFrontRequestResult> {
  for (const setCookieHeader of app.setCookieHeaders(response)) {
    response.headers.append("set-cookie", setCookieHeader)
  }
  const isBase64Encoded = knownBinaryMediaTypes.has(
    (response.headers.get("content-type") ?? "").toLowerCase(),
  )
  const body = isBase64Encoded
    ? Buffer.from(await response.arrayBuffer()).toString("base64")
    : await response.text()
  const headers: CloudFrontHeaders = {}
  response.headers.forEach((value, key) => {
    headers[key].push({ value })
  })

  return {
    status: response.status.toString(),
    statusDescription: response.statusText,
    headers,
    body,
    bodyEncoding: isBase64Encoded ? "base64" : "text",
  }
}
