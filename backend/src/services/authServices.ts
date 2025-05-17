import { AppError } from "../types/AppError";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";

const Prisma = new PrismaClient();

interface SignupServiceType {
  email: string;
  password: string;
  name?: string | undefined;
}
interface SigninServiceType {
  email: string;
  password: string;
}

class AuthService {
  //
  //
  async SignupService(safeUser: SignupServiceType) {
    const hashed = await bcrypt.hash(safeUser.password, 10);
    console.log(process.env.JWT_SECRET);
    const response = await Prisma.user.create({
      data: {
        email: safeUser.email,
        password: hashed,
        name: safeUser.name as string,
      },
    });

    if (!response) {
      throw new AppError("unable to create user", 400);
    }

    return response;
  }

  //
  //
  async SigninService(safeUser: SigninServiceType) {
    const userMatch = await Prisma.user.findFirst({
      where: { email: safeUser.email },
    });
    if (userMatch) {
      const passwordMatch = await bcrypt.compare(
        safeUser.password,
        userMatch.password
      );
      if (passwordMatch) {
        const id = userMatch?.id;
        const token = jwt.sign({ id }, Config.JWT_SECRET);
        return token;
      } else {
        throw new AppError("invalid Password", 411);
      }
    } else {
      throw new AppError("user not found, please SignUp first!", 411);
    }
  }
}

export default new AuthService();
