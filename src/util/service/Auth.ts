import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { ErrorHandler } from "../../error";
import { UNAUTHORIZED } from "http-status-codes";

interface IPayload {
  sub: {
    id: string;
  };
}

export const comparePassword = async (
  unHashedPassword: string,
  passwordHashed: string
) => {
  return await compare(unHashedPassword, passwordHashed);
};

export const generateAndSignToken = async (payload: IPayload) => {
  return await jwt.sign(payload, "secre198247242", { expiresIn: "1h" });
};

export const decodeToken = async (token: string) => {
  const payload = (await jwt.verify(token, "secre198247242")) as IPayload;
  if (!payload) {
    throw { message: "Token invalid" };
  }
  return payload;
};

export const validateToken = (req: Request) => {
  const authorization = req.headers.authorization || "";
  const token = authorization.split(" ")[0];
  if (!token) {
    throw new ErrorHandler(UNAUTHORIZED, "token invalid");
  }
  return token;
};
