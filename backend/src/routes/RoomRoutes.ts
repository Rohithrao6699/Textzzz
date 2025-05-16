import { Router } from "express";
import { auth } from "../middleware/AuthMiddleware";
import { createRoom } from "../handlers/userRooms/createRoom";
import { joinRoom } from "../handlers/userRooms/joinRoom";
import { userOfRooms } from "../handlers/userRooms/usersOfRoom";
import { roomOfUser } from "../handlers/userRooms/roomOfUser";

const RoomRouter = Router();

RoomRouter.post("/create-room", auth, createRoom);
RoomRouter.post("/join-room", auth, joinRoom);
RoomRouter.get("/usersOfRoom", auth, userOfRooms);
RoomRouter.get("/RoomOfUser", auth, roomOfUser);

export default RoomRouter;
