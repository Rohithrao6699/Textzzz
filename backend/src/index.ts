import express from "express";
import http from "http";
import { WebSocket } from "ws";
import errorMiddleWare from "./middleware/ErrorMiddleware";
import userRouter from "./routes/AuthRoutes";
import RoomRouter from "./routes/RoomRoutes";
import WebSocketServerhandler from "./handlers/wsHandler/webSocketHandler";
import { Config } from "./config/config";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const wsss = new WebSocketServerhandler(wss);

app.use("/auth", userRouter);
app.use("/room", RoomRouter);

app.use(errorMiddleWare);
main();

function main() {
  server.listen(Config.PORT, function () {
    console.log(`running on port ${Config.PORT}`);
  });
}
