import { create } from "domain";
import { TRoomSchema } from "./room.interface";
import { Room } from "./room.model";


const createRoom = async (payload: TRoomSchema) => {
    const result = await Room.create(payload);
    return result;
}

const getSingleRoom = async(payload:string) => {
    const result = await Room.findById(payload);
    return result;
}

const updateSingleRoom = async(id:string, payload:TRoomSchema) => {
    const result = await Room.updateOne({_id:id}, payload);
    return await getSingleRoom(id);
}

const deleteSingleRoom = async(payload:string) => {
    const result = await Room.findByIdAndDelete({_id:payload});
    return result;
}

const getAllRoom = async()=> {
    const result = await Room.find();
    return result;
}

export const RoomService = {
    createRoom,
    getSingleRoom,
    updateSingleRoom,
    getAllRoom,
    deleteSingleRoom,
}