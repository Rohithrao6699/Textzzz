import { IncomingMessage } from "http";
import { Server, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Config } from "../../config/config";
import { AppError } from "../../types/AppError";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

class WebSocketServerhandler {
  wss: Server<typeof WebSocket, typeof IncomingMessage>;

  constructor(wss: Server<typeof WebSocket, typeof IncomingMessage>) {
    this.wss = wss;
    this.setUpServer();
  }

  setUpServer() {
    this.wss.on("connection", (ws, req) => {
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      const room = url.searchParams.get("roomId");
      const token = url.searchParams.get("token");
      if (!token) {
        ws.close(1008, "Authentication token required");
        return;
      }
      let userId: number;
      let roomId: string;
      try {
        if (token && room) {
          const decodedInfo = jwt.verify(token, Config.JWT_SECRET);
          userId = Number((decodedInfo as JwtPayload).id);
          roomId = room;
        } else {
          ws.send("token not exisiting in headers");
        }
      } catch (error) {
        console.log(error);
        throw new AppError("token not existing", 411);
      }

      ws.on("message", async (e) => {
        let string = e.toString();
        const data = JSON.parse(string);
        console.log(data);
        if (data.type === "chat") {
          await Prisma.message.create({
            data: {
              content: data.payload.message,
              UserId: userId,
              RoomId: Number(roomId),
            },
          });
        }
      });

      ws.on("close", () => {});
    });
  }

  verifyToken(req: IncomingMessage) {
    const token = req.headers.authorization;
    console.log(token);
    return token;
  }
}

export default WebSocketServerhandler;
