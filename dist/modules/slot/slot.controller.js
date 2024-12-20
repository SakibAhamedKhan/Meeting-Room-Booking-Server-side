"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const timeRelated_1 = require("../../utils/timeRelated");
const slot_service_1 = require("./slot.service");
const room_service_1 = require("../room/room.service");
const getUser_1 = require("../../utils/getUser");
const createSlot = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slotData = req.body;
    const user = (0, getUser_1.getUser)(req);
    slotData.owner = user._id;
    const startTimeObj = timeRelated_1.timeRelated.timeToMinutes(slotData.startTime);
    const endTimeObj = timeRelated_1.timeRelated.timeToMinutes(slotData.endTime);
    let startTimeInMintues = startTimeObj.totalMinutes;
    const endTimeInMinutes = endTimeObj.totalMinutes;
    const slot = (endTimeInMinutes - startTimeInMintues) / 60;
    const data = [];
    for (let i = 1; i <= slot; i++) {
        const startTime = timeRelated_1.timeRelated.minutesToTime(startTimeInMintues);
        const endTime = timeRelated_1.timeRelated.minutesToTime(startTimeInMintues + 60);
        startTimeInMintues += 60;
        const newData = slotData;
        newData.startTime = startTime;
        newData.endTime = endTime;
        const result = yield slot_service_1.SlotService.createSlot(newData);
        data.push(result);
    }
    const result2 = yield room_service_1.RoomService.haveSlotActivate(slotData.room);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Slots created successfully",
        data,
    });
}));
const getAvaliableSlots = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_service_1.SlotService.getAvaliableSlots(req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Available slots retrieved successfully",
        data: result,
    });
}));
const getAllMySLot = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield slot_service_1.SlotService.getAllMySLot(id);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "All slots of your retrieved successfully",
        data: result,
    });
}));
exports.SlotController = {
    createSlot,
    getAvaliableSlots,
    getAllMySLot,
};
