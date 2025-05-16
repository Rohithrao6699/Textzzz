import { Request, Response } from "express";
import RoomService from "../../services/roomServices";

export async function userOfRooms(req: Request, res: Response) {
  const roomId = req.body.roomId;
  const RoomUsers = await RoomService.userOfRooms({ roomId });
  res.json({
    RoomUsers,
  });
}
