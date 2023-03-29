import { HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha"
import { CfnOutput } from "aws-cdk-lib"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
// import { Bucket } from "aws-cdk-lib/aws-s3"
// import { BucketDeployment } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./shared"
import { AstroSiteProps } from "./types"

export class LambdaAstroSite extends AstroSiteConstruct {
  /**
   * Lambda function handler
   */
  public readonly handler: NodejsFunction

  /**
   * HTTP API
   */
  public readonly api: HttpApi

  constructor(scope: Construct, id: string, props: AstroSiteProps) {
    super(scope, id, props)

    // this.s3 = new Bucket(this, "Bucket", {
    //   bucketName: "helbing-AstroSite",
    //   removalPolicy: RemovalPolicy.DESTROY,
    // })

    this.handler = this.createNodejsFunction()
    this.api = this.createHttpApi(this.handler)

    new CfnOutput(this, "APIEndpoint", {
      value: this.api.apiEndpoint,
    })
  }
}
