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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### AstroSiteConstruct <a name="AstroSiteConstruct" id="@astrojs-aws/construct.AstroSiteConstruct"></a>

The base class for all constructs.

#### Initializers <a name="Initializers" id="@astrojs-aws/construct.AstroSiteConstruct.Initializer"></a>

```typescript
import { AstroSiteConstruct } from '@astrojs-aws/construct'

new AstroSiteConstruct(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@astrojs-aws/construct.AstroSiteConstruct.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newBucket">newBucket</a></code> | New bucket. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newDistribution">newDistribution</a></code> | New CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGatewayOrigin">newHttpApiGatewayOrigin</a></code> | New HttpApi Gateway origin. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGw">newHttpApiGw</a></code> | New HttpApi Gateway. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.AstroSiteConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket"></a>

```typescript
public newBucket(scope: Construct, whEnabled: boolean, props?: AssetsOptions): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `whEnabled`<sup>Required</sup> <a name="whEnabled" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.whEnabled"></a>

- *Type:* boolean

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.AssetsOptions">AssetsOptions</a>

---

##### `newDistribution` <a name="newDistribution" id="@astrojs-aws/construct.AstroSiteConstruct.newDistribution"></a>

```typescript
public newDistribution(scope: Construct, defaultBehavior: BehaviorOptions, props?: CfOptions): Distribution
```

New CloudFront distribution.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newDistribution.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="@astrojs-aws/construct.AstroSiteConstruct.newDistribution.parameter.defaultBehavior"></a>

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.AstroSiteConstruct.newDistribution.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>

---

##### `newFunction` <a name="newFunction" id="@astrojs-aws/construct.AstroSiteConstruct.newFunction"></a>

```typescript
public newFunction(scope: Construct, serverEntry: string, props?: ServerOptions): NodejsFunction
```

New nodejs function.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newFunction.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.AstroSiteConstruct.newFunction.parameter.serverEntry"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.AstroSiteConstruct.newFunction.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

---

##### `newHttpApiGatewayOrigin` <a name="newHttpApiGatewayOrigin" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGatewayOrigin"></a>

```typescript
public newHttpApiGatewayOrigin(httpApi: HttpApi): HttpOrigin
```

New HttpApi Gateway origin.

###### `httpApi`<sup>Required</sup> <a name="httpApi" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGatewayOrigin.parameter.httpApi"></a>

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpApi

---

##### `newHttpApiGw` <a name="newHttpApiGw" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGw"></a>

```typescript
public newHttpApiGw(scope: Construct, fn: NodejsFunction, props?: GwOptions): HttpApi
```

New HttpApi Gateway.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGw.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `fn`<sup>Required</sup> <a name="fn" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGw.parameter.fn"></a>

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.AstroSiteConstruct.newHttpApiGw.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.GwOptions">GwOptions</a>

---

##### `newS3Origin` <a name="newS3Origin" id="@astrojs-aws/construct.AstroSiteConstruct.newS3Origin"></a>

```typescript
public newS3Origin(scope: Construct, bucket: Bucket): S3Origin
```

New S3 origin.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newS3Origin.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@astrojs-aws/construct.AstroSiteConstruct.newS3Origin.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `parseRoutesFromDir` <a name="parseRoutesFromDir" id="@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir"></a>

```typescript
public parseRoutesFromDir(dir: string, isCf?: boolean): {[ key: string ]: string}
```

Parse routes from directory.

if the item is directory will parse to {"/item/*": "/item/*"} or {"/item/{proxy+}": "/item/{proxy}"}
if the item is file will parse to {"/item": "/item"}

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

###### `isCf`<sup>Optional</sup> <a name="isCf" id="@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir.parameter.isCf"></a>

- *Type:* boolean

CloudFront route or not, HttpApi Gateway route by defauly, default false.

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.AstroSiteConstruct.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.AstroSiteConstruct.strToRuntime.parameter.str"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@astrojs-aws/construct.AstroSiteConstruct.isConstruct"></a>

```typescript
import { AstroSiteConstruct } from '@astrojs-aws/construct'

AstroSiteConstruct.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@astrojs-aws/construct.AstroSiteConstruct.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@astrojs-aws/construct.AstroSiteConstruct.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


### EdgeAstroSite <a name="EdgeAstroSite" id="@astrojs-aws/construct.EdgeAstroSite"></a>

#### Initializers <a name="Initializers" id="@astrojs-aws/construct.EdgeAstroSite.Initializer"></a>

```typescript
import { EdgeAstroSite } from '@astrojs-aws/construct'

new EdgeAstroSite(scope: Construct, id: string, props: EdgeAstroSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.props">props</a></code> | <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps">EdgeAstroSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.Initializer.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.EdgeAstroSiteProps">EdgeAstroSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newBucket">newBucket</a></code> | New bucket. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newDistribution">newDistribution</a></code> | New CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newHttpApiGatewayOrigin">newHttpApiGatewayOrigin</a></code> | New HttpApi Gateway origin. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newHttpApiGw">newHttpApiGw</a></code> | New HttpApi Gateway. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.EdgeAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.EdgeAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, whEnabled: boolean, props?: AssetsOptions): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `whEnabled`<sup>Required</sup> <a name="whEnabled" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.whEnabled"></a>

- *Type:* boolean

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.AssetsOptions">AssetsOptions</a>

---

##### `newDistribution` <a name="newDistribution" id="@astrojs-aws/construct.EdgeAstroSite.newDistribution"></a>

```typescript
public newDistribution(scope: Construct, defaultBehavior: BehaviorOptions, props?: CfOptions): Distribution
```

New CloudFront distribution.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newDistribution.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="@astrojs-aws/construct.EdgeAstroSite.newDistribution.parameter.defaultBehavior"></a>

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.newDistribution.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>

---

##### `newFunction` <a name="newFunction" id="@astrojs-aws/construct.EdgeAstroSite.newFunction"></a>

```typescript
public newFunction(scope: Construct, serverEntry: string, props?: ServerOptions): NodejsFunction
```

New nodejs function.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newFunction.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.EdgeAstroSite.newFunction.parameter.serverEntry"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.newFunction.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

---

##### `newHttpApiGatewayOrigin` <a name="newHttpApiGatewayOrigin" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGatewayOrigin"></a>

```typescript
public newHttpApiGatewayOrigin(httpApi: HttpApi): HttpOrigin
```

New HttpApi Gateway origin.

###### `httpApi`<sup>Required</sup> <a name="httpApi" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGatewayOrigin.parameter.httpApi"></a>

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpApi

---

##### `newHttpApiGw` <a name="newHttpApiGw" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGw"></a>

```typescript
public newHttpApiGw(scope: Construct, fn: NodejsFunction, props?: GwOptions): HttpApi
```

New HttpApi Gateway.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGw.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `fn`<sup>Required</sup> <a name="fn" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGw.parameter.fn"></a>

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.newHttpApiGw.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.GwOptions">GwOptions</a>

---

##### `newS3Origin` <a name="newS3Origin" id="@astrojs-aws/construct.EdgeAstroSite.newS3Origin"></a>

```typescript
public newS3Origin(scope: Construct, bucket: Bucket): S3Origin
```

New S3 origin.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newS3Origin.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@astrojs-aws/construct.EdgeAstroSite.newS3Origin.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `parseRoutesFromDir` <a name="parseRoutesFromDir" id="@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir"></a>

```typescript
public parseRoutesFromDir(dir: string, isCf?: boolean): {[ key: string ]: string}
```

Parse routes from directory.

if the item is directory will parse to {"/item/*": "/item/*"} or {"/item/{proxy+}": "/item/{proxy}"}
if the item is file will parse to {"/item": "/item"}

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

###### `isCf`<sup>Optional</sup> <a name="isCf" id="@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir.parameter.isCf"></a>

- *Type:* boolean

CloudFront route or not, HttpApi Gateway route by defauly, default false.

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.EdgeAstroSite.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.EdgeAstroSite.strToRuntime.parameter.str"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@astrojs-aws/construct.EdgeAstroSite.isConstruct"></a>

```typescript
import { EdgeAstroSite } from '@astrojs-aws/construct'

EdgeAstroSite.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@astrojs-aws/construct.EdgeAstroSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.bucketArn">bucketArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.bucketName">bucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.distributionId">distributionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.domains">domains</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.functionArn">functionArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@astrojs-aws/construct.EdgeAstroSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="@astrojs-aws/construct.EdgeAstroSite.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="@astrojs-aws/construct.EdgeAstroSite.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

---

##### `distributionId`<sup>Required</sup> <a name="distributionId" id="@astrojs-aws/construct.EdgeAstroSite.property.distributionId"></a>

```typescript
public readonly distributionId: string;
```

- *Type:* string

---

##### `domains`<sup>Required</sup> <a name="domains" id="@astrojs-aws/construct.EdgeAstroSite.property.domains"></a>

```typescript
public readonly domains: string[];
```

- *Type:* string[]

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@astrojs-aws/construct.EdgeAstroSite.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@astrojs-aws/construct.EdgeAstroSite.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---


### LambdaAstroSite <a name="LambdaAstroSite" id="@astrojs-aws/construct.LambdaAstroSite"></a>

#### Initializers <a name="Initializers" id="@astrojs-aws/construct.LambdaAstroSite.Initializer"></a>

```typescript
import { LambdaAstroSite } from '@astrojs-aws/construct'

new LambdaAstroSite(scope: Construct, id: string, props: LambdaAstroSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.props">props</a></code> | <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps">LambdaAstroSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.Initializer.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.LambdaAstroSiteProps">LambdaAstroSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newBucket">newBucket</a></code> | New bucket. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newDistribution">newDistribution</a></code> | New CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newHttpApiGatewayOrigin">newHttpApiGatewayOrigin</a></code> | New HttpApi Gateway origin. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newHttpApiGw">newHttpApiGw</a></code> | New HttpApi Gateway. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.LambdaAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.LambdaAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, whEnabled: boolean, props?: AssetsOptions): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `whEnabled`<sup>Required</sup> <a name="whEnabled" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.whEnabled"></a>

- *Type:* boolean

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.AssetsOptions">AssetsOptions</a>

---

##### `newDistribution` <a name="newDistribution" id="@astrojs-aws/construct.LambdaAstroSite.newDistribution"></a>

```typescript
public newDistribution(scope: Construct, defaultBehavior: BehaviorOptions, props?: CfOptions): Distribution
```

New CloudFront distribution.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newDistribution.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="@astrojs-aws/construct.LambdaAstroSite.newDistribution.parameter.defaultBehavior"></a>

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.newDistribution.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>

---

##### `newFunction` <a name="newFunction" id="@astrojs-aws/construct.LambdaAstroSite.newFunction"></a>

```typescript
public newFunction(scope: Construct, serverEntry: string, props?: ServerOptions): NodejsFunction
```

New nodejs function.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newFunction.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.LambdaAstroSite.newFunction.parameter.serverEntry"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.newFunction.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

---

##### `newHttpApiGatewayOrigin` <a name="newHttpApiGatewayOrigin" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGatewayOrigin"></a>

```typescript
public newHttpApiGatewayOrigin(httpApi: HttpApi): HttpOrigin
```

New HttpApi Gateway origin.

###### `httpApi`<sup>Required</sup> <a name="httpApi" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGatewayOrigin.parameter.httpApi"></a>

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpApi

---

##### `newHttpApiGw` <a name="newHttpApiGw" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGw"></a>

```typescript
public newHttpApiGw(scope: Construct, fn: NodejsFunction, props?: GwOptions): HttpApi
```

New HttpApi Gateway.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGw.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `fn`<sup>Required</sup> <a name="fn" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGw.parameter.fn"></a>

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.newHttpApiGw.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.GwOptions">GwOptions</a>

---

##### `newS3Origin` <a name="newS3Origin" id="@astrojs-aws/construct.LambdaAstroSite.newS3Origin"></a>

```typescript
public newS3Origin(scope: Construct, bucket: Bucket): S3Origin
```

New S3 origin.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newS3Origin.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@astrojs-aws/construct.LambdaAstroSite.newS3Origin.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `parseRoutesFromDir` <a name="parseRoutesFromDir" id="@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir"></a>

```typescript
public parseRoutesFromDir(dir: string, isCf?: boolean): {[ key: string ]: string}
```

Parse routes from directory.

if the item is directory will parse to {"/item/*": "/item/*"} or {"/item/{proxy+}": "/item/{proxy}"}
if the item is file will parse to {"/item": "/item"}

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

###### `isCf`<sup>Optional</sup> <a name="isCf" id="@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir.parameter.isCf"></a>

- *Type:* boolean

CloudFront route or not, HttpApi Gateway route by defauly, default false.

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.LambdaAstroSite.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.LambdaAstroSite.strToRuntime.parameter.str"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@astrojs-aws/construct.LambdaAstroSite.isConstruct"></a>

```typescript
import { LambdaAstroSite } from '@astrojs-aws/construct'

LambdaAstroSite.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@astrojs-aws/construct.LambdaAstroSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.bucketArn">bucketArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.bucketName">bucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.distributionId">distributionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.domains">domains</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.functionArn">functionArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.functionName">functionName</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@astrojs-aws/construct.LambdaAstroSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="@astrojs-aws/construct.LambdaAstroSite.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="@astrojs-aws/construct.LambdaAstroSite.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

---

##### `distributionId`<sup>Required</sup> <a name="distributionId" id="@astrojs-aws/construct.LambdaAstroSite.property.distributionId"></a>

```typescript
public readonly distributionId: string;
```

- *Type:* string

---

##### `domains`<sup>Required</sup> <a name="domains" id="@astrojs-aws/construct.LambdaAstroSite.property.domains"></a>

```typescript
public readonly domains: string[];
```

- *Type:* string[]

---

##### `functionArn`<sup>Required</sup> <a name="functionArn" id="@astrojs-aws/construct.LambdaAstroSite.property.functionArn"></a>

```typescript
public readonly functionArn: string;
```

- *Type:* string

---

##### `functionName`<sup>Required</sup> <a name="functionName" id="@astrojs-aws/construct.LambdaAstroSite.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string

---


### StaticAstroSite <a name="StaticAstroSite" id="@astrojs-aws/construct.StaticAstroSite"></a>

#### Initializers <a name="Initializers" id="@astrojs-aws/construct.StaticAstroSite.Initializer"></a>

```typescript
import { StaticAstroSite } from '@astrojs-aws/construct'

new StaticAstroSite(scope: Construct, id: string, props: StaticAstroSiteProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.props">props</a></code> | <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps">StaticAstroSiteProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.Initializer.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.StaticAstroSiteProps">StaticAstroSiteProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newBucket">newBucket</a></code> | New bucket. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newDistribution">newDistribution</a></code> | New CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newHttpApiGatewayOrigin">newHttpApiGatewayOrigin</a></code> | New HttpApi Gateway origin. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newHttpApiGw">newHttpApiGw</a></code> | New HttpApi Gateway. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.StaticAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.StaticAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, whEnabled: boolean, props?: AssetsOptions): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `whEnabled`<sup>Required</sup> <a name="whEnabled" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.whEnabled"></a>

- *Type:* boolean

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.AssetsOptions">AssetsOptions</a>

---

##### `newDistribution` <a name="newDistribution" id="@astrojs-aws/construct.StaticAstroSite.newDistribution"></a>

```typescript
public newDistribution(scope: Construct, defaultBehavior: BehaviorOptions, props?: CfOptions): Distribution
```

New CloudFront distribution.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newDistribution.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `defaultBehavior`<sup>Required</sup> <a name="defaultBehavior" id="@astrojs-aws/construct.StaticAstroSite.newDistribution.parameter.defaultBehavior"></a>

- *Type:* aws-cdk-lib.aws_cloudfront.BehaviorOptions

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.newDistribution.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>

---

##### `newFunction` <a name="newFunction" id="@astrojs-aws/construct.StaticAstroSite.newFunction"></a>

```typescript
public newFunction(scope: Construct, serverEntry: string, props?: ServerOptions): NodejsFunction
```

New nodejs function.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newFunction.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.StaticAstroSite.newFunction.parameter.serverEntry"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.newFunction.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

---

##### `newHttpApiGatewayOrigin` <a name="newHttpApiGatewayOrigin" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGatewayOrigin"></a>

```typescript
public newHttpApiGatewayOrigin(httpApi: HttpApi): HttpOrigin
```

New HttpApi Gateway origin.

###### `httpApi`<sup>Required</sup> <a name="httpApi" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGatewayOrigin.parameter.httpApi"></a>

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpApi

---

##### `newHttpApiGw` <a name="newHttpApiGw" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGw"></a>

```typescript
public newHttpApiGw(scope: Construct, fn: NodejsFunction, props?: GwOptions): HttpApi
```

New HttpApi Gateway.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGw.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `fn`<sup>Required</sup> <a name="fn" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGw.parameter.fn"></a>

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.newHttpApiGw.parameter.props"></a>

- *Type:* <a href="#@astrojs-aws/construct.GwOptions">GwOptions</a>

---

##### `newS3Origin` <a name="newS3Origin" id="@astrojs-aws/construct.StaticAstroSite.newS3Origin"></a>

```typescript
public newS3Origin(scope: Construct, bucket: Bucket): S3Origin
```

New S3 origin.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newS3Origin.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `bucket`<sup>Required</sup> <a name="bucket" id="@astrojs-aws/construct.StaticAstroSite.newS3Origin.parameter.bucket"></a>

- *Type:* aws-cdk-lib.aws_s3.Bucket

---

##### `parseRoutesFromDir` <a name="parseRoutesFromDir" id="@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir"></a>

```typescript
public parseRoutesFromDir(dir: string, isCf?: boolean): {[ key: string ]: string}
```

Parse routes from directory.

if the item is directory will parse to {"/item/*": "/item/*"} or {"/item/{proxy+}": "/item/{proxy}"}
if the item is file will parse to {"/item": "/item"}

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

###### `isCf`<sup>Optional</sup> <a name="isCf" id="@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir.parameter.isCf"></a>

- *Type:* boolean

CloudFront route or not, HttpApi Gateway route by defauly, default false.

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.StaticAstroSite.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.StaticAstroSite.strToRuntime.parameter.str"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@astrojs-aws/construct.StaticAstroSite.isConstruct"></a>

```typescript
import { StaticAstroSite } from '@astrojs-aws/construct'

StaticAstroSite.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@astrojs-aws/construct.StaticAstroSite.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.bucketArn">bucketArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.bucketName">bucketName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.distributionId">distributionId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.domains">domains</a></code> | <code>string[]</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@astrojs-aws/construct.StaticAstroSite.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucketArn`<sup>Required</sup> <a name="bucketArn" id="@astrojs-aws/construct.StaticAstroSite.property.bucketArn"></a>

```typescript
public readonly bucketArn: string;
```

- *Type:* string

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="@astrojs-aws/construct.StaticAstroSite.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

---

##### `distributionId`<sup>Required</sup> <a name="distributionId" id="@astrojs-aws/construct.StaticAstroSite.property.distributionId"></a>

```typescript
public readonly distributionId: string;
```

- *Type:* string

---

##### `domains`<sup>Required</sup> <a name="domains" id="@astrojs-aws/construct.StaticAstroSite.property.domains"></a>

```typescript
public readonly domains: string[];
```

- *Type:* string[]

---


## Structs <a name="Structs" id="Structs"></a>

### AssetsOptions <a name="AssetsOptions" id="@astrojs-aws/construct.AssetsOptions"></a>

The options for the Assets.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.AssetsOptions.Initializer"></a>

```typescript
import { AssetsOptions } from '@astrojs-aws/construct'

const assetsOptions: AssetsOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.AssetsOptions.property.cors">cors</a></code> | <code>aws-cdk-lib.aws_s3.CorsRule[]</code> | The CORS configuration of this bucket. |
| <code><a href="#@astrojs-aws/construct.AssetsOptions.property.errorhtml">errorhtml</a></code> | <code>string</code> | Error document for the website. |
| <code><a href="#@astrojs-aws/construct.AssetsOptions.property.indexhtml">indexhtml</a></code> | <code>string</code> | Index document for the website. |

---

##### `cors`<sup>Optional</sup> <a name="cors" id="@astrojs-aws/construct.AssetsOptions.property.cors"></a>

```typescript
public readonly cors: CorsRule[];
```

- *Type:* aws-cdk-lib.aws_s3.CorsRule[]
- *Default:* No CORS configuration.

The CORS configuration of this bucket.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html)

---

##### `errorhtml`<sup>Optional</sup> <a name="errorhtml" id="@astrojs-aws/construct.AssetsOptions.property.errorhtml"></a>

```typescript
public readonly errorhtml: string;
```

- *Type:* string
- *Default:* error.html

Error document for the website.

---

##### `indexhtml`<sup>Optional</sup> <a name="indexhtml" id="@astrojs-aws/construct.AssetsOptions.property.indexhtml"></a>

```typescript
public readonly indexhtml: string;
```

- *Type:* string
- *Default:* index.html

Index document for the website.

---

### CfOptions <a name="CfOptions" id="@astrojs-aws/construct.CfOptions"></a>

CloudFront options.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.CfOptions.Initializer"></a>

```typescript
import { CfOptions } from '@astrojs-aws/construct'

const cfOptions: CfOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.certificateArn">certificateArn</a></code> | <code>string</code> | Use a custom certificate for the distribution from AWS Certificate Manager (ACM). |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.domain">domain</a></code> | <code>string</code> | Domains of the website. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.cfFunctions">cfFunctions</a></code> | <code>aws-cdk-lib.aws_cloudfront.FunctionAssociation[]</code> | The CloudFront functions to invoke before serving the contents. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.edgeFunctions">edgeFunctions</a></code> | <code>aws-cdk-lib.aws_cloudfront.EdgeLambda[]</code> | The Lambda@Edge functions to invoke before serving the contents. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.errorResponses">errorResponses</a></code> | <code>aws-cdk-lib.aws_cloudfront.ErrorResponse[]</code> | How CloudFront should handle requests that are not successful (e.g., PageNotFound). |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.geoRestriction">geoRestriction</a></code> | <code>aws-cdk-lib.aws_cloudfront.GeoRestriction</code> | Controls the countries in which your content is distributed. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.logBucket">logBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The Amazon S3 bucket to store the access logs in. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.logFilePrefix">logFilePrefix</a></code> | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.logIncludesCookies">logIncludesCookies</a></code> | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs. |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.priceClass">priceClass</a></code> | <code>aws-cdk-lib.aws_cloudfront.PriceClass</code> | The price class for the distribution (this impacts how many locations CloudFront uses for your distribution, and billing). |
| <code><a href="#@astrojs-aws/construct.CfOptions.property.webACLId">webACLId</a></code> | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution. |

---

##### `certificateArn`<sup>Required</sup> <a name="certificateArn" id="@astrojs-aws/construct.CfOptions.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

Use a custom certificate for the distribution from AWS Certificate Manager (ACM).

> [https://aws.amazon.com/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/](https://aws.amazon.com/premiumsupport/knowledge-center/custom-ssl-certificate-cloudfront/)

---

##### `domain`<sup>Required</sup> <a name="domain" id="@astrojs-aws/construct.CfOptions.property.domain"></a>

```typescript
public readonly domain: string;
```

- *Type:* string

Domains of the website.

---

##### `cfFunctions`<sup>Optional</sup> <a name="cfFunctions" id="@astrojs-aws/construct.CfOptions.property.cfFunctions"></a>

```typescript
public readonly cfFunctions: FunctionAssociation[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.FunctionAssociation[]
- *Default:* no new functions will be invoked

The CloudFront functions to invoke before serving the contents.

---

##### `edgeFunctions`<sup>Optional</sup> <a name="edgeFunctions" id="@astrojs-aws/construct.CfOptions.property.edgeFunctions"></a>

```typescript
public readonly edgeFunctions: EdgeLambda[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.EdgeLambda[]
- *Default:* no Lambda functions will be invoked

The Lambda@Edge functions to invoke before serving the contents.

> [https://aws.amazon.com/lambda/edge](https://aws.amazon.com/lambda/edge)

---

##### `errorResponses`<sup>Optional</sup> <a name="errorResponses" id="@astrojs-aws/construct.CfOptions.property.errorResponses"></a>

```typescript
public readonly errorResponses: ErrorResponse[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.ErrorResponse[]
- *Default:* No custom error responses.

How CloudFront should handle requests that are not successful (e.g., PageNotFound).

---

##### `geoRestriction`<sup>Optional</sup> <a name="geoRestriction" id="@astrojs-aws/construct.CfOptions.property.geoRestriction"></a>

```typescript
public readonly geoRestriction: GeoRestriction;
```

- *Type:* aws-cdk-lib.aws_cloudfront.GeoRestriction
- *Default:* No geo restriction

Controls the countries in which your content is distributed.

---

##### `logBucket`<sup>Optional</sup> <a name="logBucket" id="@astrojs-aws/construct.CfOptions.property.logBucket"></a>

```typescript
public readonly logBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* if no specified, logs will be disabled.

The Amazon S3 bucket to store the access logs in.

---

##### `logFilePrefix`<sup>Optional</sup> <a name="logFilePrefix" id="@astrojs-aws/construct.CfOptions.property.logFilePrefix"></a>

```typescript
public readonly logFilePrefix: string;
```

- *Type:* string
- *Default:* no prefix

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

---

##### `logIncludesCookies`<sup>Optional</sup> <a name="logIncludesCookies" id="@astrojs-aws/construct.CfOptions.property.logIncludesCookies"></a>

```typescript
public readonly logIncludesCookies: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether you want CloudFront to include cookies in access logs.

---

##### `priceClass`<sup>Optional</sup> <a name="priceClass" id="@astrojs-aws/construct.CfOptions.property.priceClass"></a>

```typescript
public readonly priceClass: PriceClass;
```

- *Type:* aws-cdk-lib.aws_cloudfront.PriceClass
- *Default:* PriceClass.PRICE_CLASS_200

The price class for the distribution (this impacts how many locations CloudFront uses for your distribution, and billing).

---

##### `webACLId`<sup>Optional</sup> <a name="webACLId" id="@astrojs-aws/construct.CfOptions.property.webACLId"></a>

```typescript
public readonly webACLId: string;
```

- *Type:* string
- *Default:* No AWS Web Application Firewall web access control list (web ACL).

Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution.

To specify a web ACL created using the latest version of AWS WAF, use the ACL ARN, for example
`arn:aws:wafv2:us-east-1:123456789012:global/webacl/ExampleWebACL/473e64fd-f30b-4765-81a0-62ad96dd167a`.

To specify a web ACL created using AWS WAF Classic, use the ACL ID, for example `473e64fd-f30b-4765-81a0-62ad96dd167a`.

> [https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.](https://docs.aws.amazon.com/cloudfront/latest/APIReference/API_CreateDistribution.html#API_CreateDistribution_RequestParameters.)

---

### EdgeAstroSiteProps <a name="EdgeAstroSiteProps" id="@astrojs-aws/construct.EdgeAstroSiteProps"></a>

The options for the EdgeAstroSite.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.EdgeAstroSiteProps.Initializer"></a>

```typescript
import { EdgeAstroSiteProps } from '@astrojs-aws/construct'

const edgeAstroSiteProps: EdgeAstroSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.serverEntry">serverEntry</a></code> | <code>string</code> | The server entry file, e.g. path.join(__dirname, "../server/entry.mjs"). |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.staticDir">staticDir</a></code> | <code>string</code> | The directory of static files, e.g. path.join(__dirname, "../dist/client"). |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.cfOptions">cfOptions</a></code> | <code><a href="#@astrojs-aws/construct.CfOptions">CfOptions</a></code> | The options for the CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.onlyLambda">onlyLambda</a></code> | <code>boolean</code> | Only deploy the lambda function for testing, no S3 Bucket and CloudFront. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.serverOptions">serverOptions</a></code> | <code><a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a></code> | The server options. |

---

##### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.serverEntry"></a>

```typescript
public readonly serverEntry: string;
```

- *Type:* string

The server entry file, e.g. path.join(__dirname, "../server/entry.mjs").

---

##### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.staticDir"></a>

```typescript
public readonly staticDir: string;
```

- *Type:* string

The directory of static files, e.g. path.join(__dirname, "../dist/client").

---

##### `cfOptions`<sup>Optional</sup> <a name="cfOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.cfOptions"></a>

```typescript
public readonly cfOptions: CfOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>
- *Default:* undefined

The options for the CloudFront distribution.

CloudFront is required, unless `onlyLambda` is true.

---

##### `onlyLambda`<sup>Optional</sup> <a name="onlyLambda" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.onlyLambda"></a>

```typescript
public readonly onlyLambda: boolean;
```

- *Type:* boolean
- *Default:* false

Only deploy the lambda function for testing, no S3 Bucket and CloudFront.

Edge function only works in CloudFront, but it really deploy too slow.

---

##### `serverOptions`<sup>Optional</sup> <a name="serverOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.serverOptions"></a>

```typescript
public readonly serverOptions: ServerOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

The server options.

---

### GwOptions <a name="GwOptions" id="@astrojs-aws/construct.GwOptions"></a>

The options for the CloudFront distribution.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.GwOptions.Initializer"></a>

```typescript
import { GwOptions } from '@astrojs-aws/construct'

const gwOptions: GwOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.GwOptions.property.authorizationScopes">authorizationScopes</a></code> | <code>string[]</code> | OIDC scopes attached to the gateway. |
| <code><a href="#@astrojs-aws/construct.GwOptions.property.authorizer">authorizer</a></code> | <code>@aws-cdk/aws-apigatewayv2-alpha.IHttpRouteAuthorizer</code> | Authorizer to applied to the gateway. |
| <code><a href="#@astrojs-aws/construct.GwOptions.property.cors">cors</a></code> | <code>@aws-cdk/aws-apigatewayv2-alpha.CorsPreflightOptions</code> | Specifies a CORS configuration for an API. |

---

##### `authorizationScopes`<sup>Optional</sup> <a name="authorizationScopes" id="@astrojs-aws/construct.GwOptions.property.authorizationScopes"></a>

```typescript
public readonly authorizationScopes: string[];
```

- *Type:* string[]
- *Default:* no default authorization scopes

OIDC scopes attached to the gateway.

---

##### `authorizer`<sup>Optional</sup> <a name="authorizer" id="@astrojs-aws/construct.GwOptions.property.authorizer"></a>

```typescript
public readonly authorizer: IHttpRouteAuthorizer;
```

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.IHttpRouteAuthorizer
- *Default:* No authorizer

Authorizer to applied to the gateway.

---

##### `cors`<sup>Optional</sup> <a name="cors" id="@astrojs-aws/construct.GwOptions.property.cors"></a>

```typescript
public readonly cors: CorsPreflightOptions;
```

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.CorsPreflightOptions
- *Default:* CORS disabled.

Specifies a CORS configuration for an API.

> [https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html)

---

### LambdaAstroSiteProps <a name="LambdaAstroSiteProps" id="@astrojs-aws/construct.LambdaAstroSiteProps"></a>

The options for the LambdaAstroSite.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.LambdaAstroSiteProps.Initializer"></a>

```typescript
import { LambdaAstroSiteProps } from '@astrojs-aws/construct'

const lambdaAstroSiteProps: LambdaAstroSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.serverEntry">serverEntry</a></code> | <code>string</code> | The server entry file, e.g. path.join(__dirname, "../server/entry.mjs"). |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.staticDir">staticDir</a></code> | <code>string</code> | The directory of static files, e.g. path.join(__dirname, "../dist/client"). |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.cfOptions">cfOptions</a></code> | <code><a href="#@astrojs-aws/construct.CfOptions">CfOptions</a></code> | The options for the CloudFront distribution. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.gwOptions">gwOptions</a></code> | <code><a href="#@astrojs-aws/construct.GwOptions">GwOptions</a></code> | HttpApi Gateway options. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.serverOptions">serverOptions</a></code> | <code><a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a></code> | The server options. |

---

##### `serverEntry`<sup>Required</sup> <a name="serverEntry" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.serverEntry"></a>

```typescript
public readonly serverEntry: string;
```

- *Type:* string

The server entry file, e.g. path.join(__dirname, "../server/entry.mjs").

---

##### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.staticDir"></a>

```typescript
public readonly staticDir: string;
```

- *Type:* string

The directory of static files, e.g. path.join(__dirname, "../dist/client").

---

##### `cfOptions`<sup>Optional</sup> <a name="cfOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.cfOptions"></a>

```typescript
public readonly cfOptions: CfOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>
- *Default:* No CloudFront distribution, if not equal to undefined, CloudFront auto-enabled.

The options for the CloudFront distribution.

Recommended to use CloudFront for production.

---

##### `gwOptions`<sup>Optional</sup> <a name="gwOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.gwOptions"></a>

```typescript
public readonly gwOptions: GwOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.GwOptions">GwOptions</a>

HttpApi Gateway options.

---

##### `serverOptions`<sup>Optional</sup> <a name="serverOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.serverOptions"></a>

```typescript
public readonly serverOptions: ServerOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

The server options.

---

### ServerOptions <a name="ServerOptions" id="@astrojs-aws/construct.ServerOptions"></a>

The options for the lambda function.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.ServerOptions.Initializer"></a>

```typescript
import { ServerOptions } from '@astrojs-aws/construct'

const serverOptions: ServerOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.maxEventAge">maxEventAge</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum age of a request that Lambda sends to a function for processing. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.onFailure">onFailure</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for failed invocations. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.onSuccess">onSuccess</a></code> | <code>aws-cdk-lib.aws_lambda.IDestination</code> | The destination for successful invocations. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.retryAttempts">retryAttempts</a></code> | <code>number</code> | The maximum number of times to retry when the function returns an error. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.adotInstrumentation">adotInstrumentation</a></code> | <code>aws-cdk-lib.aws_lambda.AdotInstrumentationConfig</code> | Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.allowAllOutbound">allowAllOutbound</a></code> | <code>boolean</code> | Whether to allow the Lambda to send all network traffic. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.allowPublicSubnet">allowPublicSubnet</a></code> | <code>boolean</code> | Lambda Functions in a public subnet can NOT access the internet. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.architecture">architecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The system architectures compatible with this lambda function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.codeSigningConfig">codeSigningConfig</a></code> | <code>aws-cdk-lib.aws_lambda.ICodeSigningConfig</code> | Code signing config associated with this function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.currentVersionOptions">currentVersionOptions</a></code> | <code>aws-cdk-lib.aws_lambda.VersionOptions</code> | Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.deadLetterQueue">deadLetterQueue</a></code> | <code>aws-cdk-lib.aws_sqs.IQueue</code> | The SQS queue to use if DLQ is enabled. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.deadLetterQueueEnabled">deadLetterQueueEnabled</a></code> | <code>boolean</code> | Enabled DLQ. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.deadLetterTopic">deadLetterTopic</a></code> | <code>aws-cdk-lib.aws_sns.ITopic</code> | The SNS topic to use as a DLQ. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.description">description</a></code> | <code>string</code> | A description of the function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | Key-value pairs that Lambda caches and makes available for your Lambda functions. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.environmentEncryption">environmentEncryption</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The AWS KMS key that's used to encrypt your function's environment variables. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the function’s /tmp directory in MiB. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.events">events</a></code> | <code>aws-cdk-lib.aws_lambda.IEventSource[]</code> | Event sources for this function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.filesystem">filesystem</a></code> | <code>aws-cdk-lib.aws_lambda.FileSystem</code> | The filesystem configuration for the lambda function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.functionName">functionName</a></code> | <code>string</code> | A name for the function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.initialPolicy">initialPolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | Initial policy statements to add to the created Lambda Role. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.insightsVersion">insightsVersion</a></code> | <code>aws-cdk-lib.aws_lambda.LambdaInsightsVersion</code> | Specify the version of CloudWatch Lambda insights to use for monitoring. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.layers">layers</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion[]</code> | A list of layers to add to the function's execution environment. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | The number of days log events are kept in CloudWatch Logs. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.logRetentionRetryOptions">logRetentionRetryOptions</a></code> | <code>aws-cdk-lib.aws_lambda.LogRetentionRetryOptions</code> | When log retention is specified, a custom resource attempts to create the CloudWatch log group. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.logRetentionRole">logRetentionRole</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | The IAM role for the Lambda function associated with the custom resource that sets the retention policy. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.profiling">profiling</a></code> | <code>boolean</code> | Enable profiling. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.profilingGroup">profilingGroup</a></code> | <code>aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup</code> | Profiling Group. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.reservedConcurrentExecutions">reservedConcurrentExecutions</a></code> | <code>number</code> | The maximum of concurrent executions you want to reserve for the function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Lambda execution role. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.runtimeManagementMode">runtimeManagementMode</a></code> | <code>aws-cdk-lib.aws_lambda.RuntimeManagementMode</code> | Sets the runtime management configuration for a function's version. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the Lambda's network interfaces. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The function execution time (in seconds) after which Lambda terminates the function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.tracing">tracing</a></code> | <code>aws-cdk-lib.aws_lambda.Tracing</code> | Enable AWS X-Ray Tracing for Lambda Function. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC network to place Lambda network interfaces. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.bundling">bundling</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.BundlingOptions</code> | Bundling options. |
| <code><a href="#@astrojs-aws/construct.ServerOptions.property.runtime">runtime</a></code> | <code>string</code> | The Nodejs Runtime. |

---

##### `maxEventAge`<sup>Optional</sup> <a name="maxEventAge" id="@astrojs-aws/construct.ServerOptions.property.maxEventAge"></a>

```typescript
public readonly maxEventAge: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.hours(6)

The maximum age of a request that Lambda sends to a function for processing.

Minimum: 60 seconds
Maximum: 6 hours

---

##### `onFailure`<sup>Optional</sup> <a name="onFailure" id="@astrojs-aws/construct.ServerOptions.property.onFailure"></a>

```typescript
public readonly onFailure: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for failed invocations.

---

##### `onSuccess`<sup>Optional</sup> <a name="onSuccess" id="@astrojs-aws/construct.ServerOptions.property.onSuccess"></a>

```typescript
public readonly onSuccess: IDestination;
```

- *Type:* aws-cdk-lib.aws_lambda.IDestination
- *Default:* no destination

The destination for successful invocations.

---

##### `retryAttempts`<sup>Optional</sup> <a name="retryAttempts" id="@astrojs-aws/construct.ServerOptions.property.retryAttempts"></a>

```typescript
public readonly retryAttempts: number;
```

- *Type:* number
- *Default:* 2

The maximum number of times to retry when the function returns an error.

Minimum: 0
Maximum: 2

---

##### `adotInstrumentation`<sup>Optional</sup> <a name="adotInstrumentation" id="@astrojs-aws/construct.ServerOptions.property.adotInstrumentation"></a>

```typescript
public readonly adotInstrumentation: AdotInstrumentationConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.AdotInstrumentationConfig
- *Default:* No ADOT instrumentation

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

> [https://aws-otel.github.io/docs/getting-started/lambda](https://aws-otel.github.io/docs/getting-started/lambda)

---

##### `allowAllOutbound`<sup>Optional</sup> <a name="allowAllOutbound" id="@astrojs-aws/construct.ServerOptions.property.allowAllOutbound"></a>

```typescript
public readonly allowAllOutbound: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow the Lambda to send all network traffic.

If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets.

---

##### `allowPublicSubnet`<sup>Optional</sup> <a name="allowPublicSubnet" id="@astrojs-aws/construct.ServerOptions.property.allowPublicSubnet"></a>

```typescript
public readonly allowPublicSubnet: boolean;
```

- *Type:* boolean
- *Default:* false

Lambda Functions in a public subnet can NOT access the internet.

Use this property to acknowledge this limitation and still place the function in a public subnet.

> [https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841](https://stackoverflow.com/questions/52992085/why-cant-an-aws-lambda-function-inside-a-public-subnet-in-a-vpc-connect-to-the/52994841#52994841)

---

##### `architecture`<sup>Optional</sup> <a name="architecture" id="@astrojs-aws/construct.ServerOptions.property.architecture"></a>

```typescript
public readonly architecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture
- *Default:* Architecture.X86_64

The system architectures compatible with this lambda function.

---

##### `codeSigningConfig`<sup>Optional</sup> <a name="codeSigningConfig" id="@astrojs-aws/construct.ServerOptions.property.codeSigningConfig"></a>

```typescript
public readonly codeSigningConfig: ICodeSigningConfig;
```

- *Type:* aws-cdk-lib.aws_lambda.ICodeSigningConfig
- *Default:* Not Sign the Code

Code signing config associated with this function.

---

##### `currentVersionOptions`<sup>Optional</sup> <a name="currentVersionOptions" id="@astrojs-aws/construct.ServerOptions.property.currentVersionOptions"></a>

```typescript
public readonly currentVersionOptions: VersionOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.VersionOptions
- *Default:* default options as described in `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

---

##### `deadLetterQueue`<sup>Optional</sup> <a name="deadLetterQueue" id="@astrojs-aws/construct.ServerOptions.property.deadLetterQueue"></a>

```typescript
public readonly deadLetterQueue: IQueue;
```

- *Type:* aws-cdk-lib.aws_sqs.IQueue
- *Default:* SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

The SQS queue to use if DLQ is enabled.

If SNS topic is desired, specify `deadLetterTopic` property instead.

---

##### `deadLetterQueueEnabled`<sup>Optional</sup> <a name="deadLetterQueueEnabled" id="@astrojs-aws/construct.ServerOptions.property.deadLetterQueueEnabled"></a>

```typescript
public readonly deadLetterQueueEnabled: boolean;
```

- *Type:* boolean
- *Default:* false unless `deadLetterQueue` is set, which implies DLQ is enabled.

Enabled DLQ.

If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

---

##### `deadLetterTopic`<sup>Optional</sup> <a name="deadLetterTopic" id="@astrojs-aws/construct.ServerOptions.property.deadLetterTopic"></a>

```typescript
public readonly deadLetterTopic: ITopic;
```

- *Type:* aws-cdk-lib.aws_sns.ITopic
- *Default:* no SNS topic

The SNS topic to use as a DLQ.

Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

---

##### `description`<sup>Optional</sup> <a name="description" id="@astrojs-aws/construct.ServerOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the function.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@astrojs-aws/construct.ServerOptions.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* No environment variables.

Key-value pairs that Lambda caches and makes available for your Lambda functions.

Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

---

##### `environmentEncryption`<sup>Optional</sup> <a name="environmentEncryption" id="@astrojs-aws/construct.ServerOptions.property.environmentEncryption"></a>

```typescript
public readonly environmentEncryption: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey
- *Default:* AWS Lambda creates and uses an AWS managed customer master key (CMK).

The AWS KMS key that's used to encrypt your function's environment variables.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="@astrojs-aws/construct.ServerOptions.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* 512 MiB

The size of the function’s /tmp directory in MiB.

---

##### `events`<sup>Optional</sup> <a name="events" id="@astrojs-aws/construct.ServerOptions.property.events"></a>

```typescript
public readonly events: IEventSource[];
```

- *Type:* aws-cdk-lib.aws_lambda.IEventSource[]
- *Default:* No event sources.

Event sources for this function.

You can also add event sources using `addEventSource`.

---

##### `filesystem`<sup>Optional</sup> <a name="filesystem" id="@astrojs-aws/construct.ServerOptions.property.filesystem"></a>

```typescript
public readonly filesystem: FileSystem;
```

- *Type:* aws-cdk-lib.aws_lambda.FileSystem
- *Default:* will not mount any filesystem

The filesystem configuration for the lambda function.

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="@astrojs-aws/construct.ServerOptions.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the function's name. For more information, see Name Type.

A name for the function.

---

##### `initialPolicy`<sup>Optional</sup> <a name="initialPolicy" id="@astrojs-aws/construct.ServerOptions.property.initialPolicy"></a>

```typescript
public readonly initialPolicy: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]
- *Default:* No policy statements are added to the created Lambda role.

Initial policy statements to add to the created Lambda Role.

You can call `addToRolePolicy` to the created lambda to add statements post creation.

---

##### `insightsVersion`<sup>Optional</sup> <a name="insightsVersion" id="@astrojs-aws/construct.ServerOptions.property.insightsVersion"></a>

```typescript
public readonly insightsVersion: LambdaInsightsVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.LambdaInsightsVersion
- *Default:* No Lambda Insights

Specify the version of CloudWatch Lambda insights to use for monitoring.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Lambda-Insights-Getting-Started-docker.html)

---

##### `layers`<sup>Optional</sup> <a name="layers" id="@astrojs-aws/construct.ServerOptions.property.layers"></a>

```typescript
public readonly layers: ILayerVersion[];
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion[]
- *Default:* No layers.

A list of layers to add to the function's execution environment.

You can configure your Lambda function to pull in
additional code during initialization in the form of layers. Layers are packages of libraries or other dependencies
that can be used by multiple functions.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="@astrojs-aws/construct.ServerOptions.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.INFINITE

The number of days log events are kept in CloudWatch Logs.

When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

---

##### `logRetentionRetryOptions`<sup>Optional</sup> <a name="logRetentionRetryOptions" id="@astrojs-aws/construct.ServerOptions.property.logRetentionRetryOptions"></a>

```typescript
public readonly logRetentionRetryOptions: LogRetentionRetryOptions;
```

- *Type:* aws-cdk-lib.aws_lambda.LogRetentionRetryOptions
- *Default:* Default AWS SDK retry options.

When log retention is specified, a custom resource attempts to create the CloudWatch log group.

These options control the retry policy when interacting with CloudWatch APIs.

---

##### `logRetentionRole`<sup>Optional</sup> <a name="logRetentionRole" id="@astrojs-aws/construct.ServerOptions.property.logRetentionRole"></a>

```typescript
public readonly logRetentionRole: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A new role is created.

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="@astrojs-aws/construct.ServerOptions.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

---

##### `profiling`<sup>Optional</sup> <a name="profiling" id="@astrojs-aws/construct.ServerOptions.property.profiling"></a>

```typescript
public readonly profiling: boolean;
```

- *Type:* boolean
- *Default:* No profiling.

Enable profiling.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `profilingGroup`<sup>Optional</sup> <a name="profilingGroup" id="@astrojs-aws/construct.ServerOptions.property.profilingGroup"></a>

```typescript
public readonly profilingGroup: IProfilingGroup;
```

- *Type:* aws-cdk-lib.aws_codeguruprofiler.IProfilingGroup
- *Default:* A new profiling group will be created if `profiling` is set.

Profiling Group.

> [https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html](https://docs.aws.amazon.com/codeguru/latest/profiler-ug/setting-up-lambda.html)

---

##### `reservedConcurrentExecutions`<sup>Optional</sup> <a name="reservedConcurrentExecutions" id="@astrojs-aws/construct.ServerOptions.property.reservedConcurrentExecutions"></a>

```typescript
public readonly reservedConcurrentExecutions: number;
```

- *Type:* number
- *Default:* No specific limit - account limit.

The maximum of concurrent executions you want to reserve for the function.

> [https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html](https://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html)

---

##### `role`<sup>Optional</sup> <a name="role" id="@astrojs-aws/construct.ServerOptions.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this lambda function. Both supplied and generated roles can always be changed by calling `addToRolePolicy`.

Lambda execution role.

This is the role that will be assumed by the function upon execution.
It controls the permissions that the function will have. The Role must
be assumable by the 'lambda.amazonaws.com' service principal.

The default Role automatically has permissions granted for Lambda execution. If you
provide a Role, you must add the relevant AWS managed policies yourself.

The relevant managed policies are "service-role/AWSLambdaBasicExecutionRole" and
"service-role/AWSLambdaVPCAccessExecutionRole".

---

##### `runtimeManagementMode`<sup>Optional</sup> <a name="runtimeManagementMode" id="@astrojs-aws/construct.ServerOptions.property.runtimeManagementMode"></a>

```typescript
public readonly runtimeManagementMode: RuntimeManagementMode;
```

- *Type:* aws-cdk-lib.aws_lambda.RuntimeManagementMode
- *Default:* Auto

Sets the runtime management configuration for a function's version.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@astrojs-aws/construct.ServerOptions.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the function is placed within a VPC and a security group is not specified, either by this or securityGroup prop, a dedicated security group will be created for this function.

The list of security groups to associate with the Lambda's network interfaces.

Only used if 'vpc' is supplied.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@astrojs-aws/construct.ServerOptions.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(3)

The function execution time (in seconds) after which Lambda terminates the function.

Because the execution time affects cost, set this value
based on the function's expected execution time.

---

##### `tracing`<sup>Optional</sup> <a name="tracing" id="@astrojs-aws/construct.ServerOptions.property.tracing"></a>

```typescript
public readonly tracing: Tracing;
```

- *Type:* aws-cdk-lib.aws_lambda.Tracing
- *Default:* Tracing.Disabled

Enable AWS X-Ray Tracing for Lambda Function.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@astrojs-aws/construct.ServerOptions.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Function is not placed within a VPC.

VPC network to place Lambda network interfaces.

Specify this if the Lambda function needs to access resources in a VPC.
This is required when `vpcSubnets` is specified.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@astrojs-aws/construct.ServerOptions.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

This requires `vpc` to be specified in order for interfaces to actually be
placed in the subnets. If `vpc` is not specify, this will raise an error.

Note: Internet access for Lambda Functions requires a NAT Gateway, so picking
public subnets is not allowed (unless `allowPublicSubnet` is set to `true`).

---

##### `bundling`<sup>Optional</sup> <a name="bundling" id="@astrojs-aws/construct.ServerOptions.property.bundling"></a>

```typescript
public readonly bundling: BundlingOptions;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.BundlingOptions

Bundling options.

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@astrojs-aws/construct.ServerOptions.property.runtime"></a>

```typescript
public readonly runtime: string;
```

- *Type:* string
- *Default:* nodejs18.x

The Nodejs Runtime.

---

### StaticAstroSiteProps <a name="StaticAstroSiteProps" id="@astrojs-aws/construct.StaticAstroSiteProps"></a>

The options for the StaticAstroSite.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.StaticAstroSiteProps.Initializer"></a>

```typescript
import { StaticAstroSiteProps } from '@astrojs-aws/construct'

const staticAstroSiteProps: StaticAstroSiteProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.cors">cors</a></code> | <code>aws-cdk-lib.aws_s3.CorsRule[]</code> | The CORS configuration of this bucket. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.errorhtml">errorhtml</a></code> | <code>string</code> | Error document for the website. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.indexhtml">indexhtml</a></code> | <code>string</code> | Index document for the website. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.siteDir">siteDir</a></code> | <code>string</code> | The directory of built files, e.g. path.join(__dirname, "../dist"). |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.cfOptions">cfOptions</a></code> | <code><a href="#@astrojs-aws/construct.CfOptions">CfOptions</a></code> | The options for the CloudFront distribution. |

---

##### `cors`<sup>Optional</sup> <a name="cors" id="@astrojs-aws/construct.StaticAstroSiteProps.property.cors"></a>

```typescript
public readonly cors: CorsRule[];
```

- *Type:* aws-cdk-lib.aws_s3.CorsRule[]
- *Default:* No CORS configuration.

The CORS configuration of this bucket.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-cors.html)

---

##### `errorhtml`<sup>Optional</sup> <a name="errorhtml" id="@astrojs-aws/construct.StaticAstroSiteProps.property.errorhtml"></a>

```typescript
public readonly errorhtml: string;
```

- *Type:* string
- *Default:* error.html

Error document for the website.

---

##### `indexhtml`<sup>Optional</sup> <a name="indexhtml" id="@astrojs-aws/construct.StaticAstroSiteProps.property.indexhtml"></a>

```typescript
public readonly indexhtml: string;
```

- *Type:* string
- *Default:* index.html

Index document for the website.

---

##### `siteDir`<sup>Required</sup> <a name="siteDir" id="@astrojs-aws/construct.StaticAstroSiteProps.property.siteDir"></a>

```typescript
public readonly siteDir: string;
```

- *Type:* string

The directory of built files, e.g. path.join(__dirname, "../dist").

---

##### `cfOptions`<sup>Optional</sup> <a name="cfOptions" id="@astrojs-aws/construct.StaticAstroSiteProps.property.cfOptions"></a>

```typescript
public readonly cfOptions: CfOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.CfOptions">CfOptions</a>
- *Default:* No CloudFront distribution, if not equal to undefined, CloudFront auto-enabled.

The options for the CloudFront distribution.

---



