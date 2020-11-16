import aws from "aws-sdk";
import { v4 } from "uuid";
import { Upload } from "../resolvers/Upload";
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from "fs";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});
const s3DefaultParams = {
  ACL: "public-read",
  Bucket: process.env.S3_BUCKET_NAME,
  Conditions: [["content-length-range", 0, 1024000], { acl: "public-read" }],
};

export const handleFileUploadS3 = async (file: Upload, user: string) => {
  const { createReadStream, filename } = await file;

  const key = v4();

  return new Promise((resolve, reject) => {
    s3.upload(
      {
        ...s3DefaultParams,
        Body: createReadStream(),
        Key: `${user}/${key}-${filename}`,
      },
      (err, data) => {
        if (err) {
          console.log("error uploading...", err);
          reject(err);
        } else {
          console.log("successfully uploaded file...", data);
          resolve(data);
        }
      }
    );
  });
};

export const handleDeleteImageS3 = async (path: string) => {
  const params = {
    Bucket: s3DefaultParams.Bucket,
    Delete: {
      // required
      Objects: [
        // required
        {
          Key: path.substring(58, path.length), // get 'user/filename'
        },
      ],
    },
  };
  s3.deleteObjects(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else console.log(`Deleted pict: ${path}`, data); // deleted
  });
};

const baseLocalDir = `${__dirname}/../../../client/public/images`;

export const handleUploadLocal = async (file: Upload, user: string) => {
  const { createReadStream, filename } = await file;

  if (!existsSync(`${baseLocalDir}/${user}/`)) {
    console.log("not exists");
    mkdirSync(`${baseLocalDir}/${user}/`, { recursive: true });
  }

  const path = `${baseLocalDir}/${user}/${filename}`;

  const writableStream = createWriteStream(path, { autoClose: true });
  console.log(path);
  return new Promise((res, _rej) => {
    createReadStream()
      .pipe(writableStream)
      .on("finish", () =>
        res({
          ETag: `Local pict ${filename}`,
          Location: `/images/${user}/${filename}`,
          Key: "Local Key",
          Bucket: "Local Bucket",
        })
      )
      .on("error", (error) => {
        console.log(error.message);
        throw Error("Upload failed: ");
      });
  });
};

export const handleDeleteLocal = async (path: string) => {
  unlinkSync(`${baseLocalDir}/${path.slice(8)}`);
};
