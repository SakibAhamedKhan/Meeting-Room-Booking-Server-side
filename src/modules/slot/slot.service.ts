import { TSlotSchema } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlot =async (payload:TSlotSchema) => {
    const result = await Slot.create(payload);
    return result;
}

export const SlotService = {
    createSlot,
}