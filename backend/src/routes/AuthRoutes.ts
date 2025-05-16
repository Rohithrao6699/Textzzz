import { Router } from "express";
import { userSignUp } from "../handlers/userAuth/userSignUp";
import { userSignIn } from "../handlers/userAuth/userSignIn";

const userRouter = Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);

export default userRouter;
