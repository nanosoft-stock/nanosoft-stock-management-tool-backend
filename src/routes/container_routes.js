import { Router } from "express";
import * as containerService from "../controllers/container_controller.js";

const containerRouter = Router();

containerRouter.route("/").get(containerService.getAllContainers);
containerRouter.route("/add").post(containerService.addNewContainer);
containerRouter.route("/batch").post(containerService.addNewContainers);
containerRouter.route("/:container-id").patch(containerService.updateContainer);

export default containerRouter;
