import { Router } from "express";
import * as itemController from "../controllers/item_controller.js";

const itemRouter = Router();

itemRouter.route("/:itemId").get(itemController.getItem);
itemRouter.route("/").get(itemController.getAllItems);

itemRouter.route("/").post(itemController.addItem);
itemRouter.route("/batch").post(itemController.addItems);

itemRouter.route("/").patch(itemController.updateItem);
itemRouter.route("/batch").patch(itemController.updateItems);

itemRouter.route("/").delete(itemController.deleteItem);
itemRouter.route("/batch").delete(itemController.deleteItems);

export default itemRouter;
