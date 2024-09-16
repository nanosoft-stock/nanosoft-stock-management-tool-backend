import { Router } from "express";
import * as categoryController from "../controllers/category_controller.js";

const categoryRouter = Router();

categoryRouter.route("/").get(categoryController.getAllCategories);
categoryRouter.route("/:category").get(categoryController.getCategory);

categoryRouter.route("/").post(categoryController.addNewCategory);

categoryRouter.route("/").patch(categoryController.updateCategory);

categoryRouter.route("/").delete(categoryController.deleteCategory);

export default categoryRouter;
