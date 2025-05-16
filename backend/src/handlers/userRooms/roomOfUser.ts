import { Request, Response } from "express";
import RoomService from "../../services/roomServices";

export async function roomOfUser(req: Request, res: Response) {
  const userId = req.userId;
  const response = await RoomService.roomOfUsers({ userId });
  res.json({
    response,
  });
}
