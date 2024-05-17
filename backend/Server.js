const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const color = require("colors");
require("dotenv").config();
const userRoute = require("./Routes/UserRoute");
const jobsRoute = require("./Routes/JobsRoute");
const activityRoute = require("./Routes/ActivityRoute");
const bioRoute = require("./Routes/BioRoute");
const errorHandling = require("./Middlewares/ErrorHandling");

const port = process.env.PORT || 3005;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected to database".bgWhite);
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();

app.use("/", userRoute);
app.use("/", jobsRoute);
app.use("/", activityRoute);
app.use("/", bioRoute);

app.use(errorHandling);

app.listen(port, () => console.log(`server is running at port ${port}`.yellow));
