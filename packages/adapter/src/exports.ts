import middy, { MiddyfiedHandler } from "@middy/core"
import { SSRManifest } from "astro"
import { App } from "astro/app"
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
  Context,
} from "aws-lambda"

import edgeHandler from "./handlers/edge"
import lambdaHandler from "./handlers/lambda"

export type Options = {
  /**
   * The adapter use lambda mode by default. If isEdge set true, the adapter
   * will use edge mode
   *
   * - lambda mode: APIGatewayProxyHandlerV2
   * - edge mode: CloudFrontRequestHandler
   */
  isEdge?: boolean

  /**
   * Addition binary media type
   */
  binaryMediaTypes?: string[]
}

/**
 * Handler is type of middy(APIGatewayProxyHandlerV2) or
 * middy(CloudFrontRequestHandler)
 */
type Handler =
  | MiddyfiedHandler<
      APIGatewayProxyEventV2,
      APIGatewayProxyResultV2,
      Error,
      Context
    >
  | MiddyfiedHandler<
      CloudFrontRequestEvent,
      CloudFrontRequestResult,
      Error,
      Context
    >

export function createExports(manifest: SSRManifest, options: Options) {
  const app = new App(manifest)
  const knownBinaryMediaTypes = new Set([
    ...(options?.binaryMediaTypes ?? []).map((s) => s.toLowerCase()),
  ])

  let handler: Handler
  if (options?.isEdge ?? false) {
    handler = middy(edgeHandler(app, knownBinaryMediaTypes))
  } else {
    handler = middy(lambdaHandler(app, knownBinaryMediaTypes))
  }

  return { handler }
}
