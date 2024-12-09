import { Router } from "express";
import * as WarehouseLocationController from "../controllers/warehouse_location_controller.js";

const warehouseLocationRouter: Router = Router();

warehouseLocationRouter
  .route("/")
  .get(WarehouseLocationController.getAllWarehouseLocations);

warehouseLocationRouter
  .route("/")
  .post(WarehouseLocationController.addWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .post(WarehouseLocationController.addWarehouseLocations);

warehouseLocationRouter
  .route("/")
  .patch(WarehouseLocationController.updateWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .patch(WarehouseLocationController.updateWarehouseLocations);

warehouseLocationRouter
  .route("/")
  .delete(WarehouseLocationController.deleteWarehouseLocation);
warehouseLocationRouter
  .route("/batch")
  .delete(WarehouseLocationController.deleteWarehouseLocations);

warehouseLocationRouter
  .route("/query")
  .post(WarehouseLocationController.queryWarehouseLocations);

export default warehouseLocationRouter;
