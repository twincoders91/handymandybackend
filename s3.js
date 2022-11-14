const aws = require("aws-sdk");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region: "ap-southeast-1",
  accessKey,
  secretAccessKey,
  signatureVersion: "v4",
});

const generateUploadURL = async () => {
  const randomNumber = String(Math.random() * 10000);
  const imageName = randomNumber;

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

module.exports = {
  generateUploadURL,
};
