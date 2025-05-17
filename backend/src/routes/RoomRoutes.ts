import { Router } from "express";
import { auth } from "../middleware/AuthMiddleware";
import { createRoom } from "../handlers/httpHandlers/userRooms/createRoom";
import { joinRoom } from "../handlers/httpHandlers/userRooms/joinRoom";
import { userOfRooms } from "../handlers/httpHandlers/userRooms/usersOfRoom";
import { roomOfUser } from "../handlers/httpHandlers/userRooms/roomOfUser";

const RoomRouter = Router();

RoomRouter.post("/create-room", auth, createRoom);
RoomRouter.post("/join-room", auth, joinRoom);
RoomRouter.get("/usersOfRoom", auth, userOfRooms);
RoomRouter.get("/RoomOfUser", auth, roomOfUser);

export default RoomRouter;
