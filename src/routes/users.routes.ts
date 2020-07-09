import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { checkAuth } from "../auth/auth.middleware";

const router = Router();

router.route("/").get(userCtrl.getUsers).post(userCtrl.createUser);

router
  .route("/:id")
  .get(userCtrl.getUser)
  .put(checkAuth("updateOrDelete"), userCtrl.updateUser)
  .delete(checkAuth("updateOrDelete"), userCtrl.deleteUser);

router.route("/signin").post(userCtrl.signinUser);

export default router;
