import { Router } from "express";
import * as CategoryController from "../controllers/category_controller.js";

const categoryRouter: Router = Router();

categoryRouter.route("/").get(CategoryController.getAllCategories);

categoryRouter.route("/").post(CategoryController.addNewCategory);

categoryRouter.route("/").patch(CategoryController.updateCategory);

categoryRouter.route("/").delete(CategoryController.deleteCategory);

export default categoryRouter;
