import { Runtime } from "aws-cdk-lib/aws-lambda"
import { Construct } from "constructs"

/**
 * The base class for all constructs.
 */
export class AstroSiteConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id)
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
    else return Runtime.NODEJS_18_X
  }
}
