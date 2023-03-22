import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import { CfnOutput } from "aws-cdk-lib"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"

import Utils from "./utils"

export interface ILambdaAstroSiteProps {
  /**
   * Nodejs Runtime

   * @default nodejs18.x
   */
  readonly runtime?: "nodejs14.x" | "nodejs16.x" | "nodejs18.x"

  /**
   * Path of entry file (built with astrojs-aws)
   */
  readonly entry: string
}

export class LambdaAstroSite extends Construct {
  /**
   * HTTP API
   */
  public readonly api: HttpApi
  /**
   * Lambda function handler
   */
  public readonly handler: NodejsFunction

  constructor(scope: Construct, id: string, props: ILambdaAstroSiteProps) {
    super(scope, id)
    const utils = new Utils()

    this.handler = new NodejsFunction(this, "Handler", {
      runtime: utils.stringToRuntime(props?.runtime || "nodejs18.x"),
      entry: props.entry,
    })

    const integration = new HttpLambdaIntegration(
      "AstroIntegration",
      this.handler,
    )

    this.api = new HttpApi(this, "HttpApi", {
      corsPreflight: {
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ["*"],
      },
    })

    this.api.addRoutes({
      path: "/",
      methods: [HttpMethod.ANY],
      integration: integration,
    })

    new CfnOutput(this, "APIEndpoint", {
      description: "API Endpoint",
      value: this.api.apiEndpoint,
    })
  }
}

/**
 * Transform runtime string to Rumtime
 *
 * @param s
 * @returns
 */
export function stringToRuntime(s: string): Runtime {
  switch (s) {
    case "nodejs14.x": {
      return Runtime.NODEJS_14_X
    }
    case "nodejs16.x": {
      return Runtime.NODEJS_16_X
    }
    default: {
      return Runtime.NODEJS_18_X
    }
  }
}
