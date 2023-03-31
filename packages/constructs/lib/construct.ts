import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import {
  CloudFrontWebDistribution,
  SourceConfiguration,
} from "aws-cdk-lib/aws-cloudfront"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"

import { AstroSiteProps } from "./types"

/**
 * The base class for all constructs.
 */
export class AstroSiteConstruct extends Construct {
  private props: AstroSiteProps

  constructor(scope: Construct, id: string, props: AstroSiteProps) {
    super(scope, id)

    this.props = props
  }

  /**
   * Create nodejs function
   *
   * @returns
   */
  createNodejsFunction() {
    const runtime = this.strToRuntime(this.props.serverOptions?.runtime)
    const props: NodejsFunctionProps = {
      ...this.props.serverOptions,
      entry: this.props.serverEntry,
      runtime: runtime,
    }
    return new NodejsFunction(this, "Handler", props)
  }

  /**
   * Create Http Api Gateway
   *
   * @param handler
   * @returns
   */
  createHttpApi(handler: NodejsFunction) {
    const api = new HttpApi(this, "HttpApi", {
      ...this.props.httpApiOptions,
    })

    const integration = new HttpLambdaIntegration(
      "HttpLambdaIntegration",
      handler,
    )

    api.addRoutes({
      path: "/",
      methods: [HttpMethod.ANY],
      integration: integration,
    })

    return api
  }

  /**
   * Create cloudfront
   *
   * @param sources
   * @returns
   */
  createCloudFrontDistribution(sources: SourceConfiguration[]) {
    const originConfigs = (
      this.props.distributionOptions?.originConfigs ?? []
    ).concat(sources)

    return new CloudFrontWebDistribution(this, "Distribution", {
      ...this.props.distributionOptions,
      originConfigs: originConfigs,
    })
  }

  /**
   * Transform string to Runtime
   *
   * @param str
   * @returns
   */
  private strToRuntime(str?: string): Runtime {
    if (str == "nodejs16.x") return Runtime.NODEJS_16_X
    else return Runtime.NODEJS_18_X
  }
}
