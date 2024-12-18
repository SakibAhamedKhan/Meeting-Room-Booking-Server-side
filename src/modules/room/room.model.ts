import { model, Schema } from "mongoose";
import { TRoomSchema } from "./room.interface";
import { object } from "zod";

const roomSchema = new Schema<TRoomSchema>({
  owner: {
    type: Schema.Types.ObjectId,
    require: [true, "Owner id is required"],
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  roomNo: {
    type: Number,
    require: [true, "Room No is required"],
  },
  floorNo: {
    type: Number,
    require: [true, "Floor No is required"],
  },
  capacity: {
    type: Number,
    require: [true, "Capacity No is required"],
  },
  totalRatings: {
    type: Number,
    require: [true, "Capacity No is required"],
    default: 0,
  },
  totalReviews: {
    type: Number,
    require: [true, "Capacity No is required"],
    default: 0,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  googleMapURL: {
    type: String,
    required: [true, "GoogleMapURL is required"],
  },
  pricePerSlot: {
    type: Number,
    require: [true, "PricePerSlot No is required"],
  },
  thumbnail: {
    type: [
      {
        url: String,
        public_id: String,
      },
    ],
    require: [true, "Thumbnails is required"],
  },
  extraImages: {
    type: [
      {
        url: String,
        public_id: String,
      },
    ],
    require: [true, "ExtraImages is required"],
  },
  amenities: {
    type: [String],
    require: [true, "amenities is required"],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  haveSlot: {
    type: Boolean,
    default: false,
  },
  partnerPublish: {
    type: Boolean,
    default: false,
  },
});

export const Room = model<TRoomSchema>("Room", roomSchema);
