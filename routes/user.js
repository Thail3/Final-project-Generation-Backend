import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateProfileImg,
  // createProfileImg,
} from "../controllers/user.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

//Get all user
router.get("/", getUser);

//Create activity
router.post("/", createUser);
// router.post("/", upload.single("image"), createProfileImg);

//Patch activity
router.patch("/:id", updateUser);
// router.patch("/profileimg/:id", updateProfileImg);
router.patch("/profileimg/:id", upload.single("image"), updateProfileImg);
router.patch("/backgroundimg/:id");

//Delete activity
router.delete("/:id", deleteUser);
export default router;
