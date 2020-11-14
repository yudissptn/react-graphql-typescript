import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { handleFileUpload } from "../utils/s3Handler";

@ObjectType()
class S3Object {
  @Field()
  ETag: String;
  @Field()
  Location: String;
  @Field()
  Key: String;
  @Field()
  Bucket: String;
}

@Resolver()
export class PictureResolver {
  @Mutation(() => S3Object)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload) picture: FileUpload,
    @Arg("user", () => String) user: string
  ) {
    const response = await handleFileUpload(picture, user);
    return response;
  }
}
