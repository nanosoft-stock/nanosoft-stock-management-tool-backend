import { Router } from "express";
import * as categoryController from "../controllers/category_controller.js";

const categoryRouter = Router();

categoryRouter.route("/").get(categoryController.getAllCategories);
categoryRouter.route("/:category").get(categoryController.getCategory);
categoryRouter.route("/").post(categoryController.addNewCategory);
categoryRouter.route("/:categoryUUID").patch(categoryController.updateCategory);
categoryRouter
  .route("/:categoryUUID")
  .delete(categoryController.deleteCategory);

export default categoryRouter;
