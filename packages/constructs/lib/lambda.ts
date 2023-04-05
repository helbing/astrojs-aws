import {
  AddRoutesOptions,
  HttpApi,
  HttpMethod,
  HttpRoute,
  HttpStage,
  HttpStageOptions,
} from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import { CfnOutput, Fn } from "aws-cdk-lib"
import {
  AddBehaviorOptions,
  AllowedMethods,
  Distribution,
  IOrigin,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront"
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket, LifecycleRule } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { LambdaAstroSiteProps } from "./types"

export class LambdaAstroSite extends AstroSiteConstruct {
  /**
   * S3 bucket
   */
  readonly bucket: Bucket
  /**
   * Lambda function handler
   */
  readonly handler: NodejsFunction
  /**
   * HTTP API
   */
  readonly httpApi: HttpApi
  /**
   * CloudFront distribution
   */
  readonly distribution: Distribution

  constructor(scope: Construct, id: string, props: LambdaAstroSiteProps) {
    super(scope, id)

    this.bucket = new Bucket(this, "LambdaAstroSiteBucket", {
      ...props.bucketOptions,
    })
    new BucketDeployment(this, "LambdaAstroSiteBucketDeployment", {
      ...props.bucketDeploymentOptions,
      sources: [Source.asset(props.staticDir)],
      destinationBucket: this.bucket,
    })

    const runtime = this.strToRuntime(props.serverOptions?.runtime)
    this.handler = new NodejsFunction(this, "LambdaAstroSiteHandler", {
      ...props.serverOptions,
      entry: props.serverEntry,
      runtime: runtime,
    })

    this.httpApi = new HttpApi(this, "LambdaAstroSiteHttpApi", {
      ...props.httpApiOptions,
    })
    const integration = new HttpLambdaIntegration(
      "HttpLambdaIntegration",
      this.handler,
    )
    this.httpApi.addRoutes({
      path: "/",
      methods: [HttpMethod.ANY],
      integration: integration,
    })

    this.distribution = new Distribution(this, "LambdaAstroSiteDistribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        origin: new HttpOrigin(
          Fn.select(1, Fn.split("://", this.httpApi.apiEndpoint ?? "")),
        ),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    })
    const routes = this.parseRoutesFromDir(props.staticDir)
    for (const route of routes) {
      this.distribution.addBehavior(route, new S3Origin(this.bucket), {
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      })
    }

    new CfnOutput(this, "CloudFrontDomainName", {
      value: this.distribution.domainName,
    })
  }
  /**
   * Add a lifecycle rule to the bucket
   *
   * @param rule
   */
  addBucketLifecycleRule(rule: LifecycleRule) {
    this.bucket.addLifecycleRule(rule)
  }
  /**
   * Adds a new behavior to this distribution for the given pathPattern.
   *
   * @param pathPattern the path pattern (e.g., 'images/*') that specifies which requests to apply the behavior to.
   * @param origin the origin to use for this behavior
   * @param behaviorOptions the options for the behavior at this path.
   */
  addDistributionBehavior(
    pathPattern: string,
    origin: IOrigin,
    behaviorOptions?: AddBehaviorOptions,
  ) {
    this.distribution?.addBehavior(pathPattern, origin, behaviorOptions)
  }
  /**
   * Add a new stage.
   */
  addHttpApiStage(id: string, options: HttpStageOptions): HttpStage {
    return this.httpApi.addStage(id, options)
  }
  /**
   * Add multiple routes that uses the same configuration. The routes all go to the same path, but for different
   * methods.
   */
  addHttpApiRoutes(options: AddRoutesOptions): HttpRoute[] {
    return this.httpApi.addRoutes(options)
  }
}
