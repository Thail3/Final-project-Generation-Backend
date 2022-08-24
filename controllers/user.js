import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloundinary.js";

export const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log("Get All User", users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    // Check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email: req.body.email });

    // const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);

    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    // Create user in our database
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await User({ ...req.body, password: hashPassword });
    const saveUser = await newUser.save();

    // Create token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWTPRIVATEKEY, {
      expiresIn: "70d",
    });

    // Save user token
    saveUser.token = token;

    // Return new user
    res.status(201).json({ message: "User created successfully", saveUser });
  } catch (error) {
    // res.status(500).send({ message: "Internal Server Error", error });
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, password: hashPassword },
      {
        new: true,
      }
    );
    console.log("updateUser", updateUser);
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    console.log("deleteUser", deleteUser);
    res.status(200).json(deleteUser);
  } catch (error) {
    next(error);
  }
};

export const createProfileImg = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateProfileImg = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("updateProfileImg user", user);

    await cloudinary.uploader.destroy(user.cloudinary_id);

    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }

    // const data = {
    //   username: req.body.username || user.username,
    //   profileimg: result?.secure_url || user.profileimg,
    //   cloudinary_id: result?.public_id || user.cloudinary_id,
    // };
    // console.log("updateProfileImg data", data);
    // console.log("updateProfileImg data.profileimg", data.profileimg);
    // console.log("updateProfileImg data.cloudinary_id", data.cloudinary_id);

    user = await User.findByIdAndUpdate(req.params.id, result, {
      new: true,
    });

    console.log("updateProfileImg", user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
