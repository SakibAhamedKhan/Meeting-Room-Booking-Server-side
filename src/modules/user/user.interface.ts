import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserSchema = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: keyof typeof USER_ROLE;
  status: 'in-progress' | 'blocked';
};

export type TUserLogin = {
  email: string,
  password: string, 
}

export type UserModel = Model<TUserSchema> & {
  isUserExistsByCustomEmail(email: string): Promise<TUserSchema>;

  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
};

export type TUserRoles = keyof typeof USER_ROLE;