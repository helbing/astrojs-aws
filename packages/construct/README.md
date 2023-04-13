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

## Architecture

### Static

![static](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/static/architecture/static.png)

### Lambda

![lambda](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/static/architecture/lambda.png)

### Edge

![edge](https://raw.githubusercontent.com/helbing/astrojs-aws/main/docs/static/architecture/edge.png)

## Static Mode

```ts
const site = new astrojsaws.StaticAstroSite(this, "AstroSite", {
  staticDir: "/path/to/dist",
})
```

## Lambda Mode

```ts
const site = new astrojsaws.LambdaAstroSite(this, "AstroSite", {
  serverEntry: "/path/to/dist/server/entry.mjs",
  staticDir: "/path/to/dist/client",
})
```

## Edge Mode

```ts
const site = new astrojsaws.EdgeAstroSite(this, "AstroSite", {
  serverEntry: "/path/to/dist/server/entry.mjs",
  staticDir: "/path/to/dist/client",
})
```
