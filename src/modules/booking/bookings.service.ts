import mongoose, { ObjectId } from "mongoose";
import { SlotService } from "../slot/slot.service";
import { TBookingSchema } from "./booking.interface";
import { Booking } from "./booking.model";
import { RoomService } from "../room/room.service";
import { getUser } from "../../utils/getUser";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IS_CONFIRME } from "./booking.constant";
import { Room } from "../room/room.model";
import AppError from "../../errors/AppError";
import { getLastMonthDataForBooking } from "../../utils/getLastMonthDataForBooking";

const createBooking = async (payload: TBookingSchema, user: any) => {
  const slotsArray = payload.slots as ObjectId[];

  const udpate = await SlotService.updateSlotsBooked(slotsArray, true);

  const roomSingle = await RoomService.getSingleRoom(payload.room as any, user);

  payload.totalAmount = ((roomSingle?.pricePerSlot as number) *
    slotsArray.length) as number;

  payload.user = user._id;

  const result = (
    await (
      await (await Booking.create(payload)).populate("slots")
    ).populate("room")
  ).populate("user");
  return result;
};

const getAllBooking = async () => {
  const result = await Booking.find()
    .populate("slots")
    .populate("room")
    .populate("user");
  return result;
};

const getAllCustomerBooking = async (
  payload: Record<string, unknown>,
  user: any
) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({ user: user._id })
      .populate("slots")
      .populate("room")
      .populate("user"),
    payload
  ).pagination();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getAllPartnerBooking = async (
  payload: Record<string, unknown>,
  user: any
) => {
  console.log(user);
  const bookingQuery = new QueryBuilder(
    Booking.find()
      .populate({
        path: "room", // Path to the 'room' field in the Booking model
        match: { owner: user._id }, // Only populate rooms where 'owner' matches
        // select: '_id ownerid'  // Optional: Select only necessary fields from the Room model
      })
      .populate("slots")
      .populate("user"),
    payload
  ).pagination();

  const tempResult = await bookingQuery.modelQuery;

  const result = tempResult.filter((booking: any) => booking.room !== null);

  const meta = await bookingQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getMyBooking = async (id: ObjectId) => {
  const result = await Booking.find({ user: id })
    .populate("slots")
    .populate("room")
    .populate("user");
  return result;
};

const updateBooking = async (id: string, payload: object) => {
  const update = await Booking.updateOne({ _id: id }, payload);
  const result = await Booking.findOne({ _id: id });
  return result;
};

const deleteBooking = async (id: string) => {
  const result: any = await Booking.findOne({ _id: id });
  const slotsArray = result?.slots;
  const udpate = await SlotService.updateSlotsBooked(slotsArray, false);
  const deleteOne = await Booking.deleteOne({ _id: id });

  return result;
};

const giveCustomerBookingPaid = async (id: string, userId: string) => {
  const result: any = await Booking.updateOne(
    { _id: id, user: userId },
    { isConfirmed: IS_CONFIRME.confirmed }
  );

  return result;
};

const giveCustomerBookingCancel = async (id: string, userId: string) => {
  const result: any = await Booking.deleteOne({ _id: id, user: userId });
  return result;
};

const givePartnerBookingEeventComplete = async (id: string, userId: string) => {
  const event: any = await Booking.findOne({ _id: id }).lean();
  const room = await Room.findOne({ _id: event.room, owner: userId });
  if (!room) {
    throw new AppError(401, "UnAuthorized");
  }

  const result: any = await Booking.updateOne(
    { _id: id },
    { isCompleted: true }
  );
  return result;
};

const getPartnerBookingLinechartData = async (userId: string, months:Number) => {
  const allMatchedandNotMatched = await Booking.find({ isCompleted: true })
    .select("room totalAmount date")
    .populate({
      path: "room",
      match: { owner: userId },
      select: "_id owner",
    });

  const partnerBooking = allMatchedandNotMatched.filter(
    (booking: any) => booking.room !== null
  );

  return await getLastMonthDataForBooking(partnerBooking, months);
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getMyBooking,
  updateBooking,
  deleteBooking,
  getAllCustomerBooking,
  giveCustomerBookingPaid,
  giveCustomerBookingCancel,
  getAllPartnerBooking,
  givePartnerBookingEeventComplete,
  getPartnerBookingLinechartData,
};
