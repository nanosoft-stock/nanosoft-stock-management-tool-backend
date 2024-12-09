import { Router } from "express";
import * as FieldsController from "../controllers/fields_controller.js";

const fieldsRouter: Router = Router();

fieldsRouter.route("/").get(FieldsController.getAllFields);

fieldsRouter.route("/").post(FieldsController.addField);
fieldsRouter.route("/batch").post(FieldsController.addFields);

fieldsRouter.route("/").patch(FieldsController.updateField);
fieldsRouter.route("/batch").patch(FieldsController.updateFields);

fieldsRouter.route("/").delete(FieldsController.deleteField);
fieldsRouter.route("/batch").delete(FieldsController.deleteFields);

export default fieldsRouter;
