import {
  BehaviorOptions,
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
} from "aws-cdk-lib/aws-cloudfront"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { StaticAstroSiteProps } from "./types"

export class StaticAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly distribution?: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly distributionId: string
  readonly domains: string[]

  constructor(scope: Construct, id: string, props: StaticAstroSiteProps) {
    super(scope, id)

    const cfEnabled = props.cfOptions != undefined
    const domains = []

    this.bucket = this.newBucket(this, !cfEnabled, {
      indexhtml: props.indexhtml,
      errorhtml: props.errorhtml,
      cors: props.cors,
    })

    if (!cfEnabled) {
      domains.push(`http://${this.bucket.bucketWebsiteDomainName}`)
    } else {
      // add index.html in uri by default for subpaths
      const fn = new Function(this, "RedirectToIndexFunction", {
        code: FunctionCode.fromInline(`
          function handler(event) {
            var request = event.request
            if (request.uri.endsWith("/")) {
              request.uri += "${props.indexhtml ?? "index.html"}"
            } else if (!request.uri.includes(".")) {
              request.uri += "/${props.indexhtml ?? "index.html"}"
            }
            return request
          }
        `),
      })

      const defaultBehavior: BehaviorOptions = {
        origin: this.newS3Origin(this, this.bucket),
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: fn,
          },
        ],
      }
      this.distribution = this.newDistribution(
        this,
        defaultBehavior,
        props.cfOptions,
      )

      domains.push(`https://${this.distribution.distributionDomainName}`)
      domains.push(`https://${props.cfOptions?.domain ?? ""}`)
    }

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset(props.siteDir)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
      distributionPaths: this.distribution == undefined ? undefined : ["/*"],
    })

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.distributionId = this.distribution?.distributionId ?? ""
    this.domains = domains
  }
}
