import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { handleFileUploadS3 } from "../utils/fileHandler";

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
    const response = await handleFileUploadS3(picture, user);
    return response;
  }
}
