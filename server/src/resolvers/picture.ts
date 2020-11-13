import { Resolver, Mutation, Arg } from "type-graphql";
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class PictureResolver {
  @Mutation(() => String)
  async addProfilePicture(
    @Arg("picture", () => GraphQLUpload) picture: FileUpload
  ) {
    const { createReadStream, filename } = await picture;
    const writableStream = createWriteStream(
      `${__dirname}/../../../images/${filename}`,
      { autoClose: true }
    );
    console.log(picture);
    return new Promise((res, _rej) => {
      createReadStream()
        .pipe(writableStream)
        .on("finish", () => res(filename))
        .on("error", () => {
          throw Error("Upload failed");
        });
    });
  }
}
