import { Response } from "express";

type StatusCode = "200" | "201" | "400" | "401" | "404" | "500"; //status for server

interface IMessage {
  //interface for message the status server
  [code: string]: string;
}

const statusResponse: IMessage = {
  //response the server with statusCode
  "200": "OK!",
  "201": "CREATED!",
  "400": "CLIENT ERROR!",
  "401": "UNAUTHORIZED",
  "404": "NOT FOUND!",
  "500": "INTERNAL SERVER ERROR",
};

export const success = (
  res: Response,
  data: any,
  statusCode: StatusCode
): Response => {
  return res //return with response, status code, json
    .status(Number(statusCode))
    .json({ message: statusResponse[statusCode], data, statusCode }); //message: statusResponse:'ok', 'create'... data:User:{name, password..}
};

export const error = (
  res: Response,
  statusCode: StatusCode,
  extraInfo?: string
) => {
  return res
    .status(Number(statusCode))
    .json({ message: statusResponse[statusCode], statusCode, extraInfo }); //message: statusResponse: 'internal error', 'client error'..., extraInfo: "Credentials invalid"
};
