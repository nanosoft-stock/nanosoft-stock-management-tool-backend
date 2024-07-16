import express from "express";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../controllers/user_controller.js";

const userRouter = express.Router();

userRouter.route("/:email").get(getUserByEmail);
userRouter.route("/new").post(createNewUser);
userRouter.route("/:email").patch(updateUser);
userRouter.route("/:email").delete(deleteUser);

export default userRouter;
