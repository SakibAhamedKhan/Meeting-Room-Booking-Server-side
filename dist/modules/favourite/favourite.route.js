"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const favourite_controller_1 = require("./favourite.controller");
const router = express_1.default.Router();
router.get("/me", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), favourite_controller_1.FavouriteController.getAllFavouriteMe);
router.post("/me", (0, auth_1.default)(user_constant_1.USER_ROLE.CUSTOMER), favourite_controller_1.FavouriteController.makeRoomFavourite);
router.post("/unfav", (0, auth_1.default)(user_constant_1.USER_ROLE.CUSTOMER), favourite_controller_1.FavouriteController.makeRoomUnFavourite);
router.delete("/me", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.CUSTOMER), favourite_controller_1.FavouriteController.deleteRoomFavourite);
exports.FavouriteRoutes = router;
