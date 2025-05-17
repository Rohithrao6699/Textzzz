import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

interface CreateMessageType {
  content: string;
  userId: number;
  roomId: number;
}
class MessageService {
  async createMessage(data: CreateMessageType) {
    const message = await Prisma.message.create({
      data: {
        content: data.content,
        UserId: data.userId,
        RoomId: data.roomId,
      },
    });
    console.log(message);
    return message;
  }

  async getMessageOfRoom(data: any) {
    const messages = await Prisma.message.findMany({
      where: { RoomId: data.roomId },
      include: { User: true },
      orderBy: { createdAt: "asc" },
    });
    console.log(messages);
    return messages;
  }
}

export default new MessageService();
