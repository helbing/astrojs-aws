import { HttpApiProps } from "@aws-cdk/aws-apigatewayv2-alpha"
import { FunctionOptions } from "aws-cdk-lib/aws-lambda"
import { BundlingOptions } from "aws-cdk-lib/aws-lambda-nodejs"

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
   * @default nodejs18.x
   */
  readonly runtime?: "nodejs16.x" | "nodejs18.x"

  /**
   * Bundling options
   */
  readonly bundling?: BundlingOptions
}
