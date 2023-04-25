# Astro Construct Library

<!--BEGIN STABILITY BANNER-->

---

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

> The APIs of higher level constructs in this module are experimental and under active development.
> They are subject to non-backward compatible changes or removal in any future version. These are
> not subject to the [Semantic Versioning](https://semver.org/) model and breaking changes will be
> announced in the release notes. This means that while you may use them, you may need to update
> your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

## Introduction

[Astro](https://astro.build/) is the all-in-one web framework designed for speed. This library is supported modes, `static`, `lambda` and `edge`, to deploy astro website to AWS.

## Usage

### Static Hosting

![Static Hosting](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/images/static-hosting.png)

For developing, it's not recommended to deploy with CloudFront, because setup CloudFront is really too slow, at least takes 5min.

```typescript
import { StaticAstroSite } from "@astrojs-aws/construct"

const site = new StaticAstroSite(this, "Site", {
  siteDir: "/path/to/dist",
})

new CfnOutput(this, "Domains", {
  value: site.domains.join(", "),
})
```

It's recommended to deploy with CloudFront in production environment.

```typescript
import { StaticAstroSite } from "@astrojs-aws/construct"

const site = new StaticAstroSite(this, "Site", {
  siteDir: "/path/to/dist",
  cfOptions: {
    domain: "example.com",
    certificateArn: "arn:aws:acm:us-east-1:xxx-xxx-xxx",
  },
})

new CfnOutput(this, "Domains", {
  value: site.domains.join(", "),
})
```

### Lambda Hosting

![Lambda Hosting](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/images/lambda-hosting.png)

```typescript
import { LambdaAstroSite } from "@astrojs-aws/construct"

const site = new LambdaAstroSite(this, "Site", {
  serverEntry: "/path/to/server/entry.mjs",
  staticDir: "/path/to/client",
})

new CfnOutput(this, "Domains", {
  value: site.domains.join(", "),
})
```

Deploy with CloudFront.

```typescript
import { LambdaAstroSite } from "@astrojs-aws/construct"

const site = new LambdaAstroSite(this, "Site", {
  serverEntry: "/path/to/server/entry.mjs",
  staticDir: "/path/to/client",
  cfOptions: {
    domain: "example.com",
    certificateArn: "arn:aws:acm:us-east-1:xxx-xxx-xxx",
  },
})

new CfnOutput(this, "Domains", {
  value: site.domains.join(", "),
})
```

### Edge Hosting

![Edge Hosting](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/images/edge-hosting.png)

As we known that, edge function working in Edge node. But for developing, setup CloudFront is really too slow. We can only deploy the Lambda function, and use [AWS SAM](https://aws.amazon.com/serverless/sam/) for testing and debuging.

```typescript
import { EdgeAstroSite } from "@astrojs-aws/construct"

new EdgeAstroSite(this, "Site", {
  serverEntry: "/path/to/server/entry.mjs",
  staticDir: "/path/to/client",
  onlyLambda: true,
})
```

Deploy to production environment.

```typescript
import { EdgeAstroSite } from "@astrojs-aws/construct"

const site = new EdgeAstroSite(this, "Site", {
  serverEntry: "/path/to/server/entry.mjs",
  staticDir: "/path/to/client",
  cfOptions: {
    domain: "example.com",
    certificateArn: "arn:aws:acm:us-east-1:xxx-xxx-xxx",
  },
})

new CfnOutput(this, "Domains", {
  value: site.domains.join(", "),
})
```
