# @astrojs-aws/adapter

The [Astro](https://astro.build/) adapter of [AWS Serverless](https://aws.amazon.com/serverless/) for building SSR application and deploying it to AWS.

## Installation

```shell
npx astro add @astrojs-aws/adapter
yarn astro add @astrojs-aws/adapter
pnpm astro add @astrojs-aws/adapter
```

or

```shell
npm install -D @astrojs-aws/adapter
yarn add -D @astrojs-aws/adapter
pnpm install -D @astrojs-aws/adapter
```

Edit the `astro.config.mjs` or `astro.config.ts`.

```typescript
import aws from "@astrojs-aws/adapter"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "server", // required
  adapter: aws(), 
})
```

## Usage

After `astro build`, you will get two directories, `dist/server` and `dist/client`. You should deploy them with the following architecture.

A recommended way is to use this [AWS Constructs Library](../constructs) to deploy.

## Configuration

### isEdge

The adapter is use [Lambda](https://aws.amazon.com/lambda/) by default. When `isEdge` is seted to true, it means the adapter will use [Lambda@Edge](https://aws.amazon.com/lambda/edge/), and meanwhile, you need to knows [limitations of edge functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html).

### binaryMediaTypes

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

## Contributing

## Changelog
