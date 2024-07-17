import { Router } from "express";
import * as itemController from "../controllers/item_controller.js";

const itemRouter = Router();

itemRouter.route("/").get(itemController.getAllItems);
itemRouter.route("/new").post(itemController.addNewItem);
itemRouter.route("/entries").patch(itemController.addNewItems);
itemRouter.route("/:itemId").patch(itemController.updateItem);

export default itemRouter;
