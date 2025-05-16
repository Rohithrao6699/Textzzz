import express from "express";
import errorMiddleWare from "./middleware/ErrorMiddleware";
import userRouter from "./routes/AuthRoutes";
import RoomRouter from "./routes/RoomRoutes";

const app = express();
app.use(express.json());

app.use("/auth", userRouter);
app.use("/room", RoomRouter);

app.use(errorMiddleWare);
main();

function main() {
  app.listen(3000, function () {
    console.log("running on port 3000");
  });
}
