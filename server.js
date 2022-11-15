require("dotenv").config();

// //===========================================================================

const express = require("express");
const cors = require("cors");
const app = express();
const port = 8001;

//================================AWS S3 BUCKET NEW============================

const s3 = require("./s3");

app.use(express.static("front"));
app.use(cors());

app.get("/s3Url", async (req, res) => {
  const url = await s3.generateUploadURL();
  res.send({ url });
});

//============================================================================

const userRoutes = require("./router/userData");
const handymanRoutes = require("./router/handymanData");
const servicesRoutes = require("./router/servicesData");
const jobsRoutes = require("./router/jobsData");
const loginRoutes = require("./router/userloginData");
const profileImageRoutes = require("./router/profileimageData");
const serviceImageRoutes = require("./router/serviceimageData");
const inboxRoutes = require("./router/inboxData");

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
app.use("/profileimage", profileImageRoutes);
app.use("/serviceimage", serviceImageRoutes);
app.use("/inbox", inboxRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
