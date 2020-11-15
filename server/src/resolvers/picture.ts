import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { handleFileUploadS3, handleUploadLocal } from "../utils/fileHandler";
import { __prod__ } from "../constants";

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
    const response = __prod__
      ? await handleFileUploadS3(picture, user)
      : await handleUploadLocal(picture, user);
    return response;
  }
}
