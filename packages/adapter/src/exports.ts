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

import edgeLambda from "./handler-edge"
import lambdaHandler from "./handler-lambda"

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
    "audio/3gpp",
    "audio/3gpp2",
    "audio/aac",
    "audio/midi",
    "audio/mpeg",
    "audio/ogg",
    "audio/opus",
    "audio/wav",
    "audio/webm",
    "audio/x-midi",
    "image/avif",
    "image/bmp",
    "image/gif",
    "image/vnd.microsoft.icon",
    "image/heif",
    "image/jpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "video/3gpp",
    "video/3gpp2",
    "video/mp2t",
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/x-msvideo",
    "video/webm",
    ...(options?.binaryMediaTypes ?? []).map((s) => s.toLowerCase()),
  ])

  let handler: Handler
  if (!(options?.isEdge ?? false)) {
    handler = middy(lambdaHandler(app, knownBinaryMediaTypes))
  } else {
    handler = middy(edgeLambda(app, knownBinaryMediaTypes))
  }

  return { handler }
}
