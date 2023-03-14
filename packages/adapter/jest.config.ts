import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  testEnvironment: "node",
  testTimeout: 60000,
  testRunner: "jest-circus",
  // https://github.com/facebook/jest/issues/11167
  // snapshotResolver: "<rootDir>/snapshotResolver.ts",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "<rootDir>/snapshotResolver.ts": "ts-jest",
  },
}

export default config
