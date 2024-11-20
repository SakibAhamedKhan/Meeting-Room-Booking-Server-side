import { create } from "domain";
import { TRoomSchema } from "./room.interface";
import { Room } from "./room.model";
import mongoose from "mongoose";
import { sendImagesToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";

const createRoom = async (
  payload: TRoomSchema,
  extraImages?: Express.Multer.File[],
  thumbnail?: Express.Multer.File[]
) => {
  console.log("8 => ", payload);
  console.log("9 => ", extraImages);
  console.log("10 => ", thumbnail);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (extraImages) {
      const extraImages_secure_url = await sendImagesToCloudinary(extraImages);
      console.log(extraImages_secure_url);
      payload.extraImages = extraImages_secure_url;
    }
    if (thumbnail) {
      const thumbnail_secure_url = await sendImagesToCloudinary(thumbnail);
      console.log(thumbnail_secure_url);
      payload.thumbnail = thumbnail_secure_url;
    }

    const result = await Room.create([payload], {session});

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500,"Something wrong in createRoom", error);
  }

  
  return "result";
};

const getSingleRoom = async (payload: string) => {
  const result = await Room.findById(payload);
  return result;
};

const updateSingleRoom = async (id: string, payload: TRoomSchema) => {
  const result = await Room.updateOne({ _id: id }, payload);
  return await getSingleRoom(id);
};

const deleteSingleRoom = async (payload: string) => {
  const result = await Room.findByIdAndDelete({ _id: payload });
  return result;
};

const getAllRoom = async () => {
  const result = await Room.find();
  return result;
};

export const RoomService = {
  createRoom,
  getSingleRoom,
  updateSingleRoom,
  getAllRoom,
  deleteSingleRoom,
};
