import { Router } from "express";
import * as itemController from "../controllers/item_controller.js";

const itemRouter = Router();

itemRouter.route("/").get(itemController.getAllItems);
itemRouter.route("/add").post(itemController.addNewItem);
itemRouter.route("/batch").post(itemController.addNewItems);
itemRouter.route("/:item-id").patch(itemController.updateItem);

export default itemRouter;
