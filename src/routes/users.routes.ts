import { Router } from "express";
import * as userCtrl from "../controllers/user.controller";
import { handlerExceptionRoute } from "../error";
import { authMiddleware } from "../util/secure/middlewareAuth";

const router = Router();

router
  .route("/")
  .get(handlerExceptionRoute(userCtrl.getUsers))
  .post(handlerExceptionRoute(userCtrl.createUser));

router
  .route("/:id")
  .get(userCtrl.getUser)
  .put(handlerExceptionRoute(userCtrl.updateUser))
  .delete(authMiddleware, handlerExceptionRoute(userCtrl.deleteUser));

router.route("/signin").post(userCtrl.signin);

export default router;
