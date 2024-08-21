import { Router } from "express";
import * as slhController from "../controllers/stock_location_history_controller.js";

const stockLocationHistoryRouter = Router();

stockLocationHistoryRouter.route("/:slhUid").get(slhController.getStockLocationHistory);
stockLocationHistoryRouter.route("/").get(slhController.getAllStockLocationHistory);

stockLocationHistoryRouter.route("/").post(slhController.addStockLocationHistory);
stockLocationHistoryRouter.route("/batch").post(slhController.addStockLocationHistories);

stockLocationHistoryRouter.route("/").patch(slhController.updateStockLocationHistory);
stockLocationHistoryRouter.route("/batch").patch(slhController.updateStockLocationHistories);

stockLocationHistoryRouter.route("/").delete(slhController.deleteStockLocationHistory);
stockLocationHistoryRouter.route("/batch").delete(slhController.deleteStockLocationHistories);

export default stockLocationHistoryRouter;
