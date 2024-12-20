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
exports.RoomController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const room_service_1 = require("./room.service");
const getUser_1 = require("../../utils/getUser");
const createRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = req.body;
    const files = req.files;
    const extraImages = files.extraImages;
    const thumbnail = files.thumbnail;
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield room_service_1.RoomService.createRoom(roomData, extraImages, thumbnail, user);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room added successfully",
        data: result,
    });
}));
const getSingleRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const token = req.headers.authorization;
    let user = null;
    if (token) {
        user = yield (0, getUser_1.getUser)(req);
    }
    const result = yield room_service_1.RoomService.getSingleRoom(roomId, user);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room retrieved successfully",
        data: result,
    });
}));
const updateSingleRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const roomData = req.body;
    const result = yield room_service_1.RoomService.updateSingleRoom(roomId, roomData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room updated successfully",
        data: result,
    });
}));
const deleteSingleRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const result = yield room_service_1.RoomService.deleteSingleRoom(roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room deleted successfully",
        data: result,
    });
}));
const getAllRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.RoomService.getAllRoom();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room retrieved successfully",
        data: result,
    });
}));
const getAllRoomOperation = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield room_service_1.RoomService.getAllRoomOperation(user, req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const activateRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const result = yield room_service_1.RoomService.activateRoom(roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room activate successfully",
        data: result,
    });
}));
const getAllActivatedRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.RoomService.getAllActivatedRoom(req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "All activated Room retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
}));
const deActivateRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const result = yield room_service_1.RoomService.deActivateRoom(roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room deactivate successfully",
        data: result,
    });
}));
const declinedRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const result = yield room_service_1.RoomService.declinedRoom(roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room declined successfully",
        data: result,
    });
}));
const publishRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield room_service_1.RoomService.publishRoom(user, roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room published successfully",
        data: result,
    });
}));
const unPublishRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId } = req.params;
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield room_service_1.RoomService.unPublishRoom(user, roomId);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Room unPublished successfully",
        data: result,
    });
}));
exports.RoomController = {
    createRoom,
    getSingleRoom,
    getAllRoom,
    updateSingleRoom,
    deleteSingleRoom,
    getAllRoomOperation,
    activateRoom,
    getAllActivatedRoom,
    deActivateRoom,
    declinedRoom,
    publishRoom,
    unPublishRoom,
};
