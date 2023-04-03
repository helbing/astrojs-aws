import { HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha"
import { CfnOutput } from "aws-cdk-lib"
import { Distribution } from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
// import { Bucket } from "aws-cdk-lib/aws-s3"
// import { BucketDeployment } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
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

  /**
   * CloudFront distribution
   */
  public readonly distribution: Distribution

  constructor(scope: Construct, id: string, props: AstroSiteProps) {
    super(scope, id, props)

    // this.s3 = new Bucket(this, "Bucket", {
    //   bucketName: "helbing-AstroSite",
    //   removalPolicy: RemovalPolicy.DESTROY,
    // })

    this.handler = this.createNodejsFunction()
    this.api = this.createHttpApi(this.handler)
    this.distribution = this.createCloudFrontDistribution(this.api)

    new CfnOutput(this, "CloudFrontDomainName", {
      value: this.distribution.distributionDomainName,
    })
  }
}
