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
exports.SlotService = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const slot_model_1 = require("./slot.model");
const createSlot = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.Slot.create(payload);
    return result;
});
const getAvaliableSlots = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slotQuery = new QueryBuilder_1.QueryBuilder(slot_model_1.Slot.find({ isBooked: false }).populate("room"), payload)
        .pagination()
        .filtering();
    const result = yield slotQuery.modelQuery;
    return result;
});
const updateSlotsBooked = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.Slot.updateMany({ _id: { $in: id } }, { $set: { isBooked: payload } }, { multi: true });
    return result;
});
const getAllMySLot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.Slot.find({ room: id });
    return result;
});
exports.SlotService = {
    createSlot,
    getAvaliableSlots,
    updateSlotsBooked,
    getAllMySLot,
};
