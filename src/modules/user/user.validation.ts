import { z } from "zod";
import { USER_ROLE, UserStatus } from "./user.constant";

const signupZodSchema = z.object({
  name: z.string(),
  email: z.string().email("Please provide an valid email!"),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.nativeEnum(USER_ROLE).default(USER_ROLE.CUSTOMER),
  status: z.enum(UserStatus).default('in-progress'),
});

const loginZod = z.object({
  email: z.string().email("Please provide an valid email!"),
  password: z.string(),
})

export const zodUserSchema  = {
  signupZodSchema,
  loginZod
}