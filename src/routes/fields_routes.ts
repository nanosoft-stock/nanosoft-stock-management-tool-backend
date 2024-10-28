import { Router } from "express";
import * as FieldsController from "../controllers/fields_controller.js";

const fieldsRouter: Router = Router();

fieldsRouter.route("/").get(FieldsController.getAllFields);
fieldsRouter.route("/:category").get(FieldsController.getCategoryFields);

fieldsRouter.route("/batch").post(FieldsController.addFields);

fieldsRouter.route("/batch").patch(FieldsController.updateFields);

fieldsRouter.route("/batch").delete(FieldsController.deleteFields);

export default fieldsRouter;
