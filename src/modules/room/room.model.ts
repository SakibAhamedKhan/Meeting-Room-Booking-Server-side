import { model, Schema } from "mongoose";
import { TRoomSchema } from "./room.interface";

const  roomSchema = new Schema<TRoomSchema>({
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    roomNo: {
      type: Number,
      require: [true, "Room No is required"],
    },
    floorNo : {
      type: Number,
      require: [true, "Floor No is required"],
    },
    capacity : {
      type: Number,
      require: [true, "Capacity No is required"],
    },
    pricePerSlot : {
      type: Number,
      require: [true, "PricePerSlot No is required"],
    },
    amenities: {
      type: [String],
      require: [true, "amenities is required"],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      require: [true, "isDeleted is required"],
      default:false,
    },
  });


export const Room = model<TRoomSchema>("Room", roomSchema);