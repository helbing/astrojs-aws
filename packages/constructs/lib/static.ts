import { CfnOutput } from "aws-cdk-lib"
import {
  AddBehaviorOptions,
  Distribution,
  IOrigin,
} from "aws-cdk-lib/aws-cloudfront"
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
import { Bucket, LifecycleRule } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { StaticAstroSiteProps } from "./types"

export class StaticAstroSite extends AstroSiteConstruct {
  /**
   * The bucket
   */
  readonly bucket: Bucket
  /**
   * The cloudfront distribution
   */
  readonly distribution: Distribution

  constructor(scope: Construct, id: string, props: StaticAstroSiteProps) {
    super(scope, id)

    this.bucket = new Bucket(this, "StaticAstroSiteBucket", {
      ...props.bucketOptions,
    })

    new BucketDeployment(this, "StaticAstroSiteBucketDeployment", {
      ...props.bucketDeploymentOptions,
      sources: [Source.asset(props.staticDir)],
      destinationBucket: this.bucket,
    })

    // set default root object
    let defaultRootObject = props.distributionOptions?.defaultRootObject
    if (defaultRootObject == undefined) {
      defaultRootObject = "index.html"
    }
    this.distribution = new Distribution(this, "StaticAstroSiteDistribution", {
      ...props.distributionOptions,
      defaultRootObject,
      defaultBehavior: {
        origin: new S3Origin(this.bucket),
      },
    })

    new CfnOutput(this, "BucketArn", { value: this.bucket.bucketArn })
    new CfnOutput(this, "BucketName", { value: this.bucket.bucketName })
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
