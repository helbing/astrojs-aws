# @astrojs-aws/adapter

The [Astro](https://astro.build/) adapter of [AWS Serverless](https://aws.amazon.com/serverless/) for building SSR application and deploying it to AWS.

## Installation

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

![architecture](./images/architecture.png)

A recommended way is to use this [AWS Constructs Library](../constructs) to deploy.

## Options

### isEdge

The adapter is use [Lambda](https://aws.amazon.com/lambda/) by default. When `isEdge` is seted to true, it means the adapter will use [Lambda@Edge](https://aws.amazon.com/lambda/edge/), and meanwhile, you need to knows [limitations of edge functions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-restrictions.html).

### binaryMediaTypes

### withMiddlewares
