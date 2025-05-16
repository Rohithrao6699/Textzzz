import { NextFunction, Request, Response } from "express";
const Jwt_Secret = "123Random";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../types/AppError";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedInfo = jwt.verify(token, Jwt_Secret);
      if (decodedInfo) {
        req.userId = (decodedInfo as JwtPayload).id;
        next();
      } else {
        throw new AppError("unable to verify jwt!", 400);
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw new AppError("auth token not present", 411);
  }
}
