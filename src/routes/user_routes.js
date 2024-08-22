import { Router } from "express";
import * as userController from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.route("/:email").get(userController.getUserByEmail);

userRouter.route("/").post(userController.addNewUser);

userRouter.route("/:userUUID").patch(userController.updateUser);

userRouter.route("/:userUUID").delete(userController.deleteUser);

export default userRouter;
