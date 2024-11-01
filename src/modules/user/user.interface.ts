import { USER_ROLE } from "./user.constant";

export type TUserSchema = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof USER_ROLE;
};
