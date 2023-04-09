import * as fs from "fs"
import * as path from "path"

import { RemovalPolicy } from "aws-cdk-lib"
import { OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront"
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Bucket, BucketProps } from "aws-cdk-lib/aws-s3"
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment"
import { Construct } from "constructs"

import { ServerOptions } from "./types"

/**
 * The base class for all constructs.
 */
export class AstroSiteConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
  }
  /**
   * New bucket
   *
   * @param scope
   * @param staticDir
   * @param props
   * @returns
   */
  newBucket(scope: Construct, staticDir: string, props?: BucketProps) {
    const removalPolicy = props?.removalPolicy ?? RemovalPolicy.DESTROY
    const autoDeleteObjects = props?.autoDeleteObjects ?? true
    const bucket = new Bucket(scope, "Static", {
      ...props,
      removalPolicy,
      autoDeleteObjects,
    })

    new BucketDeployment(scope, "BucketDeployment", {
      sources: [Source.asset(staticDir)],
      destinationBucket: bucket,
    })

    return bucket
  }
  /**
   * New nodejs function
   *
   * @param scope
   * @param serverEntry
   * @param props
   * @returns
   */
  newFunction(scope: Construct, serverEntry: string, props?: ServerOptions) {
    const runtime = this.strToRuntime(props?.runtime)
    return new NodejsFunction(scope, "Function", {
      ...props,
      runtime,
      entry: serverEntry,
    })
  }
  /**
   * New S3 origin
   * @param scope
   * @param bucket
   * @returns
   */
  newS3Origin(scope: Construct, bucket: Bucket) {
    const originAccessIdentity = new OriginAccessIdentity(
      scope,
      "OriginAccessIdentity",
      {
        comment: `Allows CloudFront to reach the bucket ${bucket.bucketName}`,
      },
    )
    bucket.grantRead(originAccessIdentity)

    return new S3Origin(bucket, { originAccessIdentity })
  }
  /**
   * Transform string to Runtime
   *
   * @param str
   * @returns
   * @default Runtime.NODEJS_18_X
   */
  strToRuntime(str?: string): Runtime {
    if (str == "nodejs16.x") return Runtime.NODEJS_16_X
    return Runtime.NODEJS_18_X
  }
  /**
   * Parse routes from directory
   * if the item is directory will parse to /item/*
   * if the item is file will parse to /item
   *
   * @param dir
   * @returns
   */
  parseRoutesFromDir(dir: string): string[] {
    const routes: string[] = []
    const items = fs.readdirSync(dir)
    for (const item of items) {
      if (fs.lstatSync(path.join(dir, item)).isDirectory()) {
        routes.push(`/${item}/*`)
      } else {
        routes.push(`/${item}`)
      }
    }
    return routes
  }
}
