import { Router } from "express";
import * as UserController from "../controllers/user_controller.js";

const userRouter: Router = Router();

userRouter.route("/:email").get(UserController.getUserByEmail);

userRouter.route("/").post(UserController.addNewUser);

userRouter.route("/").patch(UserController.updateUser);

userRouter.route("/").delete(UserController.deleteUser);

export default userRouter;
