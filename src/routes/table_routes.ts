import { Router } from "express";
import * as TableController from "../controllers/table_controller.js";

const tableRouter: Router = Router();

tableRouter.route("/create").post(TableController.createNewTable);

tableRouter.route("/batch").post(TableController.addNewTableFields);

tableRouter.route("/batch").patch(TableController.updateTableFields);

tableRouter.route("/batch").delete(TableController.deleteTableFields);

export default tableRouter;
