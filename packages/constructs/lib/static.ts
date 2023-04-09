import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
} from "aws-cdk-lib/aws-cloudfront"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { StaticAstroSiteProps } from "./types"

export class StaticAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly distribution: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly distributionDomainName: string
  readonly domainName: string

  constructor(scope: Construct, id: string, props: StaticAstroSiteProps) {
    super(scope, id)

    this.bucket = this.newBucket(this, props.staticDir, props.bucketOptions)

    // add index.html in uri by default for every directories
    const fn = new Function(this, "RedirectToIndexFunction", {
      code: FunctionCode.fromInline(`
        function handler(event) {
          var request = event.request
          if (request.uri.endsWith("/")) {
            request.uri += "index.html";
          } else if (!request.uri.includes(".")) {
            request.uri += "/index.html";
          }
          return request
        }
      `),
    })

    this.distribution = new Distribution(this, "Distribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        ...props.distributionDefaultBehaviorOptions,
        origin: this.newS3Origin(this, this.bucket),
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: fn,
          },
          ...(props.distributionDefaultBehaviorOptions?.functionAssociations ??
            []),
        ],
      },
    })

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.distributionDomainName = this.distribution.distributionDomainName
    this.domainName = this.distribution.domainName
  }
}
