import { Router } from "express";
import * as ItemController from "../controllers/item_controller.js";

const itemRouter: Router = Router();

itemRouter.route("/").get(ItemController.getAllItems);

itemRouter.route("/").post(ItemController.addItem);
itemRouter.route("/batch").post(ItemController.addItems);

itemRouter.route("/").patch(ItemController.updateItem);
itemRouter.route("/batch").patch(ItemController.updateItems);

itemRouter.route("/").delete(ItemController.deleteItem);
itemRouter.route("/batch").delete(ItemController.deleteItems);

itemRouter.route("/query").post(ItemController.queryItems);

itemRouter.route("/generate").post(ItemController.generateNewItems);
itemRouter.route("/generate").delete(ItemController.deleteGeneratedItems);

export default itemRouter;
