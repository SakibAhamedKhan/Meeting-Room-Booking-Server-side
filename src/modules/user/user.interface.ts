import { USER_ROLE } from "./user.constant";

export type TUserSchema = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof USER_ROLE;
};

export type TUserLogin = {
  email: string,
  password: string, 
}

export type TUserRoles = keyof typeof USER_ROLE;