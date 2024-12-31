import { z } from "zod";
import { IS_CONFIRME } from "./booking.constant";

const bookingZodSchema = z.object({
  room: z
    .string({ message: "Room id is required and must be a valid UUID" }),
  slots: z
    .array(z.string({ message: "Each Slot id must be a valid UUID" }))
    .nonempty({ message: "At least one Slot id is required" }),
 
  date: z.string().date("Please provide a valid date in this format YYYY-MM-DD" ),
  totalAmount: z.number().optional(),
  isConfirmed: z.enum(
    [IS_CONFIRME.unconfirmed, IS_CONFIRME.confirmed, IS_CONFIRME.canceled],
    {
      message:
        "isConfirmed must be either 'unconfirmed' or 'confirmed' or 'cancel",
    }
  ).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export const zodBookingSchema = {
    bookingZodSchema,
}
