import { error } from "../network/response";
import { decodeAuthorization, decodeToken } from "./auth";
import { Request, Response, NextFunction } from "express";

export const checkAuth = (action: string) => {
  function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const token = decodeAuthorization(req);
      const payload = decodeToken(token);

      switch (action) {
        case "updateOrDelete":
          req.params._id = payload.sub;
          next();
          break;

        default:
          error(res, "500");
      }
    } catch (error) {
      error(res, error.code);
    }
  }
  return authMiddleware;
};
