import { success } from "../../network/response";
import { validateToken, decodeToken } from "../service/Auth";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = validateToken(req);
  const payload = await decodeToken(token);

  req.user = payload.sub;
  next();
};
