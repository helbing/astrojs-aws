import { Config } from "jest"
import { defaults } from "jest-config"

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  preset: "ts-jest",
  testRunner: "jest-circus/runner",
  testEnvironment: "node",
  testTimeout: 60000,
  snapshotResolver: "<rootDir>/snapshotResolver.ts",
}

export default config
