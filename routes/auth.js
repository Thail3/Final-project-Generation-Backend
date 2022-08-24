import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("Hi")
  res.json("Hello World");
});

router.post("/", async (req, res) => {
  try {
    // Validate user input
    if (!(req.body.email && req.body.password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    // Create token
    const token = user.generateAuthToken();
    console.log(`User id : ${user._id} is logged in`)
    res
      .status(200)
      .send({ token, message: "Logged in successfully", user_id: user._id });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

export default router;
