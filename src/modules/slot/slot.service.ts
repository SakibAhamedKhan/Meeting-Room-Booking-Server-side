import { ObjectId } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TSlotSchema } from "./slot.interface";
import { Slot } from "./slot.model";
import { Booking } from "../booking/booking.model";

const createSlot = async (payload: TSlotSchema) => {
  const result = await Slot.create(payload);
  return result;
};

const getAvaliableSlots = async (data: { id: string; date: string }) => {
  const result = await Booking.find({ date: data.date, room: data.id }).select(
    "slots"
  );
  let bookedSlots = [];
  for (let i = 0; i < (await result).length; i++) {
    for (let j = 0; j < (await result)[i].slots.length; j++) {
      bookedSlots.push((await result)[i].slots[j]);
    }
  }
  const result2 = await Slot.find({ room: data.id });
  let allSlot = [];
  for (let i = 0; i < result2.length; i++) {
    allSlot.push(result2[i]);
  }
  let availableSlots = [];
  for (let i = 0; i < allSlot.length; i++) {
    let flag = 0;
    for (let j = 0; j < bookedSlots.length; j++) {
      if (allSlot[i]._id.toString() === bookedSlots[j].toString()) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      availableSlots.push(allSlot[i]);
    }
  }


  return availableSlots;
};

const updateSlotsBooked = async (id: ObjectId[], payload: boolean) => {
  const result = await Slot.updateMany(
    { _id: { $in: id } },
    { $set: { isBooked: payload } },
    { multi: true }
  );
  return result;
};

const getAllMySLot = async (id: string) => {
  const result = await Slot.find({ room: id });
  return result;
};

export const SlotService = {
  createSlot,
  getAvaliableSlots,
  updateSlotsBooked,
  getAllMySLot,
};
