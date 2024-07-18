import { Router } from "express";
import * as itemController from "../controllers/item_controller.js";

const itemRouter = Router();

itemRouter.route("/").get(itemController.getAllItems);
itemRouter.route("/").post(itemController.addNewItem);
itemRouter.route("/batch").post(itemController.addNewItems);
itemRouter.route("/:itemId").patch(itemController.updateItem);

export default itemRouter;
