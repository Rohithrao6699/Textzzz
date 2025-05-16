import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface createRoomType {
  name: string;
  userId: string;
}
class RoomService {
  //
  //
  async createRoom({ name, userId }: createRoomType) {
    const room = await Prisma.room.create({
      data: {
        name: name,
      },
    });
    const UpdatedUser = await Prisma.user.update({
      where: { id: Number(userId) },
      data: { RoomId: room.id },
    });
    const response = await Prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        Room: {
          include: {
            User: true,
          },
        },
      },
    });

    return response;
  }

  //
  async joinRoom({ userId, roomId }: any) {
    const response = await Prisma.user.update({
      where: { id: Number(userId) },
      data: { RoomId: roomId },
    });

    return response;
  }

  //
  async userOfRooms({ roomId }: any) {
    const RoomUsers = await Prisma.room.findUnique({
      where: { id: roomId },
      include: { User: true },
    });

    return RoomUsers;
  }

  //
  async roomOfUsers({ userId }: any) {
    const response = await Prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        Room: {
          include: { User: true },
        },
      },
    });

    return response;
  }
}

export default new RoomService();
