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

[Astro](https://astro.build/) is the all-in-one web framework designed for speed. This library is supported modes, `static`, `lambda` and `edge`, to deploy astro website to AWS. You can further know it in [https://helbing.github.io/astrojs-aws/](https://helbing.github.io/astrojs-aws/).

## Usage

```ts
new astrojsaws.StaticAstroSite(this, "StaticAstroSite", {
  siteDir: "/path/to/dist",
})

new astrojsaws.LambdaAstroSite(this, "LambdaAstroSite", {
  serverEntry: "/path/to/dist/server/entry.mjs",
  staticDir: "/path/to/dist/client",
})

new astrojsaws.EdgeAstroSite(this, "EdgeAstroSite", {
  serverEntry: "/path/to/dist/server/entry.mjs",
  staticDir: "/path/to/dist/client",
})
```
