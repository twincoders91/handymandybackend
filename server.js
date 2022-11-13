// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import multer from "multer";

require("dotenv").config();

// //================================AWS S3 BUCKET============================
// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: accessKey,
//     secretAccessKey: secretAccessKey,
//   },
//   region: bucketRegion,
// });

// //================================Multer============================
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// upload.single("image");
// //===========================================================================

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8001;

const userRoutes = require("./router/userData");
const handymanRoutes = require("./router/handymanData");
const servicesRoutes = require("./router/servicesData");
const jobsRoutes = require("./router/jobsData");
const loginRoutes = require("./router/userloginData");

//middleware to allow us to POST and get JSON from our endpoints.
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.use("/user", userRoutes);
app.use("/handyman", handymanRoutes);
app.use("/services", servicesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/login", loginRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
