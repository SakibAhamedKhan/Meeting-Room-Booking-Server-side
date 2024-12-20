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
exports.FavouriteService = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const favourite_model_1 = require("./favourite.model");
const getAllFavouriteMe = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const resultQuery = new QueryBuilder_1.QueryBuilder(favourite_model_1.Favourite.find({ user: userId }).populate("room").populate("user"), payload).pagination();
    const result = yield resultQuery.modelQuery;
    const meta = yield resultQuery.countTotal();
    return {
        result,
        meta,
    };
});
const makeRoomFavourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const fav = yield favourite_model_1.Favourite.findOne({
        user: payload.user,
        room: payload.room,
    });
    if (fav) {
        throw new AppError_1.default(409, "This Room is already in your favourite list!");
    }
    const result = yield favourite_model_1.Favourite.create(payload);
    return result;
});
const makeRoomUnFavourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourite_model_1.Favourite.deleteOne({
        user: payload.user,
        room: payload.room,
    });
    return result;
});
const deleteRoomFavourite = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield favourite_model_1.Favourite.deleteOne({
        user: payload.user,
        room: payload.room,
    });
    return result;
});
exports.FavouriteService = {
    getAllFavouriteMe,
    makeRoomFavourite,
    deleteRoomFavourite,
    makeRoomUnFavourite,
};
