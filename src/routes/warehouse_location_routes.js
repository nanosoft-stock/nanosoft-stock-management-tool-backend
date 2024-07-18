import { Router } from "express";
import * as warehouseLocationController from "../controllers/warehouse_location_controller.js";

const warehouseLocationRouter = Router();

warehouseLocationRouter
  .route("/")
  .get(warehouseLocationController.getAllWarehouseLocations);
warehouseLocationRouter
  .route("/")
  .post(warehouseLocationController.addNewWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .post(warehouseLocationController.addNewWarehouseLocations);

export default warehouseLocationRouter;
