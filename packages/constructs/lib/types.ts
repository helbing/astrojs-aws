import { HttpApiProps } from "@aws-cdk/aws-apigatewayv2-alpha"
import { FunctionOptions, Runtime } from "aws-cdk-lib/aws-lambda"
import { BundlingOptions } from "aws-cdk-lib/aws-lambda-nodejs"
import {} from "aws-cdk-lib/aws-s3"

export interface AstroSiteProps {
  /**
   * The server entry file, e.g. path.join(__dirname, "../server/entry.mjs")
   */
  readonly serverEntry: string

  /**
   * The directory of client, e.g. path.join(__dirname, "../dist/client")
   */
  readonly client: string

  /**
   * The server options
   */
  readonly serverOptions?: AstroSiteServerProps

  /**
   * Http Api options
   */
  readonly httpApiOptions?: HttpApiProps
}

export interface AstroSiteServerProps extends FunctionOptions {
  /**
   * The Nodejs Runtime
   *
   * @default Runtime.NODEJS_14_X
   */
  readonly runtime?: Runtime

  /**
   * Bundling options
   */
  readonly bundling?: BundlingOptions
}
