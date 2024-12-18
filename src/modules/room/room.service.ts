import { create } from "domain";
import { TRoomSchema } from "./room.interface";
import { Room } from "./room.model";
import mongoose from "mongoose";
import { sendImagesToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import { TUserSchema } from "../user/user.interface";
import { USER_ROLE } from "../user/user.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { Favourite } from "../favourite/favourite.model";

const createRoom = async (
  payload: TRoomSchema,
  extraImages?: Express.Multer.File[],
  thumbnail?: Express.Multer.File[],
  user?: any
) => {
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

const getSingleRoom = async (payload: string, user: any) => {
  let result = (await Room.findById(payload).lean()) as any;
  console.log(user);
  if (user != null) {
    const fav = await Favourite.find({ user: user?._id, room: payload });
    if (fav.length > 0) {
      result.favourited = true;
    } else {
      result.favourited = false;
    }
  } else {
    result.favourited = false;
  }
  console.log(result);
  return result;
};

const updateSingleRoom = async (id: string, payload: TRoomSchema) => {
  const result = await Room.updateOne({ _id: id }, payload);
  return result;
};

const deleteSingleRoom = async (payload: string) => {
  const result = await Room.findByIdAndDelete({ _id: payload });
  return result;
};

const getAllRoom = async () => {
  const result = await Room.find({
    isApproved: true,
    partnerPublish: true,
    isBanned: false,
  });

  return result;
};

const getAllRoomOperation = async (
  user: any,
  payload: Record<string, unknown>
) => {
  let result;
  let meta;
  if (user.role === USER_ROLE.ADMIN) {
    const roomQuery = new QueryBuilder(
      Room.find({ isApproved: false, isBanned: false }).populate("owner"),
      payload
    ).pagination();

    result = await roomQuery.modelQuery;
    meta = await roomQuery.countTotal();
  }
  if (user.role === USER_ROLE.PARTNER) {
    const roomQuery = new QueryBuilder(
      Room.find({ owner: user._id }).populate("owner"),
      payload
    ).pagination();

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

const getAllActivatedRoom = async (payload: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(
    Room.find({ isApproved: true }).populate("owner"),
    payload
  ).pagination();
  const result = await roomQuery.modelQuery;
  const meta = await roomQuery.countTotal();

  return {
    meta,
    result,
  };
};

const deActivateRoom = async (id: string) => {
  const result = await Room.updateOne({ _id: id }, { isApproved: false });

  return result;
};

const declinedRoom = async (id: string) => {
  const result = await Room.updateOne({ _id: id }, { isBanned: true });

  return result;
};

const publishRoom = async (user: any, id: string) => {
  console.log("132 SErvice: ", user);
  const result = await Room.updateOne(
    { _id: id, owner: user._id },
    { partnerPublish: true }
  );

  return result;
};

const unPublishRoom = async (user: any, id: string) => {
  console.log("142 SErvice: ", user);
  const result = await Room.updateOne(
    { _id: id, owner: user._id },
    { partnerPublish: false }
  );

  return result;
};

const haveSlotActivate = async(id:string) => {
  const result = await Room.updateOne({_id:id}, {haveSlot:true})
  return result;
}

const haveSlotUnActivate = async(id:string) => {
  const result = await Room.updateOne({_id:id}, {haveSlot:false})
  return result;
}

export const RoomService = {
  createRoom,
  getSingleRoom,
  updateSingleRoom,
  getAllRoom,
  deleteSingleRoom,
  getAllRoomOperation,
  activateRoom,
  getAllActivatedRoom,
  deActivateRoom,
  declinedRoom,
  publishRoom,
  unPublishRoom,
  haveSlotActivate,
  haveSlotUnActivate,

};
