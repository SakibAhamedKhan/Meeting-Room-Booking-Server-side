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
exports.FavouriteController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const getUser_1 = require("../../utils/getUser");
const favourite_service_1 = require("./favourite.service");
const getAllFavouriteMe = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const result = yield favourite_service_1.FavouriteService.getAllFavouriteMe(user === null || user === void 0 ? void 0 : user._id, req.query);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Favourite rooms retrived successfully`,
        meta: result.meta,
        data: result.result,
    });
}));
const makeRoomFavourite = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = yield favourite_service_1.FavouriteService.makeRoomFavourite(favouriteData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Favourite rooms added successfully`,
        data: result,
    });
}));
const makeRoomUnFavourite = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = yield favourite_service_1.FavouriteService.makeRoomUnFavourite(favouriteData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Favourite rooms added successfully`,
        data: result,
    });
}));
const deleteRoomFavourite = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, getUser_1.getUser)(req);
    const favouriteData = req.body;
    favouriteData.user = user._id;
    const result = yield favourite_service_1.FavouriteService.deleteRoomFavourite(favouriteData);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: `Favourite room deleted successfully`,
        data: result,
    });
}));
exports.FavouriteController = {
    getAllFavouriteMe,
    makeRoomFavourite,
    deleteRoomFavourite,
    makeRoomUnFavourite,
};
