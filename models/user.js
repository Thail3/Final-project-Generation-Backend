import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 4,
      maxLength: 32,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 128,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minLength: 4,
      maxLength: 128,
    },
    profileimg: {
      type: String,
      required: false,
    },
    backgroundimg: {
      type: String,
      required: false,
    },
    cloudinary_id: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

export default mongoose.model("User", UserSchema);
