import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../types/AppError";
import { Config } from "../config/config";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decodedInfo = jwt.verify(token, Config.JWT_SECRET);
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
