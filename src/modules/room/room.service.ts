import { create } from "domain";
import { TRoomSchema } from "./room.interface";
import { Room } from "./room.model";


const createRoom = async (payload: TRoomSchema) => {
    const result = await Room.create(payload);
    return result;
}

export const RoomService = {
    createRoom,
}