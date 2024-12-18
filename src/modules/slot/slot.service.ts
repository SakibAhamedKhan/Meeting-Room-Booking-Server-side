import { ObjectId } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { TSlotSchema } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlot = async (payload: TSlotSchema) => {
  const result = await Slot.create(payload);
  return result;
};

const getAvaliableSlots = async (payload: Record<string, unknown>) => {
  console.log(payload);
  const slotQuery = new QueryBuilder(
    Slot.find({ isBooked: false }).populate("room"),
    payload
  )
    .pagination()
    .filtering();

  const result = await slotQuery.modelQuery;

  return result;
};

const updateSlotsBooked = async (id: ObjectId[], payload: boolean) => {
  console.log("26: ", payload);
  const result = await Slot.updateMany(
    { _id: { $in: id } },
    { $set: { isBooked: payload } },
    { multi: true }
  );
  return result;
};

const getAllMySLot = async (id:string) => {
  const result = await Slot.find({ room: id });
  return result;
};

export const SlotService = {
  createSlot,
  getAvaliableSlots,
  updateSlotsBooked,
  getAllMySLot,
};
