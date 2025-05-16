import { Request, Response } from "express";
import RoomService from "../../services/roomServices";

export async function joinRoom(req: Request, res: Response) {
  const roomId = req.body.roomId;
  const userId = req.userId;
  const response = await RoomService.joinRoom({ userId, roomId });
  res.json({
    response,
  });
}
