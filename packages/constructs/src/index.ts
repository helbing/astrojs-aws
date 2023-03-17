import { Construct } from "constructs"

export type AstroSiteProps = {
  mode: "static" | "lambda" | "edge"
}

export class AstroSite extends Construct {
  constructor(scope: Construct, id: string, props: AstroSiteProps) {
    super(scope, id)
  }
}
