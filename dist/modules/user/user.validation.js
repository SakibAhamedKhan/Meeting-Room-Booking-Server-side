"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodUserSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const signupZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email("Please provide an valid email!"),
    password: zod_1.z.string(),
    phone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE).default(user_constant_1.USER_ROLE.CUSTOMER),
    status: zod_1.z.enum(user_constant_1.UserStatus).default('in-progress'),
});
const loginZod = zod_1.z.object({
    email: zod_1.z.string().email("Please provide an valid email!"),
    password: zod_1.z.string(),
});
exports.zodUserSchema = {
    signupZodSchema,
    loginZod
};
