import { create } from "domain";
import { TRoomSchema } from "./room.interface";
import { Room } from "./room.model";
import mongoose from "mongoose";
import { sendImagesToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import { TUserSchema } from "../user/user.interface";
import { USER_ROLE } from "../user/user.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";

const createRoom = async (
  payload: TRoomSchema,
  extraImages?: Express.Multer.File[],
  thumbnail?: Express.Multer.File[],
  user?: any
) => {
  console.log("15 => ", user);
  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    if (extraImages) {
      const extraImages_secure_url = await sendImagesToCloudinary(extraImages);
      payload.extraImages = extraImages_secure_url;
    }
    if (thumbnail) {
      const thumbnail_secure_url = await sendImagesToCloudinary(thumbnail);
      payload.thumbnail = thumbnail_secure_url;
    }
    payload.owner = user._id;
    result = await Room.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, "Something wrong in createRoom in service", error);
  }

  return result;
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
  const result = await Room.find({ isApproved: true });

  return result;
};

const getAllRoomOperation = async (user: any, payload: Record<string, unknown>) => {
  let result;
  let meta;
  if (user.role === USER_ROLE.ADMIN) {
    const roomQuery = new QueryBuilder(
      Room.find({isApproved:false}).populate("owner"),
      payload
    )
      .pagination()

    result = await roomQuery.modelQuery;
    meta = await roomQuery.countTotal();
  }
  if (user.role === USER_ROLE.PARTNER) {
    const roomQuery = new QueryBuilder(
      Room.find({ owner: user._id }).populate("owner"),
      payload
    )
      .pagination()

    result = await roomQuery.modelQuery;
    meta = await roomQuery.countTotal();
  }

  return {
    meta,
    result,
  };
};

const activateRoom = async (id: string) => {
  const result = await Room.updateOne({ _id: id }, { isApproved: true });

  return result;
};

export const RoomService = {
  createRoom,
  getSingleRoom,
  updateSingleRoom,
  getAllRoom,
  deleteSingleRoom,
  getAllRoomOperation,
  activateRoom,
};
