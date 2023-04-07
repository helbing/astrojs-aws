import { CfnOutput } from "aws-cdk-lib"
import {
  AddBehaviorOptions,
  AllowedMethods,
  Distribution,
  IOrigin,
  LambdaEdgeEventType,
  OriginAccessIdentity,
  OriginRequestPolicy,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront"
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
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
   * Lambda function
   */
  readonly function: NodejsFunction
  /**
   * CloudFront distribution
   */
  readonly distribution: Distribution

  constructor(scope: Construct, id: string, props: EdgeAstroSiteProps) {
    super(scope, id)

    this.bucket = new Bucket(this, "Bucket", {
      ...props.bucketOptions,
    })
    new BucketDeployment(this, "BucketDeployment", {
      ...props.bucketDeploymentOptions,
      sources: [Source.asset(props.staticDir)],
      destinationBucket: this.bucket,
    })

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity",
    )
    this.bucket.grantRead(originAccessIdentity)

    const runtime = this.strToRuntime(props.serverOptions?.runtime)
    this.function = new NodejsFunction(this, "EdgeFunction", {
      ...props.serverOptions,
      runtime,
      entry: props.serverEntry,
    })

    this.distribution = new Distribution(this, "Distribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        origin: new S3Origin(this.bucket, { originAccessIdentity }),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        originRequestPolicy: OriginRequestPolicy.USER_AGENT_REFERER_HEADERS,
        responseHeadersPolicy:
          ResponseHeadersPolicy.CORS_ALLOW_ALL_ORIGINS_WITH_PREFLIGHT_AND_SECURITY_HEADERS,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: this.function.currentVersion,
            includeBody: true,
          },
        ],
      },
    })

    new CfnOutput(this, "BucketArn", { value: this.bucket.bucketArn })
    new CfnOutput(this, "BucketName", { value: this.bucket.bucketName })
    new CfnOutput(this, "FunctionArn", { value: this.function.functionArn })
    new CfnOutput(this, "FunctionName", { value: this.function.functionName })
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
