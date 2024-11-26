import { Router } from "express";
import * as UserController from "../controllers/user_controller.js";
import { authorizeUser } from "../config/authorization.js";

const userRouter: Router = Router();

userRouter.route("/:email").get(UserController.getUserByEmail);

userRouter.route("/").post(UserController.addNewUser);

userRouter.route("/").patch(authorizeUser, UserController.updateUser);

userRouter.route("/").delete(authorizeUser, UserController.deleteUser);

export default userRouter;
