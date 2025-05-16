import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { userSchema } from "../../utils/ZodSchema";
import { AppError } from "../../types/AppError";
import AuthService from "../../services/authServices";

export async function userSignUp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, name } = req.body;

  const validUser = userSchema.safeParse({
    email,
    password,
    name,
  });

  type User = z.infer<typeof userSchema>;

  if (validUser.success) {
    try {
      const safeUser: User = { email, password, name };

      const response = await AuthService.SignupService(safeUser);
      if (response) {
        res.status(200).json({
          success: true,
          content: response,
          message: "user signedup",
        });
      } else {
        throw new AppError("unable to signUp", 411);
      }
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}
