import { Router } from "express";
import * as containerController from "../controllers/container_controller.js";

const containerRouter = Router();

containerRouter.route("/:containerId").get(containerController.getContainer);
containerRouter.route("/").get(containerController.getAllContainers);

containerRouter.route("/").post(containerController.addContainer);
containerRouter.route("/batch").post(containerController.addContainers);

containerRouter.route("/").patch(containerController.updateContainer);
containerRouter.route("/batch").patch(containerController.updateContainers);

containerRouter.route("/").delete(containerController.deleteContainer);
containerRouter.route("/batch").delete(containerController.deleteContainers);

export default containerRouter;
