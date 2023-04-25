# @astrojs-aws/adapter

This Adapter allows to develop your SSR site and deploy to [AWS](https://aws.amazon.com/).

## Installation

You can install the AWS Adapter with the following `astro add` command.

```shell
# Using NPM
npx astro add @astrojs-aws/adapter
# using Yarn
yarn astro add @astrojs-aws/adapter
# Using PNPM
pnpm astro add @astrojs-aws/adapter
```

After the command is executed, you the see the changed from `astro.config.mjs` or `astro.config.ts`.

```typescript
import { defineConfig } from "astro/config"
import aws from "@astrojs-aws/adapter"

export default defineConfig({
  output: 'server',
  adapter: aws(),
})
```

You can also install the AWS Adapter by package manager.

```shell
# Using NPM
npm install -D @astrojs-aws/adapter
# Using Yarn
yarn add -D @astrojs-aws/adapter
# Using PNPM
pnpm install -D @astrojs-aws/adapter
```

And Edit the `astro.config.mjs` or `astro.config.ts` manually.

## Targets

You can deploy to different targets:

- lambda: SSR inside the [Lambda](https://aws.amazon.com/lambda/) function.
- edge: SSR inside the [Lambda@Edge](https://aws.amazon.com/lambda/edge/) function.

Recommended to use the [AWS Constructs Library](https://github.com/helbing/astrojs-aws/tree/main/packages/constructs) to deploy.

> [Note] Deploy to the Edge has its [limitations](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html).

## Configuration

To configure this adapter, pass an object to the `vercel()` function call in `astro.config.mjs` or `astro.config.ts`.

### isEdge

**Type:** `boolean`

The adapter is use [Lambda](https://aws.amazon.com/lambda/) by default. When `isEdge` set to true, it means the adapter will use [Lambda@Edge](https://aws.amazon.com/lambda/edge/), and meanwhile, you need to knows the Lambda@Edge has it [limitations](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html).

### binaryMediaTypes

**Type:** `string[]`

The adapter handle body base64 encode automatically based on the `Content-Type` header which in `binaryMediaTypes`. The default `binaryMediaTypes` values are:

```json
[
  "audio/3gpp",
  "audio/3gpp2",
  "audio/aac",
  "audio/midi",
  "audio/mpeg",
  "audio/ogg",
  "audio/opus",
  "audio/wav",
  "audio/webm",
  "audio/x-midi",
  "image/avif",
  "image/bmp",
  "image/gif",
  "image/vnd.microsoft.icon",
  "image/heif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "video/3gpp",
  "video/3gpp2",
  "video/mp2t",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/x-msvideo",
  "video/webm",
]
```
