import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import AuthService from "../../services/authServices";
import { userSigninSchema } from "../../utils/ZodSchema";

export async function userSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  const validUser = userSigninSchema.safeParse({ email, password });
  type User = z.infer<typeof userSigninSchema>;

  if (validUser.success) {
    const safeUser: User = { email, password };
    try {
      const token = await AuthService.SigninService(safeUser);

      res.status(200).json({
        success: true,
        content: token,
        message: "auth token sent",
      });
    } catch (error) {
      next(error);
    }
  } else {
    throw validUser.error;
  }
}
