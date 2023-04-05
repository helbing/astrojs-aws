import { CfnOutput } from "aws-cdk-lib"
import {
  AddBehaviorOptions,
  AllowedMethods,
  Distribution,
  IOrigin,
  LambdaEdgeEventType,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront"
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
import { Version } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket, LifecycleRule } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { EdgeAstroSiteProps } from "./types"

export class EdgeAstroSite extends AstroSiteConstruct {
  /**
   * S3 bucket
   */
  readonly bucket: Bucket
  /**
   * Lambda function handler
   */
  readonly handler: NodejsFunction
  /**
   * CloudFront distribution
   */
  readonly distribution: Distribution

  constructor(scope: Construct, id: string, props: EdgeAstroSiteProps) {
    super(scope, id)

    this.bucket = new Bucket(this, "EdgeAstroSiteBucket", {
      ...props.bucketOptions,
    })
    new BucketDeployment(this, "EdgeAstroSiteBucketDeployment", {
      ...props.bucketDeploymentOptions,
      sources: [Source.asset(props.staticDir)],
      destinationBucket: this.bucket,
    })

    const runtime = this.strToRuntime(props.serverOptions?.runtime)
    this.handler = new NodejsFunction(this, "EdgeAstroSiteHandler", {
      ...props.serverOptions,
      entry: props.serverEntry,
      runtime: runtime,
    })

    const functionVersion = new Version(this, "EdgeAstroSiteHandlerVersion", {
      lambda: this.handler,
    })
    this.distribution = new Distribution(this, "EdgeAstroSiteDistribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        origin: new S3Origin(this.bucket),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion,
            includeBody: true,
          },
        ],
      },
    })

    new CfnOutput(this, "BucketArn", { value: this.bucket.bucketArn })
    new CfnOutput(this, "BucketName", { value: this.bucket.bucketName })
    new CfnOutput(this, "FunctionArn", { value: this.handler.functionArn })
    new CfnOutput(this, "FunctionName", { value: this.handler.functionName })
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
}
