import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
// import { CloudFrontWebDistribution } from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
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
   * create nodejs function
   *
   * @returns
   */
  createNodejsFunction() {
    return new NodejsFunction(this, "Handler", {
      ...this.props.serverOptions,
      entry: this.props.serverEntry,
    })
  }

  /**
   * create Http Api Gateway
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

  // createCloudFrontDistribution(handler: NodejsFunction) {
  //   new CloudFrontWebDistribution(this, "Distribution", {
  //     originConfigs: [
  //       {
  //         customOriginSource: {
  //           domainName: "",
  //         },
  //         behaviors: [],
  //       },
  //     ],
  //   })
  // }
}
