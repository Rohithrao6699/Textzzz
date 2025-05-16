import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
main();
const Prisma = new PrismaClient();

app.post("/singup", async (req, res) => {
  const { email, password, name } = req.body;

  const response = await Prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  res.json({
    response,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const response = await Prisma.user.findFirst({
    where: { email: email, password: password },
  });
  res.json({
    response,
  });
});

function main() {
  app.listen(3000, function () {
    console.log("running on port 3000");
  });
}
