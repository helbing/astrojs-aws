import { HttpApi, HttpMethod } from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpUrlIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import {
  BehaviorOptions,
  CachePolicy,
  Distribution,
} from "aws-cdk-lib/aws-cloudfront"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { LambdaAstroSiteProps } from "./types"

export class LambdaAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly function: NodejsFunction
  private readonly httpApi: HttpApi
  private readonly distribution?: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly functionArn: string
  readonly functionName: string
  readonly distributionId: string
  readonly domains: string[]

  constructor(scope: Construct, id: string, props: LambdaAstroSiteProps) {
    super(scope, id)

    const cfEnabled = props.cfOptions != undefined
    const domains = []

    this.bucket = this.newBucket(this, !cfEnabled)
    this.function = this.newFunction(
      this,
      props.serverEntry,
      props.serverOptions,
    )

    this.httpApi = this.newHttpApiGw(this, this.function, props.gwOptions)

    if (!cfEnabled) {
      domains.push(`http://${this.bucket.bucketWebsiteDomainName}`)

      // add http integration routes
      const routes = this.parseRoutesFromDir(props.staticDir)
      for (const [path, route] of Object.entries(routes)) {
        this.httpApi.addRoutes({
          path: path,
          methods: [HttpMethod.GET],
          integration: new HttpUrlIntegration(
            path,
            `http://${this.bucket.bucketWebsiteDomainName}${route}`,
          ),
        })
      }
    } else {
      const defaultBehavior: BehaviorOptions = {
        origin: this.newHttpApiGatewayOrigin(this.httpApi),
        cachePolicy: CachePolicy.CACHING_DISABLED,
      }
      this.distribution = this.newDistribution(
        this,
        defaultBehavior,
        props.cfOptions,
      )

      const routes = this.parseRoutesFromDir(props.staticDir, true)
      for (const [path] of Object.entries(routes)) {
        this.distribution.addBehavior(path, this.newS3Origin(this, this.bucket))
      }

      domains.push(`https://${this.distribution.distributionDomainName}`)
      domains.push(`https://${props.cfOptions?.domain ?? ""}`)
    }

    new BucketDeployment(this, "BucketDeployment", {
      sources: [Source.asset(props.staticDir)],
      destinationBucket: this.bucket,
      distribution: this.distribution,
    })

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.functionArn = this.function.functionArn
    this.functionName = this.function.functionName
    this.distributionId = this.distribution?.distributionId ?? ""
    this.domains = domains
  }
}
