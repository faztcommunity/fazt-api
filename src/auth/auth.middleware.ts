// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { decodeAuthorization, decodeToken } from "./auth";
import { Request, Response, NextFunction } from "express";

export const checkAuth = (action: string) => {
  function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = decodeAuthorization(req);
    const payload = decodeToken(token);

    switch (action) {
      case "updateOrDelete":
        req.params._id = payload.sub;
        next();
        break;
    }
  }
  return authMiddleware;
};
