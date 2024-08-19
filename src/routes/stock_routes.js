import { Router } from "express";
import * as stockController from "../controllers/stock_controller.js";

const stockRouter = Router();

stockRouter.route("/:itemId").get(stockController.getStock);
stockRouter.route("/").get(stockController.getAllStocks);

stockRouter.route("/").post(stockController.addStock);
stockRouter.route("/batch").post(stockController.addStocks);

// TODO : UPDATE and DELETE endpoints
stockRouter.route("/").patch(stockController.updateStock);
stockRouter.route("/batch").patch(stockController.updateStocks);

stockRouter.route("/").delete(stockController.deleteStock);
stockRouter.route("/batch").delete(stockController.deleteStocks);

stockRouter.route("/query").post(stockController.queryStocks);

export default stockRouter;
