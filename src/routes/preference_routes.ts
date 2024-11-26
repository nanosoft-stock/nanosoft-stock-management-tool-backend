import { Router } from "express";
import * as PreferenceController from "../controllers/preference_controller.js";

const preferenceRouter: Router = Router();

preferenceRouter.route("/").get(PreferenceController.getUserPreference);

preferenceRouter.route("/").post(PreferenceController.addUserPreference);

preferenceRouter.route("/").patch(PreferenceController.updateUserPreference);

preferenceRouter.route("/").delete(PreferenceController.deleteUserPreference);

preferenceRouter
  .route("/table")
  .get(PreferenceController.getUserTablePreference);

preferenceRouter
  .route("/table/user")
  .get(PreferenceController.getAllUserTablePreferences);

preferenceRouter
  .route("/table/current")
  .get(PreferenceController.getUserCurrentTablePreference);

preferenceRouter
  .route("/table")
  .post(PreferenceController.addUserTablePreference);

preferenceRouter
  .route("/table")
  .patch(PreferenceController.updateUserTablePreference);

preferenceRouter
  .route("/table")
  .delete(PreferenceController.deleteUserTablePreference);

export default preferenceRouter;
