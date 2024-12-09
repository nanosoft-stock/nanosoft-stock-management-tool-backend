import { Router } from "express";
import * as StockController from "../controllers/stock_controller.js";

const stockRouter: Router = Router();

stockRouter.route("/").get(StockController.getAllStocks);

stockRouter.route("/").post(StockController.addStock);
stockRouter.route("/batch").post(StockController.addStocks);

stockRouter.route("/").patch(StockController.updateStock);
stockRouter.route("/batch").patch(StockController.updateStocks);

stockRouter.route("/").delete(StockController.deleteStock);
stockRouter.route("/batch").delete(StockController.deleteStocks);

stockRouter.route("/query").post(StockController.queryStocks);

export default stockRouter;
