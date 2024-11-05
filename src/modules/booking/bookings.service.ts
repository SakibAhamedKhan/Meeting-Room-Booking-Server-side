import { ObjectId } from "mongoose";
import { SlotService } from "../slot/slot.service";
import { TBookingSchema } from "./booking.interface";
import { Booking } from "./booking.model";
import { RoomService } from "../room/room.service";

const createBooking = async(payload: TBookingSchema) => {
    const slotsArray = payload.slots as ObjectId[];

    const udpate = await SlotService.updateSlotsBooked(slotsArray, true);

    const roomSingle = await RoomService.getSingleRoom(payload.room as any)

    payload.totalAmount = (roomSingle?.pricePerSlot as number * slotsArray.length) as number

    const result = (await (await (await Booking.create(payload)).populate('slots')).populate('room')).populate('user');
    return result;
}

export const BookingService = {
    createBooking,
}