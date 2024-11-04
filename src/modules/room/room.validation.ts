import { string, z } from "zod";

const roomZodSchema = z.object({
  name: z.string(),
  roomNo: z.number(),
  floorNo: z.number(),
  capacity: z.number(),
  pricePerSlot: z.number(),
  amenities: z.array(z.string()),
  isDeleted: z.boolean().default(false),
});
const roomUpdateZodSchema = z.object({
  name: z.string().optional(),
  roomNo: z.number().optional(),
  floorNo: z.number().optional(),
  capacity: z.number().optional(),
  pricePerSlot: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  isDeleted: z.boolean().default(false).optional(),
});


export const zodRoomSchema = {
    roomZodSchema,
    roomUpdateZodSchema,
}