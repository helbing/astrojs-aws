import { Runtime } from "aws-cdk-lib/aws-lambda"

export default class Utils {
  /**
   * Transform runtime string to Rumtime
   *
   * @param s
   * @returns
   */
  stringToRuntime(s: string): Runtime {
    switch (s) {
      case "nodejs14.x": {
        return Runtime.NODEJS_14_X
      }
      case "nodejs16.x": {
        return Runtime.NODEJS_16_X
      }
      default: {
        return Runtime.NODEJS_18_X
      }
    }
  }
}
