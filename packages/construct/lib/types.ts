import {
  CorsPreflightOptions,
  IHttpRouteAuthorizer,
} from "@aws-cdk/aws-apigatewayv2-alpha"
import {
  EdgeLambda,
  ErrorResponse,
  FunctionAssociation,
  GeoRestriction,
  PriceClass,
} from "aws-cdk-lib/aws-cloudfront"
import { FunctionOptions } from "aws-cdk-lib/aws-lambda"
import { BundlingOptions } from "aws-cdk-lib/aws-lambda-nodejs"
import { CorsRule, IBucket } from "aws-cdk-lib/aws-s3"

/**
 * The options for the StaticAstroSite
 */
export interface StaticAstroSiteProps extends AssetsOptions {
  /**
   * The directory of built files, e.g. path.join(__dirname, "../dist")
   */
  readonly siteDir: string
  /**
   * The options for the CloudFront distribution.
   *
   * @default - No CloudFront distribution, if not equal to undefined, CloudFront auto-enabled.
   */
  readonly cfOptions?: CfOptions
}
/**
 * The options for the LambdaAstroSite
 */
export interface LambdaAstroSiteProps {
  /**
   * The server entry file, e.g. path.join(__dirname, "../server/entry.mjs").
   */
  readonly serverEntry: string
  /**
   * The directory of static files, e.g. path.join(__dirname, "../dist/client").
   */
  readonly staticDir: string
  /**
   * The server options.
   */
  readonly serverOptions?: ServerOptions
  /**
   * HttpApi Gateway options.
   */
  readonly gwOptions?: GwOptions
  /**
   * The options for the CloudFront distribution. Recommended to use CloudFront for production.
   *
   * @default - No CloudFront distribution, if not equal to undefined, CloudFront auto-enabled.
   */
  readonly cfOptions?: CfOptions
}
/**
 * The options for the EdgeAstroSite
 */
export interface EdgeAstroSiteProps {
  /**
   * The server entry file, e.g. path.join(__dirname, "../server/entry.mjs")
   */
  readonly serverEntry: string
  /**
   * The directory of static files, e.g. path.join(__dirname, "../dist/client")
   */
  readonly staticDir: string
  /**
   * Only deploy the lambda function for testing, no S3 Bucket and CloudFront.
   * Edge function only works in CloudFront, but it really deploy too slow.
   *
   * @default - false
   */
  readonly onlyLambda?: boolean
  /**
   * The server options
   */
  readonly serverOptions?: ServerOptions
  /**
   * The options for the CloudFront distribution. CloudFront is required, unless `onlyLambda` is true.
   *
   * @default - undefined
   */
  readonly cfOptions?: CfOptions
}
/**
 * The options for the Assets
 */
export interface AssetsOptions {
  /**
   * Index document for the website.
   *
   * @default - index.html
   */
  readonly indexhtml?: string
  /**
   * Error document for the website.
   *
   * @default - error.html
   */
  readonly errorhtml?: string
  /**
   * The CORS configuration of this bucket.
   *
   * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html
   *
   * @default - No CORS configuration.
   */
  readonly cors?: CorsRule[]
}
/**
 * The options for the lambda function
 */
export interface ServerOptions extends FunctionOptions {
  /**
   * The Nodejs Runtime
   *
   * @default nodejs18.x
   */
  readonly runtime?: "nodejs16.x" | "nodejs18.x"
  /**
   * Bundling options
   */
  readonly bundling?: BundlingOptions
}
/**
 * The options for the CloudFront distribution
 */
export interface GwOptions {
  /**
   * Specifies a CORS configuration for an API.
   *
   * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
   *
   * @default - CORS disabled.
   */
  readonly cors?: CorsPreflightOptions
  /**
   * Authorizer to applied to the gateway
   *
   * @default - No authorizer
   */
  readonly authorizer?: IHttpRouteAuthorizer
  /**
   * OIDC scopes attached to the gateway.
   *
   * @default - no default authorization scopes
   */
  readonly authorizationScopes?: string[]
}
/**
 * CloudFront options.
 */
export interface CfOptions {
  /**
   * Domains of the website.
   */
  readonly domain: string
  /**
   * Use a custom certificate for the distribution from AWS Certificate Manager (ACM).
   *
   * @see https://aws.amazon.com/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/
   */
  readonly certificateArn: string
  /**
   * Controls the countries in which your content is distributed.
   *
   * @default No geo restriction
   */
  readonly geoRestriction?: GeoRestriction
  /**
   * The Amazon S3 bucket to store the access logs in.
   *
   * @default - if no specified, logs will be disabled.
   */
  readonly logBucket?: IBucket
  /**
   * Specifies whether you want CloudFront to include cookies in access logs
   *
   * @default false
   */
  readonly logIncludesCookies?: boolean
  /**
   * An optional string that you want CloudFront to prefix to the access log filenames for this distribution.
   *
   * @default - no prefix
   */
  readonly logFilePrefix?: string
  /**
   * The price class for the distribution (this impacts how many locations CloudFront uses for your distribution, and billing)
   *
   * @default PriceClass.PRICE_CLASS_200
   */
  readonly priceClass?: PriceClass
  /**
   * Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.
   *
   * To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
   * `arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.
   *
   * To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.
   *
   * @see https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html
   * @see https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.
   *
   * @default - No AWS Web Application Firewall web access control list (web ACL).
   */
  readonly webACLId?: string
  /**
   * How CloudFront should handle requests that are not successful (e.g., PageNotFound).
   *
   * @default - No custom error responses.
   */
  readonly errorResponses?: ErrorResponse[]
  /**
   * The Lambda@Edge functions to invoke before serving the contents.
   *
   * @default - no Lambda functions will be invoked
   *
   * @see https://aws.amazon.com/lambda/edge
   */
  readonly edgeFunctions?: EdgeLambda[]
  /**
   * The CloudFront functions to invoke before serving the contents.
   *
   * @default - no new functions will be invoked
   */
  readonly cfFunctions?: FunctionAssociation[]
}
