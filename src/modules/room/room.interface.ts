import { Schema } from "mongoose";

export type TRoomSchema = {
  owner: Schema.Types.ObjectId;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  totalRatings: number;
  totalReviews: number;
  address: string;
  description: string;
  googleMapURL: string;
  thumbnail: {
    url: string;
    public_id: string;
  }[];
  extraImages: {
    url: string;
    public_id: string;
  }[];
  amenities: [string];
  isDeleted: boolean;
  isApproved: boolean;
  isBanned: boolean;
};

export type MulterFileFields = {
  extraImages?: Express.Multer.File[];
  thumbnail?: Express.Multer.File[];
};
