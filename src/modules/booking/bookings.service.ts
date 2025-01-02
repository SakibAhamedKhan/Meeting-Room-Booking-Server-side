import { ObjectId } from "mongoose";
import { SlotService } from "../slot/slot.service";
import { TBookingSchema } from "./booking.interface";
import { Booking } from "./booking.model";
import { RoomService } from "../room/room.service";
import { getUser } from "../../utils/getUser";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { IS_CONFIRME } from "./booking.constant";

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

const getAllCustomerBooking = async (payload: Record<string, unknown>, user:any) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({user:user._id}).populate("slots").populate("room").populate("user"),payload
  ).pagination();

  const result = await bookingQuery.modelQuery;
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

const giveCustomerBookingPaid = async (id: string, userId:string) => {
  const result: any = await Booking.updateOne({ _id: id , user: userId}, {isConfirmed: IS_CONFIRME.confirmed});


  return result;
};

const giveCustomerBookingCancel = async (id: string) => {
  const result: any = await Booking.deleteOne({ _id: id });
  return result;
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
};
