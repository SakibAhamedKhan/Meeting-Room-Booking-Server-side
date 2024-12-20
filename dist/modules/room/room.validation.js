"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodRoomSchema = void 0;
const zod_1 = require("zod");
const roomZodSchema = zod_1.z.object({
    name: zod_1.z.string(),
    roomNo: zod_1.z.number(),
    floorNo: zod_1.z.number(),
    capacity: zod_1.z.number(),
    pricePerSlot: zod_1.z.number(),
    address: zod_1.z.string(),
    description: zod_1.z.string(),
    googleMapURL: zod_1.z.string(),
    amenities: zod_1.z.array(zod_1.z.string()),
});
const roomUpdateZodSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    roomNo: zod_1.z.number().optional(),
    floorNo: zod_1.z.number().optional(),
    capacity: zod_1.z.number().optional(),
    pricePerSlot: zod_1.z.number().optional(),
    address: zod_1.z.string(),
    description: zod_1.z.string(),
    googleMapURL: zod_1.z.string(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.zodRoomSchema = {
    roomZodSchema,
    roomUpdateZodSchema,
};
