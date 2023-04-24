import {
  AllowedMethods,
  BehaviorOptions,
  Distribution,
  LambdaEdgeEventType,
} from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { EdgeAstroSiteProps } from "./types"

export class EdgeAstroSite extends AstroSiteConstruct {
  private readonly bucket?: Bucket
  private readonly function: NodejsFunction
  private readonly distribution?: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly functionArn: string
  readonly functionName: string
  readonly distributionId: string
  readonly domains: string[]

  constructor(scope: Construct, id: string, props: EdgeAstroSiteProps) {
    super(scope, id)

    const domains: string[] = []

    this.function = this.newFunction(
      this,
      props.serverEntry,
      props.serverOptions,
    )

    if (!(props.onlyLambda ?? false)) {
      this.bucket = this.newBucket(this, false)

      const defaultBehavior: BehaviorOptions = {
        origin: this.newS3Origin(this, this.bucket),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: this.function.currentVersion,
            includeBody: true,
          },
        ],
      }
      this.distribution = this.newDistribution(
        this,
        defaultBehavior,
        props.cfOptions,
      )

      new BucketDeployment(this, "BucketDeployment", {
        sources: [Source.asset(props.staticDir)],
        destinationBucket: this.bucket,
        distribution: this.distribution,
      })

      domains.push(`https://${this.distribution.distributionDomainName}`)
      domains.push(`https://${props.cfOptions?.domain ?? ""}`)
    }

    this.bucketArn = this.bucket?.bucketArn ?? ""
    this.bucketName = this.bucket?.bucketName ?? ""
    this.functionArn = this.function.functionArn
    this.functionName = this.function.functionName
    this.distributionId = this.distribution?.distributionId ?? ""
    this.domains = domains
  }
}
