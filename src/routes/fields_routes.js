import { Router } from "express";
import * as fieldsController from "../controllers/fields_controller.js";

const fieldsRouter = Router();

fieldsRouter.route("/").get(fieldsController.getAllFields);
fieldsRouter.route("/:categoryUUID").get(fieldsController.getCategoryFields);
fieldsRouter.route("/batch").post(fieldsController.addFields);
fieldsRouter.route("/batch").patch(fieldsController.updateFields);
fieldsRouter.route("/batch").delete(fieldsController.deleteFields);

export default fieldsRouter;
