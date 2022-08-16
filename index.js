import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import activityRoute from "./routes/activity.js";
import userRoute from "./routes/user.js";
import cors from "cors";
import config from "./config.js"

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(config.mongo);
    // await mongoose.connect(config.mongodb.uri, {
    //   user: config.mongodb.username,
    //   pass: config.mongodb.password,
    //   retryWrites: true,
    // });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);

app.use("/activity", activityRoute);
app.use("/users", userRoute);

const port = config.port || 8000
app.listen(port, () => {
  connect();
  console.log("Server is running on port", port);
});
