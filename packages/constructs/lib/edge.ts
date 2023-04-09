import {
  AllowedMethods,
  Distribution,
  LambdaEdgeEventType,
} from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { EdgeAstroSiteProps } from "./types"

export class EdgeAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly function: NodejsFunction
  private readonly distribution: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly distributionDomainName: string
  readonly domainName: string

  constructor(scope: Construct, id: string, props: EdgeAstroSiteProps) {
    super(scope, id)

    this.bucket = this.newBucket(this, props.staticDir, props.bucketOptions)
    this.function = this.newFunction(
      this,
      props.serverEntry,
      props.serverOptions,
    )

    this.function.grantInvokeUrl
    this.distribution = new Distribution(this, "Distribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        ...props.distributionDefaultBehaviorOptions,
        origin: this.newS3Origin(this, this.bucket),
        allowedMethods:
          props.distributionDefaultBehaviorOptions?.allowedMethods ??
          AllowedMethods.ALLOW_ALL,
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: this.function.currentVersion,
            includeBody: true,
          },
          ...(props.distributionDefaultBehaviorOptions?.edgeLambdas ?? []),
        ],
      },
    })

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.distributionDomainName = this.distribution.distributionDomainName
    this.domainName = this.distribution.domainName
  }
  /**
   * Get edge function
   *
   * @returns
   */
  GetFunction() {
    return this.function
  }
}
