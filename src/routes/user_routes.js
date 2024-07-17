import { Router } from "express";
import * as userController from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.route("/:email").get(userController.getUserByEmail);
userRouter.route("/add").post(userController.addNewUser);
userRouter.route("/:email").patch(userController.updateUser);
userRouter.route("/:email").delete(userController.deleteUser);

export default userRouter;
