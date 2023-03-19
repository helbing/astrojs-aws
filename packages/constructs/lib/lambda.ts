import { Runtime } from "aws-cdk-lib/aws-lambda"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"

export interface ILambdaAstroSiteProps {
  /**
   * Nodejs Runtime
   *
   * @default nodejs18.x
   */
  readonly runtime?: "nodejs14.x" | "nodejs16.x" | "nodejs18.x"

  /**
   * Path of entry file (built with astrojs-aws)
   */
  readonly entry: string

  /**
   * The handler function name of entry file
   *
   * @default handler
   */
  readonly handler?: string
}

export class LambdaAstroSite extends Construct {
  /**
   * Lambda function handler
   */
  public readonly handler: NodejsFunction

  constructor(scope: Construct, id: string, props: ILambdaAstroSiteProps) {
    super(scope, id)

    this.handler = new NodejsFunction(this, "handler", {
      runtime: new Runtime(props?.runtime || "nodejs18.x"),
      entry: props.entry,
      handler: props?.handler || "handler",
    })
  }
}
