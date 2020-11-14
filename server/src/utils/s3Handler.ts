import aws from "aws-sdk";
import { v4 } from "uuid";
import { Upload } from "../resolvers/Upload";

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

export const handleFileUpload = async (file: Upload, user: string) => {
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

export const handleDeleteImage = async (path: string) => {
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
