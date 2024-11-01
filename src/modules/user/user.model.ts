import { model, Schema } from "mongoose";
import { USER_ROLE } from "./user.constant";
import { TUserSchema } from "./user.interface";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUserSchema>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  phone: {
    type: String,
    require: [true, "Phone number is required"],
  },
  address: {
    type: String,
    require: [true, "Addres is required"],
  },
  role: {
    type: String,
    require: [true, "Role is required"],
    enum: Object.keys(USER_ROLE),
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<TUserSchema>("User", userSchema);
