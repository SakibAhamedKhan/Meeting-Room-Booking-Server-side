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


export const zodRoomSchema = {
    roomZodSchema,
}