import { APIGatewayProxyHandlerV2, CloudFrontRequestHandler } from "aws-lambda"

export function createLambdaHandler(): APIGatewayProxyHandlerV2 {
  return function (event) {
    console.log(event)
  }
}

export function createEdgeHandler(): CloudFrontRequestHandler {
  return function (event) {
    console.log(event)
  }
}
