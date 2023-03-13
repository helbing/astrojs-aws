import { SnapshotResolver } from "jest-snapshot"

const resolver: SnapshotResolver = {
  testPathForConsistencyCheck: "some/example.test.ts",
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath + snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.slice(0, -(snapshotExtension as string).length),
}

export default resolver
