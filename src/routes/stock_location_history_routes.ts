import { Router } from "express";
import * as SlhController from "../controllers/stock_location_history_controller.js";

const stockLocationHistoryRouter: Router = Router();

stockLocationHistoryRouter
  .route("/")
  .get(SlhController.getAllStockLocationHistory);

stockLocationHistoryRouter
  .route("/")
  .post(SlhController.addStockLocationHistory);
stockLocationHistoryRouter
  .route("/batch")
  .post(SlhController.addStockLocationHistories);

stockLocationHistoryRouter
  .route("/")
  .patch(SlhController.updateStockLocationHistory);
stockLocationHistoryRouter
  .route("/batch")
  .patch(SlhController.updateStockLocationHistories);

stockLocationHistoryRouter
  .route("/")
  .delete(SlhController.deleteStockLocationHistory);
stockLocationHistoryRouter
  .route("/batch")
  .delete(SlhController.deleteStockLocationHistories);

stockLocationHistoryRouter
  .route("/query")
  .post(SlhController.queryStockLocationHistory);

stockLocationHistoryRouter.route("/itemHistory").get(SlhController.itemHistory);

stockLocationHistoryRouter
  .route("/containerHistory")
  .get(SlhController.containerHistory);

export default stockLocationHistoryRouter;
