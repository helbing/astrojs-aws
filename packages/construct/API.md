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
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item. |
| <code><a href="#@astrojs-aws/construct.AstroSiteConstruct.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.AstroSiteConstruct.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket"></a>

```typescript
public newBucket(scope: Construct, staticDir: string, props?: BucketProps): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.staticDir"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.AstroSiteConstruct.newBucket.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketProps

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
public parseRoutesFromDir(dir: string): string[]
```

Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item.

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.AstroSiteConstruct.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

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
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.edgeFunction">edgeFunction</a></code> | Return edge function. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.EdgeAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.EdgeAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, staticDir: string, props?: BucketProps): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.staticDir"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.EdgeAstroSite.newBucket.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketProps

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
public parseRoutesFromDir(dir: string): string[]
```

Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item.

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.EdgeAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.EdgeAstroSite.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.EdgeAstroSite.strToRuntime.parameter.str"></a>

- *Type:* string

---

##### `edgeFunction` <a name="edgeFunction" id="@astrojs-aws/construct.EdgeAstroSite.edgeFunction"></a>

```typescript
public edgeFunction(): NodejsFunction
```

Return edge function.

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
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSite.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |

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

##### `distributionDomainName`<sup>Required</sup> <a name="distributionDomainName" id="@astrojs-aws/construct.EdgeAstroSite.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@astrojs-aws/construct.EdgeAstroSite.property.domainName"></a>

```typescript
public readonly domainName: string;
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
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.api">api</a></code> | return http api. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.lambdaFunction">lambdaFunction</a></code> | Returns lambda function. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.LambdaAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.LambdaAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, staticDir: string, props?: BucketProps): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.staticDir"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.LambdaAstroSite.newBucket.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketProps

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
public parseRoutesFromDir(dir: string): string[]
```

Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item.

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.LambdaAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

---

##### `strToRuntime` <a name="strToRuntime" id="@astrojs-aws/construct.LambdaAstroSite.strToRuntime"></a>

```typescript
public strToRuntime(str?: string): Runtime
```

Transform string to Runtime.

###### `str`<sup>Optional</sup> <a name="str" id="@astrojs-aws/construct.LambdaAstroSite.strToRuntime.parameter.str"></a>

- *Type:* string

---

##### `api` <a name="api" id="@astrojs-aws/construct.LambdaAstroSite.api"></a>

```typescript
public api(): HttpApi
```

return http api.

##### `lambdaFunction` <a name="lambdaFunction" id="@astrojs-aws/construct.LambdaAstroSite.lambdaFunction"></a>

```typescript
public lambdaFunction(): NodejsFunction
```

Returns lambda function.

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
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSite.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |

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

##### `distributionDomainName`<sup>Required</sup> <a name="distributionDomainName" id="@astrojs-aws/construct.LambdaAstroSite.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@astrojs-aws/construct.LambdaAstroSite.property.domainName"></a>

```typescript
public readonly domainName: string;
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
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newFunction">newFunction</a></code> | New nodejs function. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.newS3Origin">newS3Origin</a></code> | New S3 origin. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir">parseRoutesFromDir</a></code> | Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.strToRuntime">strToRuntime</a></code> | Transform string to Runtime. |

---

##### `toString` <a name="toString" id="@astrojs-aws/construct.StaticAstroSite.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `newBucket` <a name="newBucket" id="@astrojs-aws/construct.StaticAstroSite.newBucket"></a>

```typescript
public newBucket(scope: Construct, staticDir: string, props?: BucketProps): Bucket
```

New bucket.

###### `scope`<sup>Required</sup> <a name="scope" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.staticDir"></a>

- *Type:* string

---

###### `props`<sup>Optional</sup> <a name="props" id="@astrojs-aws/construct.StaticAstroSite.newBucket.parameter.props"></a>

- *Type:* aws-cdk-lib.aws_s3.BucketProps

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
public parseRoutesFromDir(dir: string): string[]
```

Parse routes from directory if the item is directory will parse to /item/* if the item is file will parse to /item.

###### `dir`<sup>Required</sup> <a name="dir" id="@astrojs-aws/construct.StaticAstroSite.parseRoutesFromDir.parameter.dir"></a>

- *Type:* string

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
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.distributionDomainName">distributionDomainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@astrojs-aws/construct.StaticAstroSite.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |

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

##### `distributionDomainName`<sup>Required</sup> <a name="distributionDomainName" id="@astrojs-aws/construct.StaticAstroSite.property.distributionDomainName"></a>

```typescript
public readonly distributionDomainName: string;
```

- *Type:* string

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="@astrojs-aws/construct.StaticAstroSite.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### DistributionOptions <a name="DistributionOptions" id="@astrojs-aws/construct.DistributionOptions"></a>

CloudFront distribution which is based on CDK DistributionProps, remove defaultBehavior, defaultRootObject.

#### Initializer <a name="Initializer" id="@astrojs-aws/construct.DistributionOptions.Initializer"></a>

```typescript
import { DistributionOptions } from '@astrojs-aws/construct'

const distributionOptions: DistributionOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.additionalBehaviors">additionalBehaviors</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}</code> | Additional behaviors for the distribution, mapped by the pathPattern that specifies which requests to apply the behavior to. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | A certificate to associate with the distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.comment">comment</a></code> | <code>string</code> | Any comments you want to include about the distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.domainNames">domainNames</a></code> | <code>string[]</code> | Alternative domain names for this distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.enabled">enabled</a></code> | <code>boolean</code> | Enable or disable the distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.enableIpv6">enableIpv6</a></code> | <code>boolean</code> | Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.enableLogging">enableLogging</a></code> | <code>boolean</code> | Enable access logging for the distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.errorResponses">errorResponses</a></code> | <code>aws-cdk-lib.aws_cloudfront.ErrorResponse[]</code> | How CloudFront should handle requests that are not successful (e.g., PageNotFound). |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.geoRestriction">geoRestriction</a></code> | <code>aws-cdk-lib.aws_cloudfront.GeoRestriction</code> | Controls the countries in which your content is distributed. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.httpVersion">httpVersion</a></code> | <code>aws-cdk-lib.aws_cloudfront.HttpVersion</code> | Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.logBucket">logBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The Amazon S3 bucket to store the access logs in. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.logFilePrefix">logFilePrefix</a></code> | <code>string</code> | An optional string that you want CloudFront to prefix to the access log filenames for this distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.logIncludesCookies">logIncludesCookies</a></code> | <code>boolean</code> | Specifies whether you want CloudFront to include cookies in access logs. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.minimumProtocolVersion">minimumProtocolVersion</a></code> | <code>aws-cdk-lib.aws_cloudfront.SecurityPolicyProtocol</code> | The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.priceClass">priceClass</a></code> | <code>aws-cdk-lib.aws_cloudfront.PriceClass</code> | The price class that corresponds with the maximum price that you want to pay for CloudFront service. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.sslSupportMethod">sslSupportMethod</a></code> | <code>aws-cdk-lib.aws_cloudfront.SSLMethod</code> | The SSL method CloudFront will use for your distribution. |
| <code><a href="#@astrojs-aws/construct.DistributionOptions.property.webAclId">webAclId</a></code> | <code>string</code> | Unique identifier that specifies the AWS WAF web ACL to associate with this CloudFront distribution. |

---

##### `additionalBehaviors`<sup>Optional</sup> <a name="additionalBehaviors" id="@astrojs-aws/construct.DistributionOptions.property.additionalBehaviors"></a>

```typescript
public readonly additionalBehaviors: {[ key: string ]: BehaviorOptions};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_cloudfront.BehaviorOptions}
- *Default:* no additional behaviors are added.

Additional behaviors for the distribution, mapped by the pathPattern that specifies which requests to apply the behavior to.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="@astrojs-aws/construct.DistributionOptions.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate
- *Default:* the CloudFront wildcard certificate (*.cloudfront.net) will be used.

A certificate to associate with the distribution.

The certificate must be located in N. Virginia (us-east-1).

---

##### `comment`<sup>Optional</sup> <a name="comment" id="@astrojs-aws/construct.DistributionOptions.property.comment"></a>

```typescript
public readonly comment: string;
```

- *Type:* string
- *Default:* no comment

Any comments you want to include about the distribution.

---

##### `domainNames`<sup>Optional</sup> <a name="domainNames" id="@astrojs-aws/construct.DistributionOptions.property.domainNames"></a>

```typescript
public readonly domainNames: string[];
```

- *Type:* string[]
- *Default:* The distribution will only support the default generated name (e.g., d111111abcdef8.cloudfront.net)

Alternative domain names for this distribution.

If you want to use your own domain name, such as www.example.com, instead of the cloudfront.net domain name,
you can add an alternate domain name to your distribution. If you attach a certificate to the distribution,
you must add (at least one of) the domain names of the certificate to this list.

---

##### `enabled`<sup>Optional</sup> <a name="enabled" id="@astrojs-aws/construct.DistributionOptions.property.enabled"></a>

```typescript
public readonly enabled: boolean;
```

- *Type:* boolean
- *Default:* true

Enable or disable the distribution.

---

##### `enableIpv6`<sup>Optional</sup> <a name="enableIpv6" id="@astrojs-aws/construct.DistributionOptions.property.enableIpv6"></a>

```typescript
public readonly enableIpv6: boolean;
```

- *Type:* boolean
- *Default:* true

Whether CloudFront will respond to IPv6 DNS requests with an IPv6 address.

If you specify false, CloudFront responds to IPv6 DNS requests with the DNS response code NOERROR and with no IP addresses.
This allows viewers to submit a second request, for an IPv4 address for your distribution.

---

##### `enableLogging`<sup>Optional</sup> <a name="enableLogging" id="@astrojs-aws/construct.DistributionOptions.property.enableLogging"></a>

```typescript
public readonly enableLogging: boolean;
```

- *Type:* boolean
- *Default:* false, unless `logBucket` is specified.

Enable access logging for the distribution.

---

##### `errorResponses`<sup>Optional</sup> <a name="errorResponses" id="@astrojs-aws/construct.DistributionOptions.property.errorResponses"></a>

```typescript
public readonly errorResponses: ErrorResponse[];
```

- *Type:* aws-cdk-lib.aws_cloudfront.ErrorResponse[]
- *Default:* No custom error responses.

How CloudFront should handle requests that are not successful (e.g., PageNotFound).

---

##### `geoRestriction`<sup>Optional</sup> <a name="geoRestriction" id="@astrojs-aws/construct.DistributionOptions.property.geoRestriction"></a>

```typescript
public readonly geoRestriction: GeoRestriction;
```

- *Type:* aws-cdk-lib.aws_cloudfront.GeoRestriction
- *Default:* No geographic restrictions

Controls the countries in which your content is distributed.

---

##### `httpVersion`<sup>Optional</sup> <a name="httpVersion" id="@astrojs-aws/construct.DistributionOptions.property.httpVersion"></a>

```typescript
public readonly httpVersion: HttpVersion;
```

- *Type:* aws-cdk-lib.aws_cloudfront.HttpVersion
- *Default:* HttpVersion.HTTP2

Specify the maximum HTTP version that you want viewers to use to communicate with CloudFront.

For viewers and CloudFront to use HTTP/2, viewers must support TLS 1.2 or later, and must support server name identification (SNI).

---

##### `logBucket`<sup>Optional</sup> <a name="logBucket" id="@astrojs-aws/construct.DistributionOptions.property.logBucket"></a>

```typescript
public readonly logBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* A bucket is created if `enableLogging` is true

The Amazon S3 bucket to store the access logs in.

---

##### `logFilePrefix`<sup>Optional</sup> <a name="logFilePrefix" id="@astrojs-aws/construct.DistributionOptions.property.logFilePrefix"></a>

```typescript
public readonly logFilePrefix: string;
```

- *Type:* string
- *Default:* no prefix

An optional string that you want CloudFront to prefix to the access log filenames for this distribution.

---

##### `logIncludesCookies`<sup>Optional</sup> <a name="logIncludesCookies" id="@astrojs-aws/construct.DistributionOptions.property.logIncludesCookies"></a>

```typescript
public readonly logIncludesCookies: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether you want CloudFront to include cookies in access logs.

---

##### `minimumProtocolVersion`<sup>Optional</sup> <a name="minimumProtocolVersion" id="@astrojs-aws/construct.DistributionOptions.property.minimumProtocolVersion"></a>

```typescript
public readonly minimumProtocolVersion: SecurityPolicyProtocol;
```

- *Type:* aws-cdk-lib.aws_cloudfront.SecurityPolicyProtocol
- *Default:* SecurityPolicyProtocol.TLS_V1_2_2021 if the '

The minimum version of the SSL protocol that you want CloudFront to use for HTTPS connections.

CloudFront serves your objects only to browsers or devices that support at
least the SSL version that you specify.

---

##### `priceClass`<sup>Optional</sup> <a name="priceClass" id="@astrojs-aws/construct.DistributionOptions.property.priceClass"></a>

```typescript
public readonly priceClass: PriceClass;
```

- *Type:* aws-cdk-lib.aws_cloudfront.PriceClass
- *Default:* PriceClass.PRICE_CLASS_ALL

The price class that corresponds with the maximum price that you want to pay for CloudFront service.

If you specify PriceClass_All, CloudFront responds to requests for your objects from all CloudFront edge locations.
If you specify a price class other than PriceClass_All, CloudFront serves your objects from the CloudFront edge location
that has the lowest latency among the edge locations in your price class.

---

##### `sslSupportMethod`<sup>Optional</sup> <a name="sslSupportMethod" id="@astrojs-aws/construct.DistributionOptions.property.sslSupportMethod"></a>

```typescript
public readonly sslSupportMethod: SSLMethod;
```

- *Type:* aws-cdk-lib.aws_cloudfront.SSLMethod
- *Default:* SSLMethod.SNI

The SSL method CloudFront will use for your distribution.

Server Name Indication (SNI) - is an extension to the TLS computer networking protocol by which a client indicates
which hostname it is attempting to connect to at the start of the handshaking process. This allows a server to present
multiple certificates on the same IP address and TCP port number and hence allows multiple secure (HTTPS) websites
(or any other service over TLS) to be served by the same IP address without requiring all those sites to use the same certificate.

CloudFront can use SNI to host multiple distributions on the same IP - which a large majority of clients will support.

If your clients cannot support SNI however - CloudFront can use dedicated IPs for your distribution - but there is a prorated monthly charge for
using this feature. By default, we use SNI - but you can optionally enable dedicated IPs (VIP).

See the CloudFront SSL for more details about pricing : https://aws.amazon.com/cloudfront/custom-ssl-domains/

---

##### `webAclId`<sup>Optional</sup> <a name="webAclId" id="@astrojs-aws/construct.DistributionOptions.property.webAclId"></a>

```typescript
public readonly webAclId: string;
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
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.bucketOptions">bucketOptions</a></code> | <code>aws-cdk-lib.aws_s3.BucketProps</code> | Bucket options which is based on BucketProps. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.distributionDefaultBehaviorOptions">distributionDefaultBehaviorOptions</a></code> | <code>aws-cdk-lib.aws_cloudfront.AddBehaviorOptions</code> | CloudFront distribution default behavior options. |
| <code><a href="#@astrojs-aws/construct.EdgeAstroSiteProps.property.distributionOptions">distributionOptions</a></code> | <code><a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a></code> | CloudFront distribution options. |
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

##### `bucketOptions`<sup>Optional</sup> <a name="bucketOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.bucketOptions"></a>

```typescript
public readonly bucketOptions: BucketProps;
```

- *Type:* aws-cdk-lib.aws_s3.BucketProps

Bucket options which is based on BucketProps.

removalPolicy: @default RemovalPolicy.DESTROY
autoDeleteObjects @default true,

---

##### `distributionDefaultBehaviorOptions`<sup>Optional</sup> <a name="distributionDefaultBehaviorOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.distributionDefaultBehaviorOptions"></a>

```typescript
public readonly distributionDefaultBehaviorOptions: AddBehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.AddBehaviorOptions

CloudFront distribution default behavior options.

---

##### `distributionOptions`<sup>Optional</sup> <a name="distributionOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.distributionOptions"></a>

```typescript
public readonly distributionOptions: DistributionOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a>

CloudFront distribution options.

---

##### `serverOptions`<sup>Optional</sup> <a name="serverOptions" id="@astrojs-aws/construct.EdgeAstroSiteProps.property.serverOptions"></a>

```typescript
public readonly serverOptions: ServerOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.ServerOptions">ServerOptions</a>

The server options.

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
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.bucketOptions">bucketOptions</a></code> | <code>aws-cdk-lib.aws_s3.BucketProps</code> | Bucket options which is based on BucketProps. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.distributionDefaultBehaviorOptions">distributionDefaultBehaviorOptions</a></code> | <code>aws-cdk-lib.aws_cloudfront.AddBehaviorOptions</code> | CloudFront distribution default behavior options. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.distributionOptions">distributionOptions</a></code> | <code><a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a></code> | CloudFront distribution options. |
| <code><a href="#@astrojs-aws/construct.LambdaAstroSiteProps.property.httpApiOptions">httpApiOptions</a></code> | <code>@aws-cdk/aws-apigatewayv2-alpha.HttpApiProps</code> | The HTTP api options. |
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

##### `bucketOptions`<sup>Optional</sup> <a name="bucketOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.bucketOptions"></a>

```typescript
public readonly bucketOptions: BucketProps;
```

- *Type:* aws-cdk-lib.aws_s3.BucketProps

Bucket options which is based on BucketProps.

removalPolicy: @default RemovalPolicy.DESTROY
autoDeleteObjects @default true,

---

##### `distributionDefaultBehaviorOptions`<sup>Optional</sup> <a name="distributionDefaultBehaviorOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.distributionDefaultBehaviorOptions"></a>

```typescript
public readonly distributionDefaultBehaviorOptions: AddBehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.AddBehaviorOptions

CloudFront distribution default behavior options.

---

##### `distributionOptions`<sup>Optional</sup> <a name="distributionOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.distributionOptions"></a>

```typescript
public readonly distributionOptions: DistributionOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a>

CloudFront distribution options.

---

##### `httpApiOptions`<sup>Optional</sup> <a name="httpApiOptions" id="@astrojs-aws/construct.LambdaAstroSiteProps.property.httpApiOptions"></a>

```typescript
public readonly httpApiOptions: HttpApiProps;
```

- *Type:* @aws-cdk/aws-apigatewayv2-alpha.HttpApiProps

The HTTP api options.

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
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.staticDir">staticDir</a></code> | <code>string</code> | The directory of built files, e.g. path.join(__dirname, "../dist"). |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.bucketOptions">bucketOptions</a></code> | <code>aws-cdk-lib.aws_s3.BucketProps</code> | Bucket options which is based on BucketProps. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.distributionDefaultBehaviorOptions">distributionDefaultBehaviorOptions</a></code> | <code>aws-cdk-lib.aws_cloudfront.AddBehaviorOptions</code> | CloudFront distribution default behavior options. |
| <code><a href="#@astrojs-aws/construct.StaticAstroSiteProps.property.distributionOptions">distributionOptions</a></code> | <code><a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a></code> | CloudFront distribution options. |

---

##### `staticDir`<sup>Required</sup> <a name="staticDir" id="@astrojs-aws/construct.StaticAstroSiteProps.property.staticDir"></a>

```typescript
public readonly staticDir: string;
```

- *Type:* string

The directory of built files, e.g. path.join(__dirname, "../dist").

---

##### `bucketOptions`<sup>Optional</sup> <a name="bucketOptions" id="@astrojs-aws/construct.StaticAstroSiteProps.property.bucketOptions"></a>

```typescript
public readonly bucketOptions: BucketProps;
```

- *Type:* aws-cdk-lib.aws_s3.BucketProps

Bucket options which is based on BucketProps.

removalPolicy: @default RemovalPolicy.DESTROY
autoDeleteObjects @default true,

---

##### `distributionDefaultBehaviorOptions`<sup>Optional</sup> <a name="distributionDefaultBehaviorOptions" id="@astrojs-aws/construct.StaticAstroSiteProps.property.distributionDefaultBehaviorOptions"></a>

```typescript
public readonly distributionDefaultBehaviorOptions: AddBehaviorOptions;
```

- *Type:* aws-cdk-lib.aws_cloudfront.AddBehaviorOptions

CloudFront distribution default behavior options.

---

##### `distributionOptions`<sup>Optional</sup> <a name="distributionOptions" id="@astrojs-aws/construct.StaticAstroSiteProps.property.distributionOptions"></a>

```typescript
public readonly distributionOptions: DistributionOptions;
```

- *Type:* <a href="#@astrojs-aws/construct.DistributionOptions">DistributionOptions</a>

CloudFront distribution options.

---



