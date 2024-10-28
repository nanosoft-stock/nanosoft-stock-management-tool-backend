import { Router } from "express";
import * as ContainerController from "../controllers/container_controller.js";

const containerRouter: Router = Router();

containerRouter.route("/").get(ContainerController.getAllContainers);
containerRouter.route("/:containerId").get(ContainerController.getContainer);

containerRouter.route("/").post(ContainerController.addContainer);
containerRouter.route("/batch").post(ContainerController.addContainers);

containerRouter.route("/").patch(ContainerController.updateContainer);
containerRouter.route("/batch").patch(ContainerController.updateContainers);

containerRouter.route("/").delete(ContainerController.deleteContainer);
containerRouter.route("/batch").delete(ContainerController.deleteContainers);

containerRouter
  .route("/generate")
  .post(ContainerController.generateNewContainers);
containerRouter
  .route("/generate")
  .delete(ContainerController.deleteGeneratedContainers);

export default containerRouter;
