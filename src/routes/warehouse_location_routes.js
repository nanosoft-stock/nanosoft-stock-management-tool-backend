import { Router } from "express";
import * as warehouseLocationController from "../controllers/warehouse_location_controller.js";

const warehouseLocationRouter = Router();

warehouseLocationRouter
  .route("/")
  .get(warehouseLocationController.getAllWarehouseLocations);
warehouseLocationRouter
  .route("/:warehouseLocationId")
  .get(warehouseLocationController.getWarehouseLocation);

warehouseLocationRouter
  .route("/")
  .post(warehouseLocationController.addWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .post(warehouseLocationController.addWarehouseLocations);

warehouseLocationRouter
  .route("/")
  .patch(warehouseLocationController.updateWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .patch(warehouseLocationController.updateWarehouseLocations);

warehouseLocationRouter
  .route("/")
  .delete(warehouseLocationController.deleteWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .delete(warehouseLocationController.deleteWarehouseLocations);

export default warehouseLocationRouter;
