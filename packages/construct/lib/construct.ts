import * as fs from "fs"
import * as path from "path"

import { HttpApi } from "@aws-cdk/aws-apigatewayv2-alpha"
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha"
import { Fn, RemovalPolicy } from "aws-cdk-lib"
import { Certificate } from "aws-cdk-lib/aws-certificatemanager"
import {
  BehaviorOptions,
  Distribution,
  HttpVersion,
  OriginAccessIdentity,
  PriceClass,
} from "aws-cdk-lib/aws-cloudfront"
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins"
import { Runtime } from "aws-cdk-lib/aws-lambda"
import { LogLevel, NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

import { AssetsOptions, CfOptions, GwOptions, ServerOptions } from "./types"

/**
 * The base class for all constructs.
 */
export class AstroSiteConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
  }
  /**
   * New bucket.
   *
   * @param scope
   * @param whEnabled
   * @param props
   * @returns
   */
  newBucket(scope: Construct, whEnabled: boolean, props?: AssetsOptions) {
    const publicAccess: {
      publicReadAccess?: boolean
      blockPublicAccess?: BlockPublicAccess
    } = whEnabled
      ? {
          publicReadAccess: true,
          blockPublicAccess: new BlockPublicAccess({
            blockPublicAcls: false,
            blockPublicPolicy: false,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
          }),
        }
      : {}

    return new Bucket(scope, "StaticAssets", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: whEnabled
        ? props?.indexhtml ?? "index.html"
        : undefined,
      websiteErrorDocument: whEnabled
        ? props?.errorhtml ?? "error.html"
        : undefined,
      cors: props?.cors,
      ...publicAccess,
    })
  }
  /**
   * New nodejs function.
   *
   * @param scope
   * @param serverEntry
   * @param props
   * @returns
   */
  newFunction(scope: Construct, serverEntry: string, props?: ServerOptions) {
    const runtime = this.strToRuntime(props?.runtime)
    return new NodejsFunction(scope, "SSRFunction", {
      ...props,
      bundling: {
        ...props?.bundling,
        logLevel: props?.bundling?.logLevel ?? LogLevel.ERROR,
      },
      runtime,
      entry: serverEntry,
    })
  }
  /**
   * New HttpApi Gateway.
   *
   * @param scope
   * @param fn
   * @param props
   * @returns
   */
  newHttpApiGw(scope: Construct, fn: NodejsFunction, props?: GwOptions) {
    return new HttpApi(scope, "HttpApi", {
      corsPreflight: props?.cors,
      defaultAuthorizer: props?.authorizer,
      defaultAuthorizationScopes: props?.authorizationScopes,
      defaultIntegration: new HttpLambdaIntegration(
        "HttpLambdaIntegration",
        fn,
      ),
    })
  }
  /**
   * New S3 origin.
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
   * New HttpApi Gateway origin.
   *
   * @param httpApi
   * @returns
   */
  newHttpApiGatewayOrigin(httpApi: HttpApi) {
    return new HttpOrigin(
      Fn.select(1, Fn.split("://", httpApi.apiEndpoint ?? "")),
    )
  }
  /**
   * New CloudFront distribution.
   *
   * @param scope
   * @param defaultBehavior
   * @param props
   */
  newDistribution(
    scope: Construct,
    defaultBehavior: BehaviorOptions,
    props?: CfOptions,
  ) {
    const edgeLambdas = [
      ...(defaultBehavior.edgeLambdas ?? []),
      ...(props?.edgeFunctions ?? []),
    ]
    const functionAssociations = [
      ...(defaultBehavior.functionAssociations ?? []),
      ...(props?.cfFunctions ?? []),
    ]

    return new Distribution(scope, "Distribution", {
      domainNames: [props?.domain ?? ""],
      certificate: Certificate.fromCertificateArn(
        this,
        `Certificate-${props?.domain ?? ""}`,
        props?.certificateArn ?? "",
      ),
      geoRestriction: props?.geoRestriction,
      logBucket: props?.logBucket,
      logIncludesCookies: props?.logIncludesCookies,
      logFilePrefix: props?.logFilePrefix,
      priceClass: props?.priceClass ?? PriceClass.PRICE_CLASS_200,
      webAclId: props?.webACLId,
      errorResponses: props?.errorResponses,
      httpVersion: HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        ...defaultBehavior,
        edgeLambdas: edgeLambdas,
        functionAssociations: functionAssociations,
      },
    })
  }
  /**
   * Transform string to Runtime.
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
   * Parse routes from directory.
   * if the item is directory will parse to {"/item/*": "/item/*"} or {"/item/{proxy+}": "/item/{proxy}"}
   * if the item is file will parse to {"/item": "/item"}
   *
   * @param dir
   * @param isCf CloudFront route or not, HttpApi Gateway route by defauly, default false
   * @returns
   */
  parseRoutesFromDir(dir: string, isCf?: boolean): { [key: string]: string } {
    const map: { [key: string]: string } = {}
    const items = fs.readdirSync(dir)
    for (const item of items) {
      if (fs.lstatSync(path.join(dir, item)).isDirectory()) {
        if (isCf ?? false) {
          map[`/${item}/*`] = `/${item}/*`
        } else {
          map[`/${item}/{proxy+}`] = `/${item}/{proxy}`
        }
      } else {
        map[`/${item}`] = `/${item}`
      }
    }
    return map
  }
}
