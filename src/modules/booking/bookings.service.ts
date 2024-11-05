import { ObjectId } from "mongoose";
import { SlotService } from "../slot/slot.service";
import { TBookingSchema } from "./booking.interface";
import { Booking } from "./booking.model";
import { RoomService } from "../room/room.service";

const createBooking = async (payload: TBookingSchema) => {
  const slotsArray = payload.slots as ObjectId[];

  const udpate = await SlotService.updateSlotsBooked(slotsArray, true);

  const roomSingle = await RoomService.getSingleRoom(payload.room as any);

  payload.totalAmount = ((roomSingle?.pricePerSlot as number) *
    slotsArray.length) as number;

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

const getMyBooking = async (id: ObjectId) => {
  const result = await Booking.find({ user: id })
    .populate("slots")
    .populate("room")
    .populate("user");
  return result;
};

const updateBooking = async (id:string, payload: Object) => {
  const update = await Booking.updateOne({ _id: id }, payload);
  const result = await Booking.findOne({ _id: id });
  return result;
};

const deleteBooking = async (id:string) => {
  const result:any = await Booking.findOne({_id: id});
  console.log("49: ", result);
  const slotsArray = result?.slots;
  console.log("51: ",slotsArray);
  const udpate = await SlotService.updateSlotsBooked(slotsArray, false);
  const deleteOne = await Booking.deleteOne({ _id: id });

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getMyBooking,
  updateBooking,
  deleteBooking,
};
