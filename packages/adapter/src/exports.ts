import type { SSRManifest } from "astro"
import { App } from "astro/app"
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  CloudFrontRequestEvent,
  CloudFrontRequestResult,
  Context,
} from "aws-lambda"
import middy, { MiddyfiedHandler } from "@middy/core"
import httpHeaderNormalizer from "@middy/http-header-normalizer"
import httpEventNormalizer from "@middy/http-event-normalizer"
import httpErrorHandler from "@middy/http-error-handler"
import httpJsonBodyParser from "@middy/http-json-body-parser"
import { Logger, injectLambdaContext } from "@aws-lambda-powertools/logger"
import { Tracer, captureLambdaHandler } from "@aws-lambda-powertools/tracer"
import { Metrics, logMetrics } from "@aws-lambda-powertools/metrics"
import { createLambdaHandler, createEdgeHandler } from "./handler"

export type Options = {
  /**
   * The adapter use lambda mode by default. If isEdge set true, the adapter
   * will use edge mode
   */
  isEdge: boolean

  /**
   * use middly middlewares
   */
  withMiddlewares: middy.MiddlewareObj[]
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

  let handler: Handler
  if (!options.isEdge) {
    handler = middy(createLambdaHandler())
  } else {
    handler = middy(createEdgeHandler())
  }

  // handler
  //   .use(httpEventNormalizer())
  //   .use(httpHeaderNormalizer())
  //   .use(httpJsonBodyParser())
  //   .use(httpErrorHandler())

  // if (options.serviceName.length > 0) {
  //   const logger = new Logger({ serviceName: options.serviceName })
  //   const tracer = new Tracer({ serviceName: options.serviceName })
  //   const metrics = new Metrics({ serviceName: options.serviceName })
  //   tracer.provider.setLogger(logger)

  //   handler
  //     .use(injectLambdaContext(logger, { logEvent: true }))
  //     .use(captureLambdaHandler(tracer))
  //     .use(logMetrics(metrics))
  // }

  for (const middleware of options.withMiddlewares) {
    handler.use(middleware)
  }

  return { handler }
}
