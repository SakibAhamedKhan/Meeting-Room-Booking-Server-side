import { model, Schema } from "mongoose";
import { USER_ROLE, UserStatus } from "./user.constant";
import { TUserSchema, UserModel } from "./user.interface";
import bcryptjs from "bcryptjs";
import config from "../../config";

const userSchema = new Schema<TUserSchema, UserModel>({
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
  status: {
    type: String,
    enum: UserStatus,
    default: 'in-progress',
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

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

export const User = model<TUserSchema, UserModel>("User", userSchema);
