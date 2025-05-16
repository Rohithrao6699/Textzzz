import { Request, Response } from "express";
import RoomService from "../../services/roomServices";

export async function createRoom(req: Request, res: Response) {
  const name = req.body.name;
  const userId = req.userId;
  const response = await RoomService.createRoom({ name, userId });
  res.json({ response });
}
