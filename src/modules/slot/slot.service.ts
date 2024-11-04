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
    Slot.find({ isBooked: false }).populate('room'),
    payload
  )
  .pagination()
  .filtering();

  const result = await slotQuery.modelQuery;

  return result;
};
export const SlotService = {
  createSlot,
  getAvaliableSlots,
};
