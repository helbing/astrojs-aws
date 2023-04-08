import {
  Distribution,
  Function,
  FunctionCode,
  FunctionEventType,
} from "aws-cdk-lib/aws-cloudfront"
import {
  Bucket,
  BucketMetrics,
  CorsRule,
  EventType,
  IBucketNotificationDestination,
  Inventory,
  LifecycleRule,
  NotificationKeyFilter,
} from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

import { AstroSiteConstruct } from "./construct"
import { StaticAstroSiteProps } from "./types"

export class StaticAstroSite extends AstroSiteConstruct {
  private readonly bucket: Bucket
  private readonly distribution: Distribution
  readonly bucketArn: string
  readonly bucketName: string
  readonly distributionDomainName: string
  readonly domainName: string

  constructor(scope: Construct, id: string, props: StaticAstroSiteProps) {
    super(scope, id)

    this.bucket = this.newBucket(this, props.staticDir, props.bucketOptions)

    // add index.html in uri by default for every directories
    const fn = new Function(this, "RedirectToIndexFunction", {
      code: FunctionCode.fromInline(`
        function handler(event) {
          var request = event.request
          if (request.uri.endsWith("/")) {
            request.uri += "index.html";
          } else if (!request.uri.includes(".")) {
            request.uri += "/index.html";
          }
          return request
        }
      `),
    })

    this.distribution = new Distribution(this, "Distribution", {
      ...props.distributionOptions,
      defaultBehavior: {
        origin: this.newS3Origin(this, this.bucket),
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: fn,
          },
        ],
      },
    })

    this.bucketArn = this.bucket.bucketArn
    this.bucketName = this.bucket.bucketName
    this.distributionDomainName = this.distribution.distributionDomainName
    this.domainName = this.distribution.domainName
  }
  /**
   * Add a lifecycle rule to the bucket
   *
   * @param rule The rule to add
   */
  addLifecycleRule(rule: LifecycleRule) {
    this.bucket.addLifecycleRule(rule)
  }
  /**
   * Adds a metrics configuration for the CloudWatch request metrics from the bucket.
   *
   * @param metric The metric configuration to add
   */
  addMetric(metric: BucketMetrics) {
    this.bucket.addMetric(metric)
  }
  /**
   * Adds a cross-origin access configuration for objects in an Amazon S3 bucket
   *
   * @param rule The CORS configuration rule to add
   */
  addCorsRule(rule: CorsRule) {
    this.bucket.addCorsRule(rule)
  }
  /**
   * Add an inventory configuration.
   *
   * @param inventory configuration to add
   */
  addInventory(inventory: Inventory) {
    this.bucket.addInventory(inventory)
  }
  /**
   * Adds a bucket notification event destination.
   * @param event The event to trigger the notification
   * @param dest The notification destination (Lambda, SNS Topic or SQS Queue)
   *
   * @param filters S3 object key filter rules to determine which objects
   * trigger this event. Each filter must include a `prefix` and/or `suffix`
   * that will be matched against the s3 object key. Refer to the S3 Developer Guide
   * for details about allowed filter rules.
   *
   * @see https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html#notification-how-to-filtering
   *
   * @example
   *
   *    declare const myLambda: lambda.Function;
   *    const bucket = new s3.Bucket(this, 'MyBucket');
   *    bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(myLambda), {prefix: 'home/myusername/*'});
   *
   * @see
   * https://docs.aws.amazon.com/AmazonS3/latest/dev/NotificationHowTo.html
   */
  addEventNotification(
    event: EventType,
    dest: IBucketNotificationDestination,
    ...filters: NotificationKeyFilter[]
  ) {
    this.bucket.addEventNotification(event, dest, ...filters)
  }
}
