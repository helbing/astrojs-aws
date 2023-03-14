import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    testTimeout: 60000,
    resolveSnapshotPath(path, extension) {
      return path + extension
    },
  },
})
