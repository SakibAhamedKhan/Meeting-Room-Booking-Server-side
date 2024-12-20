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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomService = void 0;
const room_model_1 = require("./room.model");
const mongoose_1 = __importDefault(require("mongoose"));
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_constant_1 = require("../user/user.constant");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const favourite_model_1 = require("../favourite/favourite.model");
const createRoom = (payload, extraImages, thumbnail, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    let result;
    try {
        session.startTransaction();
        if (extraImages) {
            const extraImages_secure_url = yield (0, sendImageToCloudinary_1.sendImagesToCloudinary)(extraImages);
            payload.extraImages = extraImages_secure_url;
        }
        if (thumbnail) {
            const thumbnail_secure_url = yield (0, sendImageToCloudinary_1.sendImagesToCloudinary)(thumbnail);
            payload.thumbnail = thumbnail_secure_url;
        }
        payload.owner = user._id;
        result = yield room_model_1.Room.create([payload], { session });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(500, "Something wrong in createRoom in service", error);
    }
    return result;
});
const getSingleRoom = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield room_model_1.Room.findById(payload).lean());
    if (user != null) {
        const fav = yield favourite_model_1.Favourite.find({ user: user === null || user === void 0 ? void 0 : user._id, room: payload });
        if (fav.length > 0) {
            result.favourited = true;
        }
        else {
            result.favourited = false;
        }
    }
    else {
        result.favourited = false;
    }
    return result;
});
const updateSingleRoom = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, payload);
    return result;
});
const deleteSingleRoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findByIdAndDelete({ _id: payload });
    return result;
});
const getAllRoom = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.find({
        isApproved: true,
        partnerPublish: true,
        isBanned: false,
    });
    return result;
});
const getAllRoomOperation = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    let meta;
    if (user.role === user_constant_1.USER_ROLE.ADMIN) {
        const roomQuery = new QueryBuilder_1.QueryBuilder(room_model_1.Room.find({ isApproved: false, isBanned: false }).populate("owner"), payload).pagination();
        result = yield roomQuery.modelQuery;
        meta = yield roomQuery.countTotal();
    }
    if (user.role === user_constant_1.USER_ROLE.PARTNER) {
        const roomQuery = new QueryBuilder_1.QueryBuilder(room_model_1.Room.find({ owner: user._id }).populate("owner"), payload).pagination();
        result = yield roomQuery.modelQuery;
        meta = yield roomQuery.countTotal();
    }
    return {
        meta,
        result,
    };
});
const activateRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, { isApproved: true });
    return result;
});
const getAllActivatedRoom = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const roomQuery = new QueryBuilder_1.QueryBuilder(room_model_1.Room.find({ isApproved: true }).populate("owner"), payload).pagination();
    const result = yield roomQuery.modelQuery;
    const meta = yield roomQuery.countTotal();
    return {
        meta,
        result,
    };
});
const deActivateRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, { isApproved: false });
    return result;
});
const declinedRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, { isBanned: true });
    return result;
});
const publishRoom = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id, owner: user._id }, { partnerPublish: true });
    return result;
});
const unPublishRoom = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id, owner: user._id }, { partnerPublish: false });
    return result;
});
const haveSlotActivate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, { haveSlot: true });
    return result;
});
const haveSlotUnActivate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.updateOne({ _id: id }, { haveSlot: false });
    return result;
});
exports.RoomService = {
    createRoom,
    getSingleRoom,
    updateSingleRoom,
    getAllRoom,
    deleteSingleRoom,
    getAllRoomOperation,
    activateRoom,
    getAllActivatedRoom,
    deActivateRoom,
    declinedRoom,
    publishRoom,
    unPublishRoom,
    haveSlotActivate,
    haveSlotUnActivate,
};
