import { string, z } from "zod";

const roomZodSchema = z.object({
  name: z.string(),
  roomNo: z.number(),
  floorNo: z.number(),
  capacity: z.number(),
  pricePerSlot: z.number(),
  address: z.string(),
  description: z.string(),
  googleMapURL: z.string(),
  amenities: z.array(z.string()),
});
const roomUpdateZodSchema = z.object({
  name: z.string().optional(),
  roomNo: z.number().optional(),
  floorNo: z.number().optional(),
  capacity: z.number().optional(),
  pricePerSlot: z.number().optional(),
  address: z.string(),
  description: z.string(),
  googleMapURL: z.string(),
  amenities: z.array(z.string()).optional(),
});


export const zodRoomSchema = {
    roomZodSchema,
    roomUpdateZodSchema,
}