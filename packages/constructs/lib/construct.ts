import * as fs from "fs"
import * as path from "path"

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

  /**
   * Parse routes from directory
   * if the file of directroy is directory will parse to /subfile/*
   * if the file of directroy is file will parse to /subfile
   *
   * @param dir
   * @returns
   */
  parseRoutesFromDir(dir: string): string[] {
    const routes: string[] = []
    const files = fs.readdirSync(dir)
    for (const file of files) {
      if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
        routes.push(`/${file}/*`)
      } else {
        routes.push(`/${file}`)
      }
    }
    return routes
  }
}
