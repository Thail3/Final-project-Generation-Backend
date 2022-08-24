import express from "express";
import authRoute from "../routes/auth.js";
import activityRoute from "../routes/activity.js";
import userRoute from "../routes/user.js";
import dotenv from "dotenv";
import cors from "cors";
import config from "../config.js";
import mongoose from "mongoose";
import auth from '../middleware/auth.js'

const app = express();
dotenv.config();

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongo);
    return next();
  });
}

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/auth", authRoute);


app.use("/activity", auth, activityRoute);
app.use("/users", userRoute);

export default app;
