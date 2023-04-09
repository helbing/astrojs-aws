import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import { Fn } from "aws-cdk-lib"
import { AllowedMethods, Distribution } from "aws-cdk-lib/aws-cloudfront"
import { HttpOrigin } from "aws-cdk-lib/aws-cloudfront-origins"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { LambdaAstroSiteProps } from "./types"

export class LambdaAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly function: NodejsFunction
  private readonly httpApi: HttpApi
  private readonly distribution: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly distributionDomainName: string
  readonly domainName: string

  constructor(scope: Construct, id: string, props: LambdaAstroSiteProps) {
    super(scope, id)

    this.bucket = this.newBucket(this, props.staticDir, props.bucketOptions)
    this.function = this.newFunction(
      this,
      props.serverEntry,
      props.serverOptions,
    )

    this.httpApi = new HttpApi(this, "HttpApi", {
      ...props.httpApiOptions,
    })
    const integration = new HttpLambdaIntegration(
      "HttpLambdaIntegration",
      this.function,
    )
    this.httpApi.addRoutes({
      path: "/",
      methods: [HttpMethod.ANY],
      integration: integration,
    })

    this.distribution = new Distribution(this, "Distribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        ...props.distributionDefaultBehaviorOptions,
        origin: new HttpOrigin(
          Fn.select(1, Fn.split("://", this.httpApi.apiEndpoint ?? "")),
        ),
        allowedMethods:
          props.distributionDefaultBehaviorOptions?.allowedMethods ??
          AllowedMethods.ALLOW_ALL,
      },
    })

    const routes = this.parseRoutesFromDir(props.staticDir)
    const s3Origin = this.newS3Origin(this, this.bucket)
    for (const route of routes) {
      this.distribution.addBehavior(route, s3Origin)
    }

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.distributionDomainName = this.distribution.distributionDomainName
    this.domainName = this.distribution.domainName
  }
  /**
   *  Returns lambda function
   *
   * @returns
   */
  lambdaFunction() {
    return this.function
  }
  /**
   * return http api
   *
   * @returns
   */
  api() {
    return this.httpApi
  }
}
