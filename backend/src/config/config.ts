import * as dotenv from "dotenv";
import path, { join } from "path";
var envFile = path.resolve(join(__dirname, ".env"));
dotenv.config({ path: envFile });

interface config {
  PORT: string;
  JWT_SECRET: string;
}

export const Config: config = {
  PORT: process.env.PORT as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
