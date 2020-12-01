import { ObjectType, Field } from "type-graphql";
@ObjectType()
export class S3Object {
  @Field()
  ETag: String;
  @Field()
  Location: String;
  @Field()
  Key: String;
  @Field()
  Bucket: String;
}
